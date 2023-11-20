import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import main_bg from "/assets/Data/backgrounds/verticle.jpg";
const HomeEnclose = () => {
  const navigate = useNavigate();
  const gotoMain = () => {
    navigate("/home");
  };
  const gotoStarters = () => {
    navigate("/starters");
  };
  const gotoDrinks = () => {
    navigate("/drinks");
  };
  const gotoDeserts = () => {
    navigate("/deserts");
  };

  return (
    <div className=" fixed flex  h-full w-full ">
      <div
        className=" flex-col items-center text-center justify-center w-[10rem] bg-cus bg-no-repeat bg-cover bg-red-300  "
        style={{ backgroundColor: "black" }}
      >
        <style>
          {`
          @media (min-width: 640px) {
            .bg-cus{
              background-image: url(${main_bg});
            }
          }
        `}
        </style>
        <div className="mt-[9rem] w-[8rem] text-[1.5rem] ml-[0.5rem] bg-white rounded-lg">
          Catogories
        </div>

        <div className="mt-[4rem] border-0 border-black">
          <button
            className="w-[7rem] h-full rounded-lg border-[0.2rem] hover:border-yellow-600  text-black bg-white "
            onClick={gotoStarters}
          >
            Starteres
          </button>
        </div>

        <div className="mt-[1rem] border-0 border-black">
          <button
            className="w-[7rem] h-full rounded-lg border-[0.2rem] hover:border-yellow-600  text-black bg-white "
            onClick={gotoMain}
          >
            Main Dishes
          </button>
        </div>

        <div className="mt-[1rem] border-0 border-black">
          <button
            className="w-[7rem] h-full rounded-lg border-[0.2rem] hover:border-yellow-600  text-black bg-white "
            onClick={gotoDrinks}
          >
            Drinks
          </button>
        </div>

        <div className="mt-[1rem] border-0 border-black">
          <button
            className="w-[7rem] h-full rounded-lg border-[0.2rem] hover:border-yellow-600  text-black bg-white "
            onClick={gotoDeserts}
          >
            Deserts
          </button>
        </div>
      </div>

      <div className="bg-black  w-full items-center  ">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeEnclose;
