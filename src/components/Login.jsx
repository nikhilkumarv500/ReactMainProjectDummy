import React, { useEffect, useState } from "react";
import main_bg from "../assets/images/main_page_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import { reduxRestoreOldDish, reduxShowDish } from "../store/dishSlice";
import { dataService } from "../appwrite/Config";
import logo from "/assets/Data/logo/logo.jpg";
import Caution from "./Caution";

function Login() {
  const rrr = useSelector((state) => state.dish.dishes);

  const dis = () => {
    // console.log(oldArray);
    // dispatch(reduxShowDish());
    console.log("rrr " + JSON.stringify(rrr) + " " + rrr.length);
    for (let i = 0; i < rrr.length; i++) {
      console.log(rrr[i][0].dishName);
    }
    console.log("dis");
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [alldata, setallData] = useState([]);

  const aaa = {
    // backgroundImage: `url(${main_bg})`,
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [curData, setcurData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    currectUser();
  }, []);

  const currectUser = async () => {
    const promise = await authService.getCurrentUser();

    const pid = await promise.$id;
    const pname = await promise.name;
    console.log("inside console : " + "\npid : " + pid + "\npname :" + pname);
    await setcurData({ id: pid, name: pname });
  };

  const def = async () => {
    // if (curData.id == null || curData.id.length == 0) return;
    const dat = dataService.fetchRecordAll(curData.id);
    await dat.then(
      function (response) {
        setallData(response.documents);
        const narr = response.documents;
        dispatch(reduxRestoreOldDish([]));
        const accumulate = [];
        narr.map((dish) =>
          accumulate.push([
            {
              dishUniqueSlugId: dish.$id,
              dishId: dish.dishId,
              userId: dish.userId,
              dishName: dish.dishName,
              dishPrice: dish.dishPrice,
              dishUrl: dish.dishUrl,
              dishQuantity: dish.dishQuantity,
            },
          ])
        );
        // setOldArray(accumulate);
        dispatch(reduxRestoreOldDish(accumulate));

        // console.log(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    def();
  }, [curData]);

  // const [oldArray, setOldArray] = useState([]);

  // useEffect(() => {
  //   setOldArray([]);
  //   const accumulate = [];
  //   alldata.map((dish) =>
  //     accumulate.push([
  //       {
  //         dishUniqueSlugId: dish.$id,
  //         dishId: dish.dishId,
  //         userId: dish.userId,
  //         dishName: dish.dishName,
  //         dishPrice: dish.dishPrice,
  //         dishUrl: dish.dishUrl,
  //         dishQuantity: dish.dishQuantity,
  //       },
  //     ])
  //   );
  //   setOldArray(accumulate);
  //   dispatch(reduxRestoreOldDish(accumulate));
  // }, [alldata]);

  // useEffect(() => {
  //   // console.log("useeffect " + oldArray.length);
  //   dispatch(reduxRestoreOldDish(oldArray));
  // }, [oldArray]);

  const [correct, setcorrect] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setcorrect(false);
    try {
      const promis = await authService.login(user.email, user.password);
      // setOldArray([]);
      // console.log(promis);
      if (promis) {
        console.log("inside");
        await currectUser();
        // if (oldArray.length > 0) {
        // console.log("hurray");
        // dis();
        // }
        navigate("/home");
      } else console.log("false");
    } catch (error) {
      console.log(error);
      setcorrect(true);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  const gotoHome = async () => {
    const promis = await authService.login("q@gmail.com", "11111111");
    await currectUser();
    navigate("/home");
  };

  const gotoHome2 = () => {
    console.log(curData.name);
    window.alert("hello");
  };

  return (
    <>
      <Caution />
      <div className=" max-h-full fixed h-1/2 sm:w-1/2  text-center flex flex-col min-h-screen justify-center items-center ">
        <form onSubmit={loginUser}>
          <div className="w-[400px] h-[400px] border-2 border-black rounded-[2rem] bg-white flex flex-col space-y-4 items-center justify-center ">
            <div className="flex justify-start ">
              <div className="border-0  rounded-lg ml-[-9rem] border-black w-[4rem] h-[4rem]">
                <img
                  src={logo}
                  className="w-full h-full rounded-lg"
                  alt="X"
                ></img>
              </div>
              <div className="border- border-black ml-[1rem] text-[3rem] w-[4rem] h-[4rem]">
                TastyTwist
              </div>
            </div>

            <span onClick={dis} className="text-black text-[35px] my-6">
              LOGIN
            </span>
            {/* <div className="text-black "> enter</div> */}
            <input
              className="border-black border-2 px-6 py-2
              rounded-lg"
              type="text"
              name="username"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>
            <input
              className="border-black border-2 px-6 py-2
              rounded-lg"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-black text-white px-6 py-2 rounded-2xl"
            >
              Login
            </button>
            <span className="text-black">
              {" "}
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-500 hover:text-blue-500">
                Signup
              </Link>
              {/* <a href="/signup" className="text-red-500">
              Signup
            </a> */}
            </span>
          </div>
        </form>

        <button
          onClick={gotoHome}
          className="text-black text-[0.3rem] ml-[1rem] mt-[30rem] hover:border-[0.1rem] hover:bg-white  absolute hover:text-black w-[1rem] h-[1rem]"
        >
          X
        </button>
        {correct && (
          <div className="text-[1rem] bg-white  text-red-400 border-2 w-[25rem] flex-col flex rounded-lg ">
            <span>Invalid email or password</span>
            <span>
              Email formate :<span className="font-bold">___@gmail.com</span>{" "}
            </span>
            <span>
              Password should contain
              <span className="font-bold"> more then 7</span> words
            </span>
          </div>
        )}
      </div>

      {/* <div className="text-white max-h-full h-1/2  text-center bg-yellow-900 flex-1 ">
          hello
        </div> */}
    </>
  );
}

export default Login;
