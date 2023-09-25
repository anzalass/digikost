import React, { useEffect, useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";

export default function EditBarangOwner() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [pengadaan, setPengadaan] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [ruang, setRuang] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
    getDataByID();
  }, [id])

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

  const [errPengadaan, setErrorPengadaan] = useState({
    namaBarang: "",
    kodeBarang: "",
    kodeRuang: "",
    merek: "",
    hargaBarang: "",
    quantity: "",
    spesifikasi: "",
    ruang: "",
    supplier: "",
    buktiNota: "",
  });

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const fetchData = async () => {
    const resRuang = await axios.get(`${BACKEND_BASE_URL}/api/getRuang`);
    const resKategori = await axios.get(`${BACKEND_BASE_URL}/api/getKategori`);

    setRuang(resRuang.data.results);
    setKategori(resKategori.data.results);
  }

  const UpdatePengadaan = async () => {
    try {
      const result = await axios.put(
        "http://127.0.0.1:8000/api/updatePengadaan/" + id,
        data
      );
      console.log(result);
      if (result) {
        window.location.href = `${BASE_URL}owner/pengadaan-barang`;
      }
    } catch (err) {
      console.log(err);
      setErrorPengadaan({
        namaBarang: err.response.data.errors.namaBarang,
        kodeBarang: err.response.data.errors.kodeBarang,
        kodeRuang: err.response.data.errors.kodeRuang,
        merek: err.response.data.errors.merek,
        hargaBarang: err.response.data.errors.hargaBarang,
        quantity: err.response.data.errors.quantity,
        spesifikasi: err.response.data.errors.spesifikasi,
        ruang: err.response.data.errors.ruang,
        supplier: err.response.data.errors.supplier,
        buktiNota: err.response.data.errors.buktiNota,
      })
    }
  };

  const getDataByID = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/findPengadaan/" + id
    );
    setPengadaan(result);
    setData((prevData) => ({
      ...prevData,
      merek: result.data.results.merek,
      kodeBarang: result.data.results.kodeBarang,
      kodeRuang: result.data.results.kodeRuang,
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

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Admin"}</TopBarOwner>
        <div className="bg-white w-[98%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
          <div className="bg-white w-[100%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
            <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
              <h1 className="font-abc text-xl">Edit Barang</h1>
              <div action="" className="w-[95%] mx-auto mt-2 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
                  <input
                    type="date"
                    name="tanggalPembelian"
                    // value={data.tanggalPembelian}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kategori</h1>
                  <select
                    name="namaBarang"
                    id=""
                    // value={data.namaBarang}
                    onChange={(e) => {
                      const selectedBarang = kategori.find(
                        (item) => item.kodeBarang === e.target.value
                      );

                      setData({
                        ...data,
                        kodeBarang: selectedBarang.kodeBarang,
                        namaBarang: `${selectedBarang.namaBarang}`,
                        merek: selectedBarang.kategori,
                      });
                      console.log(data);
                    }}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  >
                    {kategori.map((item, index) => {
                      if (item.kodeBarang == data.kodeBarang) {
                        console.log("item : ", item.kodeBarang, "&& data : ", data.kodeBarang)
                        return (
                          <option key={index} value={`${item.kodeBarang}`} selected>
                            {item.namaBarang}:{item.kategori}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={`${item.kodeBarang}`}>
                            {item.namaBarang}:{item.kategori}
                          </option>
                        );
                      }
                    })}
                  </select>
                  {errPengadaan.namaBarang ?
                    <p>{errPengadaan.namaBarang}</p> : null
                  }
                </div>
                {/* <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Merek Barang</h1>
                  <input
                    type="text"
                    name="merek"
                    // value={data.merek}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div> */}
                {/* <div className="w-full mt-4">
                                <h1 className="font-abc pb-2">Resi Barang</h1>
                                <input
                                    type="text"
                                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                                />
                            </div> */}
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                  <input
                    type="text"
                    name="buktiNota"
                    value={data.buktiNota}
                    onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errPengadaan.buktiNota ?
                    <p>{errPengadaan.buktiNota}</p> : null
                  }
                </div>
                {/* <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Alamat</h1>
              <textarea
                name=""
                id=""
                rows="3"
                className="w-full p-3 border-2 border-slate-500"
              ></textarea>
            </div> */}
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                  <input
                    type="text"
                    name="spesifikasi"
                    value={data.spesifikasi}
                    onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errPengadaan.spesifikasi ?
                    <p>{errPengadaan.spesifikasi}</p> : null
                  }
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
                  {errPengadaan.supplier ?
                    <p>{errPengadaan.supplier}</p> : null
                  }
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Lokasi Barang</h1>
                  <select
                    type="text"
                    name="ruang"
                    onChange={(e) => {
                      const selectedRuang = ruang.find(
                        (item) => item.kodeRuang === e.target.value
                      );

                      setData({
                        ...data,
                        kodeRuang: selectedRuang.kodeRuang,
                        ruang: selectedRuang.ruang,
                      });
                      console.log(data);
                    }}
                    // value={data.ruang}
                    // onChange={(e) => changePengadaanHandler(e)}
                    list="cars"
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
                          <option key={item.kodeBarang} value={item.kodeRuang}>
                            {item.ruang}
                          </option>
                        );
                      }
                    })}
                  </select>
                  {errPengadaan.ruang ?
                    <p>{errPengadaan.ruang}</p> : null
                  }
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
                  {errPengadaan.quantity ?
                    <p>{errPengadaan.quantity}</p> : null
                  }
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
                  {errPengadaan.hargaBarang ?
                    <p>{errPengadaan.hargaBarang}</p> : null
                  }
                </div>
                {/* <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Total Harga</h1>
                  <input
                    type="text"
                    // value={data.totalHargaBarang}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                    disabled
                  />
                </div> */}

                {/* <div className="w-full mt-4">
              <label
                htmlFor="ktp"
                className="h-[20px] w-[50px] text-[13px] font-abc rounded-lg p-2 bg-[#E3E8EF]"
              >
                Upload KTP
              </label>
              <input type="file" id="ktp" name="ktp" className="hidden" />
            </div> */}
                <div className="w-full justify-center mt-12 mb-12 flex items-center">
                  <button
                    onClick={() => UpdatePengadaan()}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => nav("/owner/pengadaan-barang")}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
