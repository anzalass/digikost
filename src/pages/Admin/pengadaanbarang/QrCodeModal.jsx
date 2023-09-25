import React from "react";
import QRCode from "react-qr-code";

export default function QrCodeModal({ open, setOpen, value }) {
  return (
    <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
      <div className="h-[300px] relative  mx-auto w-[300px] mt-[80px] bg-white rounded-lg">
        <button
          onClick={() => setOpen(!open)}
          className="font-abc text-xl absolute right-3 font-[600]"
        >
          X
        </button>
        <div className="w-[90%] mx-auto text-center ">
          <QRCode
            size={200}
            className="w-full pt-12"
            value={value}
            viewBox={`0 0 256 256`}
          />
          <h3 className="font-abc mx-auto mt-5 text-xl w-[50%] border-2 border-slate-600 rounded-lg ">
            Scan Here
          </h3>
        </div>
      </div>
    </div>
  );
}
