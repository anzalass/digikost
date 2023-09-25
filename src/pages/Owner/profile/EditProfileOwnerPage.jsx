import React, { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";

import { Link, useNavigate } from "react-router-dom";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";

export default function EditProfileOwnerPage() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Edit Profile Admin"}</TopBarOwner>
        <div className="w-[94%] mx-auto">
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Nama</h1>
            <input
              type="text"
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Email</h1>
            <input
              type="text"
              value={"kurniawanadi3108@gmail.com"}
              disabled={true}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">No Telephone</h1>
            <input
              type="text"
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <button className="bg-[#7B2CBF] px-3 py-1 w-[240px] rounded-md text-[#E5D5F2] font-abc">
              Request Ubah Password
            </button>
          </div>
          <div className="w-full mt-6 justify-center mb-7 flex items-center">
            <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
              Simpan
            </button>
            <button
              onClick={() => nav("/owner")}
              className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
