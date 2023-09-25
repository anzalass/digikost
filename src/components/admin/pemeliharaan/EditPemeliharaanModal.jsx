import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function EditPemeliharaanModal({ open, setOpen, id, row }) {
  const [data, setData] = useState({
    jumlah: "",
    harga: "",
    keterangan: ""
  })

  const [err, setErr] = useState({
    jumlah: "",
    harga: "",
    keterangan: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    console.log(data);
  }

  useEffect(() => {
    setData({
      ...data,
      jumlah: row.jumlah,
      harga: row.biaya,
      keterangan: row.keterangan
    })
    console.log("row : ", row);
  }, [id, row])

  const editPemeliharaan = async () => {
    try {
      const res = await axios.put(`${BACKEND_BASE_URL}/api/editPemeliharaan/` + id, data);

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setErr({
        jumlah: err.response.data.error.jumlah,
        harga: err.response.data.error.harga,
        keterangan: err.response.data.error.keterangan
      })
    }
  }

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[300px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1 className="font-abc">Edit Detail Maintenence</h1>
            <div className="">
              <h1>Quantity Barang</h1>
              <input
                type="number"
                name="jumlah"
                value={data.jumlah}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.jumlah ?
                <p>{err.jumlah}</p> : null
              }
              <h1>Harga Maintenence</h1>
              <input
                type="number"
                name="harga"
                value={data.harga}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.harga ?
                <p>{err.harga}</p> : null
              }
              <h1>Keterangan</h1>
              <input
                type="text"
                name="keterangan"
                value={data.keterangan}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.keterangan ?
                <p>{err.keterangan}</p> : null
              }
            </div>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={editPemeliharaan}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
                Simpan
              </button>
              <button
                onClick={() => setOpen(false)}
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
