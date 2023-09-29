import React, { useState, useEffect } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config/base_url";
import { useSelector } from "react-redux";

export default function TambahBarangOwner({ children }) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const { user } = useSelector((state) => state.user);
  const [kategori, setKategori] = useState([]);
  const [ruang, setRuang] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  console.log(kategori);

  const fetchData = async () => {
    const getKategori = await axios.get(
      "http://127.0.0.1:8000/api/getKategori"
    );
    const getRuang = await axios.get("http://127.0.0.1:8000/api/getRuang");

    // if (getRuang && getKategori) {
    setKategori(getKategori.data.results);
    setRuang(getRuang.data.results);
    // }
  };

  const TambahPengadaan = async (e) => {
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "digikostDemoApp");
      data.append("cloud_name", "dkt6ysk5c");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkt6ysk5c/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      pengadaan.buktiNota = res.data.secure_url;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/tambahPengadaan",
        pengadaan
      );

      if (response.status === 200) {
        console.log("res : ", response);
        // window.location.href = `${BASE_URL}owner/pengadaan-barang`;
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
      });
    }
  };

  const [pengadaan, setPengadaan] = useState({
    namaBarang: "",
    idOwner: user?.id,
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
    setPengadaan({
      ...pengadaan,
      [e.target.name]: e.target.value,
    });
    console.log(pengadaan);
  };

  return (
    <div className="w-full h-[160vh] flex">
      {children}
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Admin"}</TopBarOwner>
        <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
          <div action="" className="w-[95%] mx-auto mt-2 p-3">
            <h1 className="text-2xl font-abc">Tambah Barang</h1>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Tanggal Pengadaan</h1>
              <input
                type="date"
                name="tanggalPembelian"
                onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2 ">Kategori</h1>
              <select
                name="kodeBarang"
                onChange={(e) => {
                  const selectedBarang = kategori.find(
                    (item) => item.kodeBarang === e.target.value
                  );

                  setPengadaan({
                    ...pengadaan,
                    kodeBarang: selectedBarang.kodeBarang,
                    namaBarang: `${selectedBarang.namaBarang}`,
                    merek: selectedBarang.kategori,
                  });
                  console.log(pengadaan);
                }}
                id=""
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              >
                <option value="">Pilih Category</option>

                {kategori.map((item, index) => {
                  return (
                    <option key={index} value={`${item.kodeBarang}`}>
                      {item.namaBarang}:{item.kategori}
                    </option>
                  );
                })}
              </select>
              {errPengadaan.kodeBarang ? (
                <p>{errPengadaan.kodeBarang}</p>
              ) : null}
            </div>

            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
              <label
                htmlFor="buktiNota"
                className="border-2 border-slate-500 px-2 py-1 text-sm font-abc rounded-md"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                name="buktiNota"
                id="buktiNota"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            {errPengadaan.buktiNota ? (
              <p>{errPengadaan.buktiNota}</p>
            ) : null}
            <div className="w-full mt-4">
              {img ? (
                <div className="w-full ">
                  <img
                    className="w-[50%] mx-auto object-contain"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
              ) : null}
            </div>

            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
              <input
                type="text"
                name="spesifikasi"
                onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
              {errPengadaan.spesifikasi ? (
                <p>{errPengadaan.spesifikasi}</p>
              ) : null}
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Supplier</h1>
              <input
                type="text"
                name="supplier"
                onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
              {errPengadaan.supplier ? (
                <p>{errPengadaan.supplier}</p>
              ) : null}
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Lokasi Barang</h1>
              <select
                id="cars"
                name="kodeRuang"
                onChange={(e) => {
                  const selectedRuang = ruang.find(
                    (item) => item.kodeRuang === e.target.value
                  );

                  setPengadaan({
                    ...pengadaan,
                    kodeRuang: selectedRuang.kodeRuang,
                    ruang: selectedRuang.ruang,
                  });
                  console.log(pengadaan);
                }}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              >
                <option value="">Pilih Ruang</option>
                {ruang.map((item) => {
                  return <option value={item.kodeRuang}>{item.ruang}</option>;
                })}
              </select>
              {errPengadaan.ruang ? <p>{errPengadaan.ruang}</p> : null}
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Quantitas Barang</h1>
              <input
                type="number"
                name="quantity"
                onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
              {errPengadaan.quantity ? <p>{errPengadaan.quantity}</p> : null}
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Harga</h1>
              <input
                type="number"
                name="hargaBarang"
                onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
              {errPengadaan.hargaBarang ? (
                <p>{errPengadaan.hargaBarang}</p>
              ) : null}
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Total Harga</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>

            <div className="w-full justify-center mt-12 mb-12 flex items-center">
              <button
                onClick={(e) => TambahPengadaan(e)}
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
  );
}
