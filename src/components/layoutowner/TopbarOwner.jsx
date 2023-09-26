import React, { useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/base_url";

export default function TopBarOwner({ children }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const delay = 2000;

    const timer = setTimeout(() => {
      if (user == undefined) {
        window.location.href = `${BASE_URL}`;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [user]);
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
              {user?.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
