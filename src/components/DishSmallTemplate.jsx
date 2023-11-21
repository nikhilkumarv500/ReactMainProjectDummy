import React, { useState } from "react";
// import pizza from "../assets/Data/mainDishImages/pizza.jpg";
import { dataService } from "../appwrite/Config";
import { reduxUpdateDish, reduxDeleteDish } from "../store/dishSlice";
import { useDispatch } from "react-redux";
const DishSmallTemplate = ({
  dishUniqueSlugId,
  dishId,
  userId,
  name,
  price,
  url,
  quant,
  first,
  def,
}) => {
  //   console.log(name + " " + price + " " + url);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(quant);
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

  const deleteDish = async () => {
    // const success = await dataService.deleteRecord(dishUniqueSlugId);
    // console.log("yet to be deleted: " + userId + " " + dishUniqueSlugId);
    dispatch(reduxDeleteDish({ userId, dishUniqueSlugId }));
    // console.log("deleted");
  };

  const updateDish = async () => {
    // const promise = await dataService.updateRecord(
    //   dishUniqueSlugId,
    //   dishId,
    //   name,
    //   userId,
    //   quantity,
    //   price,
    //   url
    // );
    // console.log(dishUniqueSlugId);
    // console.log(userId);

    // const promise = dataService.updateRecord(
    //   dishUniqueSlugId,
    //   dishId,
    //   name,
    //   userId,
    //   quantity,
    //   price,
    //   url
    // );
    dispatch(
      reduxUpdateDish({
        dishUniqueSlugId: dishUniqueSlugId,
        dishId: dishId,
        dishName: name,
        userId: userId,
        dishQuantity: quantity,
        dishPrice: price,
        dishUrl: url,
      })
    );
    console.log("update");
    // if (promise) def();
  };

  return (
    <div
      className={`bg-black flex hover:border-[0.2rem] hover:border-white  w-[26rem] h-[10rem] overflow-y-auto max-h-screen text-white rounded-2xl ${
        first ? "mt-10" : ""
      }`}
    >
      <div>
        <img
          src={url}
          alt="nope"
          className=" ml-5 mt-[1.25rem] rounded-xl w-[7rem] h-[7.5rem] border-2 border-white"
        />
      </div>
      <div className="flex-col  w-[7rem] ">
        <div className=" ml-[1rem] text-2xl mt-[1.5rem]">{name}</div>
        <div className=" ml-[1rem] text-lg mt-[1.5rem]">Rs. {price}</div>
      </div>
      <div className="  ">
        {/* <div className="ml-8">Quantity</div> */}
        {/* <div className="">
          <button className=" ml-8 mt-[7rem] items-end border-2 border-white border-solid px-3 py-1 rounded-xl text-[70%] ">
            Remove from cart
          </button>
        </div> */}
        <div className=" flex flex-col items-center ml-8">
          <div>
            <button
              onClick={deleteDish}
              className="border-2 border-white hover:bg-white hover:text-black rounded-lg text-[80%] text-center px-[0.4rem] mt-[0.3rem] ml-[6.5rem]"
            >
              X
            </button>
          </div>
          <div className="ml-4 text-sm mt-[1.5rem]">Quantity</div>
          <div className="flex ml-[1.1rem]">
            <button
              className="border-2 h-7 mt-[0.6rem] rounded-lg border-white px-[0.65rem] hover:bg-white hover:text-black "
              onClick={dec}
            >
              -
            </button>
            <div className="mt-[0.2rem] h-[2.5rem] rounded-lg border-2 border-white px-3 py-[0.3rem] ml-1">
              {quantity}
            </div>
            <button
              className="border-2 h-7 mt-[0.6rem] ml-[0.25rem] rounded-lg border-white px-[0.65rem] hover:bg-white hover:text-black "
              onClick={inc}
            >
              +
            </button>
          </div>
          <div className="">
            <button
              className=" ml-4 mt-[0.35rem] items-end border-2 border-white border-solid px-3 py-1 rounded-xl text-sm hover:bg-white hover:text-black"
              onClick={updateDish}
            >
              Update item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishSmallTemplate;
