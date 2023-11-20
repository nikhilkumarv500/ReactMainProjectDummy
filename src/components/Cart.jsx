import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import array from "../assets/Data/MainDish";
import DishSmallTemplate from "./DishSmallTemplate";
import { useState } from "react";
import { dataService } from "../appwrite/Config";
import authService from "../appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";

import {
  reduxRestoreOldDish,
  reduxShowDish,
  reduxAddDish,
} from "../store/dishSlice";
import { ID } from "appwrite";

const Cart = () => {
  const dispatch = useDispatch();
  const storedData = useSelector((state) => state.dish.dishes);
  const [first, setfirst] = useState(1);
  const [show, setshow] = useState(0);
  const [dishTemplates, setdishTemplates] = useState([]);
  const [userData, setuserData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    buildArray();
    currectUser();
  }, []);
  const currectUser = async () => {
    const promise = await authService.getCurrentUser();
    const pid = promise.$id;
    const pname = promise.name;
    setuserData({ id: pid, name: pname });
  };

  useEffect(() => {
    buildArray();
    console.log("changeddddd");
  }, [storedData]);

  const buildArray = async () => {
    const num = [];
    for (let i = 0; i < storedData.length; i++) {
      const dish = storedData[i][0];
      // console.log(dish.dishUniqueSlugId);
      num.push(
        <DishSmallTemplate
          key={i}
          dishUniqueSlugId={dish.dishUniqueSlugId}
          dishId={dish.dishId}
          userId={dish.userId}
          name={dish.dishName}
          price={dish.dishPrice}
          url={dish.dishUrl}
          quant={dish.dishQuantity}
          first={first}
        />
      );
    }

    setdishTemplates(num);
    // console.log(dishTemplates);
  };

  const dis = () => {
    // console.log(dishTemplates);

    console.log(storedData);
  };
  const ppp = () => {
    const promise = dataService.fetchRecordAll(userData.id);

    promise.then(
      function (response) {
        console.log(response.documents);
        console.log("database");
      },
      function (error) {
        console.log(error);
      }
    );
  };
  const printArray = async () => {
    storedData.map((first) =>
      console.log(
        first[0].userId == "65597f38b684802687ad" &&
          first[0].dishUniqueSlugId == "1d73ccba-4085-415a-a034-46f7a479e689"
      )
    );
    // const uniqueId = uuidv4();
    // // const uniqueId = Date.now();
    // console.log("IDunique+  " + uniqueId); // This will log the resolved unique identifier
  };

  return (
    <>
      <div className=" overflow-y-auto max-h-screen min-h-screen ">
        {/* <div className="w-full text-center mt-9 ">Hello</div>
        <button onClick={dis} className="border-2 border-black">
          click me
        </button>
        <button onClick={ppp} className="border-2 border-black">
          click me
        </button>
        <button onClick={printArray} className="border-2 border-black">
          print array
        </button> */}
        <div className="text-[3rem] border-[0.0rem] border-black mt-[2rem] text-white ml-[5.7rem] w-full">
          {dishTemplates.length > 0 ? (
            <div className="border-[0.1rem] px-2 py-1 w-[27rem] border-white rounded-xl">
              Modify your orders
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" mt-[2rem] mb-[9rem] grid grid-cols-1 cart:grid-cols-2 space-y-10 px-[5.5rem] ">
          {dishTemplates.length > 0 ? (
            dishTemplates
          ) : (
            <>
              <div className="text-white rounded-xl ml-[24rem] border-[0.1rem] text-center w-[18rem] text-[3rem] px-2 mt-[3rem] py-2">
                Cart Empty
              </div>
            </>
          )}
        </div>
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari, and newer Edge */
            ::-webkit-scrollbar {
              width: 0.0em;
            }

            ::-webkit-scrollbar-thumb {
              background-color: transparent;
            }

            /* Optional: Add a subtle hover effect */
            ::-webkit-scrollbar-thumb:hover {
              background-color: #888;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Cart;
