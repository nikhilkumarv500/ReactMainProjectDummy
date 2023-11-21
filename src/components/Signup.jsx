import React, { useState } from "react";
import main_bg from "../assets/images/main_page_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/Auth";
// import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import logo from "/assets/Data/logo/logo.jpg";
import { reduxAddAuth, reduxShowAuth } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showError, setshowError] = useState(false);

  let valid = () => {
    if (
      user.email.length < 11 ||
      user.password.length < 8 ||
      user.name.length == 0
    ) {
      setshowError(true);
      return false;
    }
    if (user.email.toLowerCase().endsWith("@gmail.com")) {
      setshowError(false);
      return true;
    }

    setshowError(true);
    return false;
  };

  const signupUser = async (e) => {
    e.preventDefault();
    setshowError(false);
    if (valid()) {
      dispatch(
        reduxAddAuth({
          gmail: user.email,
          name: user.name,
          password: user.password,
        })
      );
      navigate("/home");
      //   try {
      //     const promise = authService.signup(
      //       user.email,
      //       user.password,
      //       user.name
      //     );
      //     console.log("promise : " + promise);
      //     promise.then(
      //       function (response) {
      //         console.log("response :" + response);
      //         authService.login(user.email, user.password);
      //         console.log("trying");
      //         navigate("/home");
      //       },
      //       function (error) {
      //         console.log(error);
      //       }
      //     );
      //     // if (promise) {
      //     //   // dispatch(authLogin(userAccount));
      //     //   console.log("tryinf : " + promise);
      //     //   const promis = await authService.login(user.email, user.password);
      //     //   navigate("/home");
      //     // } else console.log("false");
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else {
      //   setshowError(true);
    }
  };

  return (
    <>
      <div className=" max-h-full h-1/2 w-1/2  text-center flex flex-col min-h-screen justify-center items-center">
        <form onSubmit={signupUser}>
          <div className="w-[400px] h-[450px] rounded-[2rem] bg-white flex flex-col space-y-4 items-center justify-center ">
            <div className="flex justify-start mt-[1rem]">
              <div className=" rounded-lg ml-[-9rem]  w-[4rem] h-[4rem]">
                <img
                  src={logo}
                  className="w-full h-full rounded-lg"
                  alt="X"
                ></img>
              </div>
              <div className="  ml-[1rem] text-[3rem] w-[4rem] h-[4rem]">
                TastyTwist
              </div>
            </div>
            <span className="text-black text-[35px] my-6">SignUp</span>
            <input
              className="border-black border-2 px-6 py-2
              rounded-lg"
              type="text"
              value={user.name}
              placeholder="Enter your username"
              onChange={(e) => setuser({ ...user, name: e.target.value })}
            ></input>
            <input
              className="border-black border-2 px-6 py-2
              rounded-lg"
              type="text"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            ></input>
            <input
              className="border-black border-2 px-6 py-2
              rounded-lg text-black"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            ></input>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-black text-white  px-6 py-2 rounded-2xl"
            >
              SignUp
            </button>
            <span className="text-black">
              {" "}
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
        {showError && (
          <div className="text-[1rem] bg-white mt-1  text-red-400 border-2 w-[25rem] flex-col flex rounded-2xl ">
            <span>Invalid email or password</span>
            <span>
              Email formate :<span className="font-bold">___@gmail.com</span>{" "}
            </span>
            <span>
              Password should contain
              <span className="font-bold"> more then 7</span> words
            </span>
            <span>Goto to login page for more details</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
