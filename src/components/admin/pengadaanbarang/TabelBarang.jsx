import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import FotoDetail from "./FotoDetail";
import EditBarang from "./EditBarang";
import DetailPengadaan from "./DetailPengadaan";
import { useSelector } from "react-redux";

export default function TabelBarang({ data, children }) {
  const { user } = useSelector((state) => state.user);

  const [allBarang, setAllBarang] = useState([data]);
  const [editBarang, setEditBarang] = useState(false);
  const [valuePengadaan, setValuePengadaan] = useState();
  const [detailPengadaan, setDetailPengadaan] = useState(false);
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const [foto, setFoto] = useState("");
  const nav = useNavigate();
  const [img, setImg] = useState();
  const [idBarang, setIdBarang] = useState("");
  const [kategori, setKategori] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [status, setStatus] = useState("");
  const bulan = [
    "Januari",
    "Febuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let tahunSekarang = new Date().getFullYear() + 1;
  const tahun = [];
  const [gridKey, setGridKey] = useState(0);
  const [filter, setFilter] = useState("");

  for (let i = 0; i < 10; i++) {
    tahun.push(tahunSekarang - 1);
    tahunSekarang = tahunSekarang - 1;
  }

  useEffect(() => {
    setAllBarang(data);
  }, [data]);

  let row = [];

  const [pengadaan, setPengadaan] = useState({
    idAdmin: user.id,
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

  const [detailFoto, setDetailFoto] = useState(false);

  const changePengadaanHandler = (e) => {
    setPengadaan({
      ...pengadaan,
      [e.target.name]: e.target.value,
    });
    console.log(pengadaan);
  };

  const DeletePengadaan = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id);
    window.location.reload();
  };

  const editBarangFunc = () => {
    setEditBarang(!editBarang);
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
        window.location.reload(true);
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

  const showBarang = () => {
    data
      .filter(
        (item) =>
          (filter === "" || item.ruang === filter) &&
          (filterBulan === "" ||
            new Date(item.created_at).getMonth() === Number(filterBulan)) &&
          (filterTahun === "" ||
            new Date(item.created_at).getFullYear() === Number(filterTahun)) &&
          (status === "" || item.status === status)
      )
      .forEach((a) => {
        row.push({
          id: a.id,
          idAdmin: a.idAdmin,
          nama_barang: `${a.namaBarang}:${a.merek}`,
          tgl: a.tanggalPembelian,
          harga: a.hargaBarang,
          lokasi_barang: a.ruang,
          linkBarcode: a.linkBarcode,
          foto: a.buktiNota,
          qty_barang: a.quantity,
          total_harga: a.hargaBarang * a.quantity,
          status: a?.status,
        });
      });
  };

  showBarang();

  const columns = [
    {
      field: "id",
      headerName: "Resi Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "tgl",
      headerName: "Tanggal Pembelian",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "harga",
      headerName: "Harga Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "qty_barang",
      headerName: "Qty Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Lokasi Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "total_harga",
      headerName: "Total Harga",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "foto",
      headerName: "Foto",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        console.log(params);
        return (
          <img
            onClick={() => {
              setFoto(params.row.foto);
              setDetailFoto(!detailFoto);
            }}
            src={params.row.foto}
            alt=""
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            className={`${params.row.status === "pending"
              ? "bg-yellow-400"
              : params.row.status === "acc"
                ? "bg-green-500"
                : "bg-red-600"
              } h-full text-center pt-3 text-white font-abc w-full `}
          >
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "aksi",
      headerName: "Aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            {
              params.row.status == 'pending' ?
                params.row.idAdmin == user?.id ?
                  <>
                    <button className="mr-4" onClick={() => DeletePengadaan(params.id)}>
                      <BsTrash3 color="red" size={20} />
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        editBarangFunc(params.id);
                        setIdBarang(params.id);
                      }}
                    >
                      <BiEditAlt color="blue" size={20} />
                    </button>
                  </>
                  :
                  <></>
                : <button
                  className="mr-4"
                  onClick={() => {
                    setValuePengadaan(params.row.linkBarcode);
                    console.log(params.row.linkBarcodeR, "Adasdasdasdas");
                    setDetailPengadaan(true);
                  }}
                >
                  <BsEye size={20} />
                </button>
            }
          </div>
        );
      },
    },
  ];

  console.log();

  return (
    <>
      {detailPengadaan ? (
        <DetailPengadaan
          open={detailPengadaan}
          setOpen={setDetailPengadaan}
          value={valuePengadaan}
        />
      ) : null}
      {detailFoto ? (
        <FotoDetail open={detailFoto} setOpen={setDetailFoto} foto={foto} />
      ) : null}
      <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
        {pengadaanBarang ? (
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <div action="" className="w-[95%] mx-auto mt-2 p-3">
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
                  onChange={(e) => {
                    setPengadaan({
                      ...pengadaan,
                      buktiNota: e.target.files[0],
                    });
                    setImg(e.target.files[0]);
                  }}
                  className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan.buktiNota ? (
                  <p>{errPengadaan.buktiNota}</p>
                ) : null}
              </div>
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
                {errPengadaan.supplier ? <p>{errPengadaan.supplier}</p> : null}
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

              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  onClick={(e) => TambahPengadaan(e)}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setPengadaanBarang(!pengadaanBarang)}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {!pengadaanBarang && !editBarang ? (
          <div className="">
            <div className="bg-white w-[96%] mt-3 mb-[200px]  mx-auto  rounded-lg">
              <div className="flex justify-between">
                <div className="">
                  <button
                    onClick={() => setPengadaanBarang(!pengadaanBarang)}
                    className="bg-[#7B2CBF] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Tambah Barang +
                  </button>
                </div>
                <div className="flex">
                  <form className="flex ">
                    <div className="">
                      <select
                        name=""
                        id="ruang"
                        onChange={(e) => setFilter(e.target.value)}
                        className="border h-[34px] rounded-xl w-[100px] pl-2 "
                      >
                        <option value="" selected>
                          Ruang
                        </option>
                        {ruang.map((item) => {
                          return (
                            <option value={item.ruang}>{item.ruang}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="">
                      <select
                        name=""
                        id="bulan"
                        onChange={(e) => setFilterBulan(e.target.value)}
                        className="border h-[34px] rounded-xl w-[100px] pl-2 "
                      >
                        <option value="">Bulan</option>
                        {bulan.map((item, index) => {
                          return <option value={index}>{item}</option>;
                        })}
                      </select>
                    </div>
                    <div className="">
                      <select
                        name=""
                        id="tahun"
                        onChange={(e) => setFilterTahun(e.target.value)}
                        className="border h-[34px] rounded-xl w-[100px] pl-2 "
                      >
                        <option value="">Tahun</option>
                        {tahun.map((item, index) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                    <div className="">
                      <select
                        name=""
                        id="statuss"
                        onChange={(e) => setStatus(e.target.value)}
                        className="border h-[34px] rounded-xl w-[100px] pl-2 "
                      >
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="accept">Acc</option>
                        <option value="">All</option>
                      </select>
                    </div>
                    {/* <button className="bg-[#7B2CBF]  mb-4 px-3 text-center py-1 w-[100px] rounded-xl text-[#E5D5F2] font-abc">
                      Filter
                    </button> */}
                  </form>
                </div>
              </div>
              <DataGrid
                key={gridKey}
                disableRowSelectionOnClick
                autoHeight
                columns={columns}
                rows={row}
                data={row}
              />
            </div>
          </div>
        ) : null}
        {editBarang ? (
          <EditBarang
            setClose={setEditBarang}
            close={editBarang}
            idBarang={idBarang}
          />
        ) : null}
      </div>
    </>
  );
}
