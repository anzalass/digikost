import React from "react";

export default function ModalPengadaanOwner({ open, setOpen }) {
  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[150px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1>Set Quantity Kipas yang Ingin di Maintenence</h1>
            <select
              // onChange={(e) => (data.status = e.target.value)}
              name=""
              id=""
              className="w-full border-2 border-slate-500"
            >
              <option value="dalam perbaikan">acc</option>
              <option value="selesai">reject</option>
            </select>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                Simpan
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
