import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditPengadaanAdminPage() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [pengadaan, setPengadaan] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [barang, setBarang] = useState([]);
  const nav = useNavigate();
  console.log(id);

  const [data, setData] = useState({
    namaBarang: "",
    kodeBarang: "",
    kodeRuang: "",
    merek: "",
    buktiNota: "",
    spesifikasi: "",
    tanggalPembelian: "",
    ruang: "",
    supplier: "",
    quantity: 0,
    hargaBarang: 0,
    totalHargaBarang: 0,
  });

  useEffect(() => {
    getDataByID();
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const getRuang = await axios.get("http://127.0.0.1:8000/api/getRuang");
    const getBarang = await axios.get("http://127.0.0.1:8000/api/getKategori");

    if (getRuang) {
      setRuang(getRuang.data.results);
      setBarang(getBarang.data.results);
    }
  };

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const getDataByID = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/findPengadaan/" + id
    );
    setPengadaan(result);
    setData((prevData) => ({
      ...prevData,
      merek: result.data.results.merek,
      buktiNota: result.data.results.buktiNota,
      spesifikasi: result.data.results.spesifikasi,
      tanggalPembelian: result.data.results.tanggalPembelian,
      namaBarang: result.data.results.namaBarang,
      ruang: result.data.results.ruang,
      supplier: result.data.results.supplier,
      quantity: result.data.results.quantity,
      hargaBarang: result.data.results.hargaBarang,
      totalHargaBarang:
        result.data.results.quantity * result.data.results.hargaBarang,
    }));
    console.log("result : ", result.data.results.merek);
  };

  const UpdatePengadaan = async () => {
    try {
      const result = await axios.put(
        "http://127.0.0.1:8000/api/updatePengadaan/" + id,
        data
      );
      console.log(result);
      if (result) {
        nav("/admin/pengadaan");
      }
    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };

  return (
    <div>
      <div className="w-full h-[160vh] flex">
        <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
          <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
        </div>
        <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
          <TopBar>{"Dashboard Admin"}</TopBar>
          <div className="w-full">
            <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
              {pengadaan.length !== 0 ? (
                <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
                  <h1 className="font-abc text-xl">Edit Barang</h1>
                  <div action="" className="w-[95%] mx-auto mt-2 p-3">
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
                      <input
                        type="date"
                        name="tanggalPembelian"
                        value={data.tanggalPembelian}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2 ">Kategori</h1>
                      <select
                        name="namaBarang"
                        id=""
                        value={data.namaBarang}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      >
                        {barang.map((item, index) => {
                          if (item.namaBarang == data.namaBarang) {
                            return (
                              <option value="kodeBarang" selected>
                                {item.namaBarang}
                              </option>
                            );
                          } else {
                            return (
                              <option value="kodeBarang">
                                {item.namaBarang}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Merek Barang</h1>
                      <input
                        type="text"
                        name="merek"
                        value={data.merek}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                      <input
                        type="text"
                        name="buktiNota"
                        value={data.buktiNota}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                      <input
                        type="text"
                        name="spesifikasi"
                        value={data.spesifikasi}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Supplier</h1>
                      <input
                        type="text"
                        name="supplier"
                        value={data.supplier}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Lokasi Barang</h1>
                      <select
                        id="cars"
                        name="ruang"
                        className="w-full border-2 border-slate-500"
                      >
                        {ruang.map((item, index) => {
                          if (item.ruang == data.ruang) {
                            console.log("item : ", item.kodeRuang);
                            return (
                              <option
                                key={item.kodeBarang}
                                value={item.kodeRuang}
                                selected
                              >
                                {item.ruang}
                              </option>
                            );
                          } else {
                            return (
                              <option
                                key={item.kodeBarang}
                                value={item.kodeRuang}
                              >
                                {item.ruang}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Quantitas Barang</h1>
                      <input
                        type="text"
                        name="quantity"
                        value={data.quantity}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <h1 className="font-abc pb-2">Harga</h1>
                      <input
                        type="text"
                        name="hargaBarang"
                        value={data.hargaBarang}
                        onChange={(e) => changePengadaanHandler(e)}
                        className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                      />
                    </div>

                    <div className="w-full justify-center mt-12 mb-12 flex items-center">
                      <button
                        onClick={() => UpdatePengadaan()}
                        className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                      >
                        Simpan
                      </button>
                      <button
                        // onClick={() => setClose(!close)}
                        className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
