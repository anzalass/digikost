import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ModalChangeStatus({ open, setOpen, id }) {
  const [data, setData] = useState({
    status: null
  });

  const updateStatus = async () => {
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/updatePemeliharaan/` + id, data);
      if (res) {
        console.log("res status : ", res.data.message);
        console.log("id : ", id);
        console.log("status : ", data.status);
        window.location.reload();
      }
    } catch (err) {
      alert(err);
      console.log(data);
      console.log("error : ", err.response.data);
      console.log("error : ", err.response.data.error);
    }
  }

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[150px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1>Set Quantity Kipas yang Ingin di Maintenence</h1>
            <select onChange={e => data.status = e.target.value} name="" id="" className="w-full border-2 border-slate-500">
              <option value="dalam perbaikan">dalam perbaikan</option>
              <option value="selesai">selesai</option>
            </select>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button onClick={updateStatus} className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
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
