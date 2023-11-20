import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import array from "../assets/Data/Deserts";
import DishTemplate from "./DishTemplate";
import { useState } from "react";
import { authService } from "../appwrite/Auth";
import { dataService } from "../appwrite/Config";
import { ID } from "appwrite";
import { useDispatch, useSelector } from "react-redux";
import { reduxShowDish, reduxRestoreOldDish } from "../store/dishSlice";
import main_bg from "/assets/Data/backgrounds/desert.jpg";

const Home = () => {
  const storedData = useSelector((state) => state.dish.dishes);
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.dishes);

  const [first, setfirst] = useState(1);
  const [userData, setuserData] = useState({
    id: "",
    name: "",
  });

  const dishTemplates = array.map((dish, index) => (
    <DishTemplate
      key={index} // It's important to include a unique key when using map in React
      dishId={dish.id}
      userId={userData.id}
      dishName={dish.name}
      dishPrice={dish.price}
      url={dish.url}
      first={first}
    />
  ));

  // setdishTemplates(dummyTemplates);

  useEffect(() => {
    currectUser();
    // setdishTemplates(dummyTemplates);
  }, []);

  const currectUser = async () => {
    const promise = await authService.getCurrentUser();
    if (promise) {
      const pid = promise.$id;
      const pname = promise.name;
      setuserData({ id: pid, name: pname });
    } else {
      setuserData({ id: "", name: "" });
    }
  };

  const disp = () => {
    console.log("buttonsjhfgv");
    console.log(userData.name);
    console.log(dishes);
  };
  const dadd = () => {
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

  //search bar ----======================================================
  const frontDivRef = useRef(null);
  const backDivRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [showSecondDiv, setShowSecondDiv] = useState(true);
  const containerRef = useRef(null);

  // const handleScroll = () => {
  //   if (frontDivRef.current && backDivRef.current) {
  //     backDivRef.current.scrollTop = frontDivRef.current.scrollTop;
  //   }
  // };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSecondDiv(false);
    }
  };

  const offSearch = () => {
    setShowSecondDiv(false);
    setshowAbsolute(false);
  };
  const dontDisapear = (event) => {
    event.stopPropagation();
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setShowSecondDiv(!showSecondDiv);
  };
  const alwaysOn = () => {
    setShowSecondDiv(true);
  };

  const [serchWord, setseachWord] = useState("");
  const [searchItems, setsearchItems] = useState([]);

  useEffect(() => {
    if (serchWord.length == 0) setShowSecondDiv(false);
  }, []);

  const [updatedTemplates, setupdatedTemplates] = useState([]);

  const catchword = (e) => {
    setseachWord(e.target.value);
    const newWord = e.target.value;

    const newArray = array.filter((dish) => {
      return dish.name.toLowerCase().includes(newWord.toLowerCase());
    });

    const searchDump = newArray.map((dish, i) => (
      <div className="flex ">
        <div
          className="text-white w-full px-3 border-[0.0rem] border-black
        rounded-lg "
          // onClick={catchword}
        >
          <input
            key={i}
            className="bg-gray-500 w-auto h-auto hover:cursor-pointer"
            value={dish.name}
            readOnly
            onClick={catchword}
            style={{ userSelect: "none", outline: "none" }}
          />
          {/* hello */}

          {/* {dish.name} */}
        </div>
      </div>
    ));

    const updatedCart = newArray.map((dish, index) => (
      <DishTemplate
        key={index} // It's important to include a unique key when using map in React
        dishId={dish.id}
        userId={userData.id}
        dishName={dish.name}
        dishPrice={dish.price}
        url={dish.url}
        first={first}
      />
    ));

    setsearchItems(searchDump);
    setupdatedTemplates(updatedCart);

    setShowSecondDiv(true);
  };

  useEffect(() => {
    if (storedData.length > 0) setshowAbsolute(true);
  }, [storedData]);

  const [showAbsolute, setshowAbsolute] = useState(false);

  // const dishTemplates = array.map((dish, index) => (
  //   <DishTemplate
  //     key={index} // It's important to include a unique key when using map in React
  //     dishId={dish.id}
  //     userId={userData.id}
  //     dishName={dish.name}
  //     dishPrice={dish.price}
  //     url={dish.url}
  //     first={first}
  //   />
  // ));

  //search bar ----========max-h-screen ==============================================
  return (
    <div
      className=" bg-red-400 overflow-y-auto h-full min-h-screen bg-custom items-center   bg-no-repeat bg-cover"
      style={{ backgroundColor: "black" }}
      onScroll={offSearch}
    >
      {showAbsolute && (
        <div className="absolute z-20 mt-[1rem] ml-[66rem] border-2 border-white text-white text-[2rem] w-[20rem] h-[5rem] bg-gray-700 rounded-lg text-center items-center flex justify-center bg-opacity-75">
          Item added to cart
        </div>
      )}
      {/* <button onClick={disp} className="border-2 border-black">
        click me
      </button>
      <button onClick={dadd} className="border-2 border-black">
        click me
      </button> */}
      <div
        className="border-[0.1rem] hover:border-red-500 h-[3rem] ml-[27rem] w-[35rem] mt-[4rem] mb-[-3rem] border-black rounded-lg text-black "
        onClick={catchword}
        onChange={alwaysOn}
        ref={containerRef}
      >
        <input
          className="w-full h-full rounded-lg px-4 bg-white text-black"
          placeholder="Enter your search item"
          value={serchWord}
          onChange={catchword}
        ></input>
        {showSecondDiv && (
          <div
            className="box2 absolute rounded-lg mt-[0.2rem] ml-[-0.0rem] h-auto w-[35rem] overflow-y-auto max-h-[10rem]  bg-gray-500  z-20  "
            ref={frontDivRef}
            onClick={dontDisapear}
          >
            <div className="flex-col py-2 px-2 w-full space-y-2">
              {searchItems}
            </div>
          </div>
        )}
      </div>

      <div
        className=" mt-[4rem] mb-[9rem]  grid grid-cols-1 lg:grid-cols-2 space-y-10 px-[5.5rem] "
        ref={backDivRef}
      >
        {updatedTemplates.length > 0 ? updatedTemplates : dishTemplates}
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

export default Home;
