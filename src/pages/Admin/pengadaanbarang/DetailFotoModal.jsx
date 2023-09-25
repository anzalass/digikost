import React from "react";

export default function DetailFotoModal({ open, setOpen, foto }) {
  return (
    <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
      <div className="h-[500px] relative  mx-auto w-[600px] mt-[80px] bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="font-abc text-xl absolute right-3 font-[600]"
        >
          X
        </button>
        <img src={foto} className="w-full h-[500px] py-5 px-5" alt="" />
      </div>
    </div>
  );
}
