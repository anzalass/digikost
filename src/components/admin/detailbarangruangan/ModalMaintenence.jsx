import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useSelector } from "react-redux";

export default function ModalMaintenence({ open, setOpen, data, ruang, children }) {
  const { user } = useSelector((state) => state.user);
  const [dataConst, setDataConst] = useState({
    jumlah: 1,
  });

  const [dataBarang, setDataBarang] = useState({});

  const [errResponse, setErrResponse] = useState({
    jumlah: "",
    harga: "",
    keterangan: "",
  });

  useEffect(() => {
    if (user?.role === 1) {
      setDataBarang({
        idOwner: user?.id,
        kodeBarang: data.id,
        kodeRuang: ruang,
        keterangan: "",
        jumlah: 1,
        buktiPembayaran: "test.jpg",
        status: "pending",
        harga: "",
      });
    } else if (user?.role === 2) {
      setDataBarang({
        idAdmin: user?.id,
        kodeBarang: data.id,
        kodeRuang: ruang,
        keterangan: "",
        jumlah: 1,
        buktiPembayaran: "test.jpg",
        status: "pending",
        harga: "",
      });
    }
    setDataConst((prevData) => ({
      ...prevData,
      jumlah: data.qtybarang,
    }));
  }, [data]);

  useEffect(() => {
    if (dataBarang.jumlah > dataConst.jumlah) {
      setDataBarang((prevData) => ({
        ...prevData,
        jumlah: dataConst.jumlah,
      }));
    }
  }, [dataBarang]);

  const handleChange = (e) => {
    setDataBarang({
      ...dataBarang,
      [e.target.name]: e.target.value,
    });
    console.log(dataBarang);
  };

  const tambahPemeliharaan = async () => {
    try {
      const tambah = await axios.post(
        `${BACKEND_BASE_URL}/api/tambahPemeliharaan`,
        dataBarang
      );

      if (tambah) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response.data.error);
      setErrResponse({
        jumlah: err.response.data.error.jumlah,
        harga: err.response.data.error.harga,
        keterangan: err.response.data.error.keterangan,
      });
    }
  };

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[300px]  mx-auto bg-white p-3 rounded-lg">
        {children}
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1>Set Quantity Kipas yang Ingin di Maintenence</h1>
            <input
              type="number"
              name="jumlah"
              value={dataBarang.jumlah}
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            {errResponse.jumlah ? <p>{errResponse.jumlah}</p> : null}
            <h1>Masukkan Harga Maintenance Barang</h1>
            <input
              type="number"
              name="harga"
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            {errResponse.harga ? <p>{errResponse.harga}</p> : null}
            <h1>Keterangan Barang</h1>
            <input
              type="text"
              name="keterangan"
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            {errResponse.keterangan ? <p>{errResponse.keterangan}</p> : null}
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={tambahPemeliharaan}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
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
