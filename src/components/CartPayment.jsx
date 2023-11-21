import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import array from "../assets/Data/MainDish";
import DishSmallTemplate from "./DishSmallTemplate";
import { useState } from "react";
import { dataService } from "../appwrite/Config";
import authService from "../appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import { reduxRestoreOldDish, reduxShowDish } from "../store/dishSlice";

const CartPayment = () => {
  const storedData = useSelector((state) => state.dish.dishes);
  const [userData, setuserData] = useState({
    id: "",
    name: "",
  });
  // const [alldata, setallData] = useState([]);
  // const num = [];

  // // get user details which depends on page refresh---------------------------------
  // useEffect(() => {
  //   currectUser();
  // }, []);

  // const currectUser = async () => {
  //   const promise = await authService.getCurrentUser();
  //   const pid = promise.$id;
  //   const pname = promise.name;
  //   setuserData({ id: pid, name: pname });
  // };

  // // get record details which depends on userDetails-------------------

  // useEffect(() => {
  //   def();
  // }, [userData]);

  // const def = async () => {
  //   const dat = dataService.fetchRecordAll(userData.id);
  //   dat.then(
  //     function (response) {
  //       setallData(response.documents);
  //       console.log(response.documents);
  //     },
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
  // };
  useEffect(() => {
    buildArray();
  }, []);

  useEffect(() => {
    buildArray();
  }, [storedData]);

  const [printable, setPrintable] = useState([]);
  const [totalAmount, settotalAmount] = useState(0);

  const buildArray = async () => {
    const num = [];
    let amt = 0;
    for (let i = 0; i < storedData.length; i++) {
      const obj = storedData[i][0];
      amt = amt + obj.dishQuantity * obj.dishPrice;
      num.push(
        <div className="flex flex-col text-white ">
          {i != 0 && (
            <div>-------------------------------------------------</div>
          )}
          {i == 0 && <div className="mt-[1rem]"></div>}

          <div className="grid grid-cols-3  ">
            {/* <div className="flex "> */}
            <div className="w-[5rem] h-[5rem] flex justify-center ml-4 border-white border-[0.05rem] rounded-lg">
              <img src={obj.dishUrl} alt="Nope" className="rounded-lg" />
            </div>
            <div className=" font-bold  ">{obj.dishName}</div>

            <div className="flex-col">
              <div className="mb-1 ml-6">Qty:</div>
              <div className="border-[0.05rem] w-8 py-1 text-center rounded-lg ml-5">
                {obj.dishQuantity}
              </div>
              <div className="flex mt-2">
                <div>Price: </div>
                <div className="ml-2">{obj.dishQuantity * obj.dishPrice} </div>
                <div> ₹</div>
              </div>
            </div>
          </div>
          {/* <div className="mt-5"></div> */}
        </div>
      );
      settotalAmount(amt);
      setPrintable(num);
    }
  };

  const dis = () => {
    console.log("hurray");
  };

  const lol = () => {
    window.alert("LOL :)");
  };

  return (
    <div className="  flex-col items-center justify-center  px-[0.9rem] min-h-screen max-h-full overflow-y-auto  ">
      <div
        onClick={dis}
        className=" mt-4 text-center text-[2.5rem] border-[0.1rem] border-white w-[20rem] ml-[0.7rem] rounded-lg text-white"
      >
        Order Summary
      </div>
      <div className="border-solid border-[0.1rem]  border-white rounded-lg w-[20rem] mt-[2rem] mb-[1rem] ml-[0.7rem]">
        {storedData.length > 0 ? (
          printable
        ) : (
          <div className="text-white px-2 text-[2rem]">Cart Empty</div>
        )}
      </div>
      {storedData.length > 0 && (
        <div className="border-[0.1rem] rounded-lg border-white w-[20rem] px-3 py-2 text-[1.5rem] ml-[0.7rem] mb-[1rem] text-white">
          Total Amount : {totalAmount} $
        </div>
      )}
      {storedData.length > 0 && (
        <button
          className="mb-[7rem] text-white border-[0.1rem] px-2 pb-1 rounded-2xl hover:bg-white text-lg ml-[7rem]  hover:text-black"
          onClick={lol}
        >
          Confirm Order
        </button>
      )}
    </div>
  );
};

export default CartPayment;
