import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import logo from "/assets/Data/logo/logo.jpg";
import authService from "../appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import { reduxRestoreOldDish } from "../store/dishSlice";

const NavEnclose = () => {
  const storedData = useSelector((state) => state.dish.dishes);
  const storedUser = useSelector((state) => state.ath);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState({
    id: "12345",
    name: storedUser.name,
  });
  // useEffect(() => {
  //   currectUser();
  //   // setdishTemplates(dummyTemplates);
  // }, []);
  // useEffect(() => {
  //   currectUser();
  //   // setdishTemplates(dummyTemplates);
  // }, [storedData]);
  // const currectUser = async () => {
  //   const promise = await authService.getCurrentUser();
  //   if (promise) {
  //     const pid = promise.$id;
  //     const pname = promise.name;
  //     setuserData({ id: pid, name: pname });
  //   } else {
  //     setuserData({ id: "", name: "" });
  //   }
  // };
  // const fun = () => {
  //   setuserData({
  //     id: "aa",
  //     name: "Nikhil kuame V",
  //   });
  // };

  const goToHome = () => {
    navigate("/home");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const chkUser = () => {
    console.log(userData.name);
  };

  const gotoLogout = () => {
    // authService.logout();
    console.log("logout");
    dispatch(reduxRestoreOldDish([]));
    navigate("/login");
  };

  return (
    <div className="  flex-col w-full ">
      <div className=" h-[4rem]  border-b-[0.2rem] border-white   bg-gray-400  grid grid-cols-2  items-center  ">
        <div className="flex">
          <div
            className="text-white border-2 border-black ml-[1rem] 
        w-[3.3rem] h-[3rem] rounded-lg "
          >
            <img src={logo} alt="X" className="w-full h-full rounded-lg" />
          </div>
          {userData.name != null && userData.name.length > 0 ? (
            <div className=" text-white text-[1.5rem] border-2 border-white w-auto px-2 py-1 rounded-lg  ml-[2rem]">
              Welcome {userData.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex">
          <div
            className=" rounded-xl ml-[26rem] text-white border-2  border-black py-1 px-2 w-[6rem] text-center hover:bg-white hover:text-black
          "
          >
            <button onClick={goToHome}>HOME</button>
          </div>
          <div className=" text-white  flex space-x-1 rounded-xl border-2 ml-6 border-black py-1 px-2 w-[6rem] text-center justify-center hover:bg-white hover:text-black">
            <button onClick={goToCart}>CART</button>
            {storedData.length > 0 && (
              <div className="w-9 bg-white text-black rounded-lg border-2">
                {storedData.length}
              </div>
            )}
          </div>
          <div className=" text-white rounded-xl border-2 ml-6 border-black py-1 px-2 w-[6rem] text-center hover:bg-white hover:text-black">
            <button onClick={gotoLogout}>LOGOUT</button>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default NavEnclose;
