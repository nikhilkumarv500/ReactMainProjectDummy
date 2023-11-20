import React from "react";
import { Link, Outlet } from "react-router-dom";
import CartPayment from "./CartPayment";
import main_bg from "/assets/Data/backgrounds/cart_left.jpg";
import cartRight from "/assets/Data/backgrounds/cart_right.jpg";
const CartLayout = () => {
  return (
    <>
      <div className=" flex flex-col cartLayout:flex-row  overflow-y-auto max-h-screen   fixed bg-black w-full">
        <div
          className=" w-full min-h-screen bg-custom bg-no-repeat bg-cover "
          style={{ backgroundColor: "black" }}
        >
          <Outlet />
        </div>
        <div className=" w-full cartLayout:w-[30rem] max-w-screen min-h-screen overflow-y-auto max-h-screen bg-cus bg-no-repeat bg-cover">
          <CartPayment />
        </div>
        <style>
          {`
          
          @media (min-width: 640px) {
            .bg-custom {
              background-image: url(${main_bg});
            }
            .bg-cus {
              background-image: url(${cartRight});
            }
          
        `}
        </style>
      </div>
    </>
  );
};

export default CartLayout;
