import axios from "axios";
import React, { useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBar({ userSession, children }) {
  console.log("user session name : ", userSession);
  const nav = useNavigate();

  useEffect(() => {
    // Add a delay of 1000 milliseconds (1 second) before checking userSession
    const delay = 3000;

    const timer = setTimeout(() => {
      if (userSession.id == undefined) {
        window.location.href = "/login";
      }
    }, delay);

    // Clear the timer if the component unmounts or userSession changes
    return () => clearTimeout(timer);
  }, [userSession]);

  return (
    <div>
      <div className="w-full h-[80px] flex p-6 justify-between">
        <div className="w-[50%] text-[25px] font-abc font-[500]">
          {children}
        </div>
        <div className="w-[50% flex">
          <div className="mr-5">
            <BsFillBellFill size={25} />
          </div>
          <div className="flex">
            <FaUserCircle size={25} />
            <h1
              onClick={() => nav("/profile")}
              className="ml-2 font-abc font-[500] cursor-pointer"
            >
              {userSession.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
