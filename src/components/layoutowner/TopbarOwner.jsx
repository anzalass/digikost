import React from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBarOwner({ children }) {
  const nav = useNavigate();
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
              className="ml-2 font-abc font-[500]"
              onClick={() => nav("/owner/profile")}
            >
              Owner
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
