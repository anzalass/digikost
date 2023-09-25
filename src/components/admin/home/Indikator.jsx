import React, { useEffect, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Frame1 from "../../../assets/Frame(1).png";
import Frame2 from "../../../assets/Frame(2).png";
import Frame3 from "../../../assets/Frame(3).png";
import Frame4 from "../../../assets/Frame(4).png";
import Frame5 from "../../../assets/Frame(5).png";
import axios from "axios";

export default function Indikator() {
  const [allRuang, setAllRuang] = useState(0);
  const [allPengadaan, setAllPengadaan] = useState(0);
  const [allKategori, setAllKategori] = useState(0);
  const [allPemeliharaan, setAllPemeliharaan] = useState(0);
  useEffect(() => {
    fetchData();
  }, [allRuang, allPengadaan, allKategori, allPemeliharaan]);

  const fetchData = async () => {
    try {
      const ruang = await axios.get("http://127.0.0.1:8000/api/getRuang");
      const pengadaan = await axios.get("http://127.0.0.1:8000/api/pengadaan");
      const kategori = await axios.get("http://127.0.0.1:8000/api/getKategori");
      const pemeliharaan = await axios.get(
        "http://127.0.0.1:8000/api/getPemeliharaan"
      );

      setAllRuang(ruang.data.total);
      setAllPengadaan(pengadaan.data.total);
      setAllKategori(kategori.data.total);
      setAllPemeliharaan(pemeliharaan.data.total);

      // await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-3 p-3 w-[95%] mx-auto bg-white rounded-lg h-[40vh]">
      <div className=" grid grid-cols-2 gap-4 ml-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[240px] bg-[#9556CC]">
          <h1 className=" text-white font-[500] text-[20px]">10</h1>
          <h1 className=" text-white font-[500] text-[16px]">Pegawai</h1>
          <img
            src={Frame}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
        <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[240px] bg-[#FDB022]">
          <h1 className=" text-white font-[500] text-[20px]">
            {allRuang}
          </h1>
          <h1 className=" text-white font-[500] text-[16px]">Ruangan</h1>
          <img
            src={Frame1}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
        <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[240px] bg-[#07BEB8]">
          <h1 className=" text-white font-[500] text-[20px]">
            {allKategori}
          </h1>
          <h1 className=" text-white font-[500] text-[16px]">
            Kategori Barang
          </h1>
          <img
            src={Frame2}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
        <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[240px] bg-[#36BFFA]">
          <h1 className=" text-white font-[500] text-[20px]">
            {allPengadaan}
          </h1>
          <h1 className=" text-white font-[500] text-[16px]">Pengadaan</h1>
          <img
            src={Frame3}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-7 ml-2">
        <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[510px] bg-[#F04438]">
          <h1 className=" text-white font-[500] text-[30px]">10</h1>
          <h1 className=" text-white font-[500] text-[16px]">Total Barang</h1>
          <img
            src={Frame4}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
        <div className="h-[100px] pl-8 py-2 relative rounded-md w-[510px] bg-[#32D583]">
          <h1 className=" text-white font-[500] text-[30px]">
            {allPemeliharaan}
          </h1>
          <h1 className=" text-white font-[500] text-[16px]">Pemeliharaan</h1>
          <img
            src={Frame5}
            className=" absolute  right-0 top-5 h-[80px] z-0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
