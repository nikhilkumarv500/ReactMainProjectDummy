import React, { useState } from "react";

const Caution = () => {
  const [times, setTimes] = useState(1);

  const [show, setShow] = useState(false);

  const inc = () => {
    if (times >= 2) {
      setShow(true);
      return;
    }
    setTimes((prev) => prev + 1);
  };
  const dec = () => {
    setTimes((prev) => {
      prev - 1;
    });
  };

  return (
    <>
      {show == false && (
        <div className="bg-gray-500 bg-opacity-75  min-h-screen flex justify-center items-center">
          <div className="w-[30rem] flex flex-col justify-center text-center border-[0.1rem] rounded-xl border-white h-[30rem] bg-gray-400">
            <spam className="text-red-600 text-[2rem] font-bold">CAUTION</spam>
            <spam className="font-bold">
              Please do not enter your real Gmail and password
            </spam>
            <span>
              Enter fake gmail with formate "
              <span className="font-bold">______@gmail.com</span>"
            </span>
            <span>
              Enter fake password with size{" "}
              <span className="font-bold">greater or equal to 8 words</span>
            </span>
            <div className="border-2 w-[25rem] mt-7 ml-9 rounded-lg">
              This website is not fully responsive for small screens ,so it will
              not work properly on mobile devices
            </div>
            <div className="flex mt-[3rem] justify-center">
              <button
                className="  text-[1rem] rounded-lg px-1 border-white border-2 hover:bg-white "
                onClick={inc}
              >
                click here twice to continue
              </button>
              <div className="flex-col space-y-2 flex ml-[1rem]">
                <div className="font-bold">Click count</div>
                <div className=" ml-[1.3rem] h-[3rem] text-[1.5rem] rounded-lg w-[3rem] border-2 border-white">
                  {times - 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Caution;
