import { useEffect, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Frame1 from "../../../assets/Frame(1).png";
import Frame2 from "../../../assets/Frame(2).png";
import Frame3 from "../../../assets/Frame(3).png";
import Frame4 from "../../../assets/Frame(4).png";
import Frame5 from "../../../assets/Frame(5).png";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Indikator() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="">
      {user?.role === 1 ? (
        <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh]">
          <div className=" grid grid-cols-2 gap-4 w-full mx-auto  md:grid-cols-2 lg:grid-cols-3 ">
            <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#9556CC]">
              <h1 className=" text-white font-[500] text-[20px]">5</h1>
              <h1 className=" text-white font-[500] text-[16px]">Izin Masuk</h1>

            </div>
            <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
              <h1 className=" text-white font-[500] text-[20px]">2</h1>
              <h1 className=" text-white font-[500] text-[16px]">Izin Keluar</h1>

            </div>

            <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#36BFFA]">
              <h1 className=" text-white font-[500] text-[20px]">12</h1>
              <h1 className=" text-white font-[500] text-[16px]">Izin Pulang</h1>

            </div>
          </div>

          <div className="grid grid-cols-1 mt-7 gap-3 w-full  md:grid-cols-1 lg:grid-cols-2  ">
            <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[100%] bg-[#F04438]">
              <h1 className=" text-white font-[500] text-[30px]">6</h1>
              <h1 className=" text-white font-[500] text-[16px]">Izin Diterima</h1>
              <img
                src={Frame4}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
            <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-[#32D583]">
              <h1 className=" text-white font-[500] text-[30px]">
                10
              </h1>
              <h1 className=" text-white font-[500] text-[16px]">Izin Ditolak</h1>

            </div>
          </div>
        </div>) : user?.role === 4 ? (<div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg h-[40vh]">
          <div className=" grid grid-cols-1 gap-4 w-full mx-auto  md:grid-cols-2 lg:grid-cols-2 ">
            <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#9556CC]">
              <h1 className=" text-white font-[500] text-[20px]">200</h1>
              <h1 className=" text-white font-[500] text-[16px]">Siswa</h1>

            </div>
            <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
              <h1 className=" text-white font-[500] text-[20px]">21</h1>
              <h1 className=" text-white font-[500] text-[16px]">Guru</h1>

            </div>

          </div>


        </div>) : null}

    </div>

  );
}
