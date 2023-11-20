import React, { useState } from "react";
import { Client, Account, ID } from "appwrite";
import { dataService } from "../appwrite/Config";
import { useDispatch, useSelector } from "react-redux";
import { reduxAddDish, reduxUpdateDish } from "../store/dishSlice";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
// const uniqueId = uuidv4();
// import pizza from "../assets/Data/mainDishImages/pizza.jpg";

const DishTemplate = ({ dishId, userId, dishName, dishPrice, url, first }) => {
  //   console.log(name + " " + price + " " + url);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    setQuantity((prev) => {
      if (prev < 9) return prev + 1;
      else return 9;
    });
  };
  const dec = () => {
    setQuantity((prev) => {
      if (prev > 1) return prev - 1;
      else return 1;
    });
  };

  const addDish = () => {
    const promise = dataService.getRecord(userId, dishId);

    promise.then(
      function (response) {
        if (response.documents.length > 0) {
          const promise = dataService.updateRecord(
            response.documents[0].$id,
            dishId,
            dishName,
            userId,
            quantity,
            dishPrice,
            url
          );
          dispatch(
            reduxUpdateDish({
              dishUniqueSlugId: response.documents[0].$id,
              dishId: dishId,
              dishName: dishName,
              userId: userId,
              dishQuantity: quantity,
              dishPrice: dishPrice,
              dishUrl: url,
            })
          );
          console.log("update");
        } else {
          const uniqueSlugId = uuidv4();
          console.log(uniqueSlugId);
          dataService.addRecord(
            uniqueSlugId,
            dishId,
            dishName,
            userId,
            quantity,
            dishPrice,
            url
          );

          dispatch(
            reduxAddDish({
              dishUniqueSlugId: uniqueSlugId,
              dishId: dishId,
              dishName: dishName,
              userId: userId,
              dishQuantity: quantity,
              dishPrice: dishPrice,
              dishUrl: url,
            })
          );
          console.log("Create new");
        }

        // console.log(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <div
      className={`bg-gray-400 border-[0.0rem] hover:border-[0.3rem] hover:border-white border-solid border-white flex w-[35rem] h-[15rem] overflow-y-auto max-h-screen text-white font-bold rounded-2xl bg-opacity-75 ${
        first ? "mt-10" : ""
      }`}
    >
      <div>
        <img
          src={url}
          alt="nope"
          className=" ml-5 mt-6 rounded-xl w-[12rem] h-[12rem] border-2 border-black"
        />
      </div>
      <div className="flex-col  w-[13rem] ">
        <div className=" ml-[1rem] text-3xl mt-[1.5rem]">{dishName}</div>
        <div className=" ml-[1rem] text-xl mt-[1.5rem]">Rs. {dishPrice}</div>
        {/* <div className=" ml-[1rem] text-3xl mt-[1.5rem]">French Fries</div>
        <div className=" ml-[1rem] text-xl mt-[1.5rem]">Rs. 1500</div> */}
      </div>
      <div className=" flex flex-col items-center ">
        <div className="ml-4 text-lg mt-[7rem]">Quantity</div>
        <div className="flex ml-[1.1rem]">
          <button
            className="border-2 first-letter: h-7 mt-[0.6rem] rounded-lg hover:text-black hover:bg-white border-black px-[0.65rem] "
            onClick={dec}
          >
            -
          </button>
          <div className="mt-[0.2rem] h-[2.5rem] rounded-lg border-2 border-black px-3 py-[0.3rem] ml-1">
            {quantity}
          </div>
          <button
            className="border-2 h-7 mt-[0.6rem] ml-[0.25rem] rounded-lg hover:text-black border-black px-[0.65rem] hover:bg-white "
            onClick={inc}
          >
            +
          </button>
        </div>
        <div className="">
          <button
            onClick={addDish}
            className=" ml-4 mt-[0.5rem] items-end border-2 border-black hover:text-black hover:bg-white border-solid px-3 py-1 rounded-xl "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishTemplate;
