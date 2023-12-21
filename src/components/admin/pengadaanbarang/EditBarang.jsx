import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditBarang({ close, setClose, idBarang }) {
  const [pengadaan, setPengadaan] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);
  console.log(kategori);

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const UpdatePengadaan = async () => {
    try {
      const result = await axios.put(
        "http://127.0.0.1:8000/api/updatePengadaan/" + idBarang,
        data
      );
      console.log(result);
      if (result) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataByID();
    fetchData();
  }, [idBarang]);

  const fetchData = async () => {
    const getRuang = await axios.get("http://127.0.0.1:8000/api/getRuang");
    const getBarang = await axios.get("http://127.0.0.1:8000/api/getKategori");
    const getKategori = await axios.get(
      "http://127.0.0.1:8000/api/getKategori"
    );

    setKategori(getKategori.data.results);
    setRuang(getRuang.data.results);
    setBarang(getBarang.data.results);

    if (getRuang) {
      setRuang(getRuang.data.results);
      setBarang(getBarang.data.results);
    }
  };

  const getDataByID = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/findPengadaan/" + idBarang
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
    <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
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
                  name="kodeBarang"
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
                  id=""
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  {kategori.map((item, index) => {
                    if (item.kodeBarang == data.kodeBarang) {
                      console.log(
                        "item : ",
                        item.kodeBarang,
                        "&& data : ",
                        data.kodeBarang
                      );
                      return (
                        <option
                          key={index}
                          value={`${item.kodeBarang}`}
                          selected
                        >
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
                  className="bg-[#155f95] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setClose(!close)}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#155f95] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
