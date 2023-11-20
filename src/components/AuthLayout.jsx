import React from "react";
// import main_bg from "../assets/images/main_page_bg.jpg";
import main_bg from "/assets/Data/backgrounds/main_page_bg_49.jpg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const aaa = {
    backgroundImage: `url(${main_bg})`,
  };

  return (
    <div
      className="sm:block  bg-custom items-center min-h-screen  bg-no-repeat bg-cover  "
      style={{ backgroundColor: "black" }}
    >
      <Outlet />
      <style>
        {`
          @media (min-width: 640px) {
            .bg-custom {
              background-image: url(${main_bg});
            }
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout;
