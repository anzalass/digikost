import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DetailPengadaan from "../../../components/admin/pengadaanbarang/DetailPengadaan";
import FotoDetail from "../../../components/admin/pengadaanbarang/FotoDetail";
import QrCodeModal from "./QrCodeModal";
import DetailFotoModal from "./DetailFotoModal";

export default function PengadaanBarangAdminPage({ userSession }) {
  const [open, setOpen] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const [barang, setBarang] = useState([]);
  const [allKategori, setallKategori] = useState([]);
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
  const [filter, setFilter] = useState("");
  const [detailFoto, setDetailFoto] = useState(false);
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

  for (let i = 0; i < 10; i++) {
    tahun.push(tahunSekarang - 1);
    tahunSekarang = tahunSekarang - 1;
  }

  const fetchData = async () => {
    try {
      const queryParams = {
        quantity: 1,
      };
      const result = await axios.get(`${BACKEND_BASE_URL}/api/pengadaan`);
      setBarang(result.data.results);

      const resultKategori = await axios.get(
        `${BACKEND_BASE_URL}/api/getKategori`
      );
      setallKategori(resultKategori.data.results);

      // Add a delay before making the next request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log("something went wrong");
    }
  };

  const DeletePengadaan = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id);
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            className={`${
              params.row.status === "pending"
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
            <button className="mr-4" onClick={() => DeletePengadaan(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>

            <button
              className="mr-4"
              onClick={() => {
                setValuePengadaan(params.row.foto);
                console.log(params.row.foto, "Adasdasdasdas");
                setDetailPengadaan(true);
              }}
            >
              <BsEye size={20} />
            </button>

            <button
              className=""
              onClick={() => {
                nav(`/admin/edit-pengadaan/${params.id}`);
                setIdBarang(params.id);
              }}
            >
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  let row = [];

  const showBarang = () => {
    barang
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
          nama_barang: `${a.namaBarang}:${a.merek}`,
          tgl: a.tanggalPembelian,
          harga: a.hargaBarang,
          lokasi_barang: a.ruang,
          foto: a.buktiNota,
          qty_barang: a.quantity,
          total_harga: a.hargaBarang * a.quantity,
          status: a?.status,
        });
      });
  };

  showBarang();

  return (
    <>
      {detailPengadaan ? (
        <QrCodeModal
          open={detailPengadaan}
          setOpen={setDetailPengadaan}
          value={valuePengadaan}
        />
      ) : null}
      {detailFoto ? (
        <DetailFotoModal
          open={detailFoto}
          setOpen={setDetailFoto}
          foto={foto}
        />
      ) : null}
      <div>
        <div className="w-full h-[160vh] flex">
          <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
            <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
          </div>
          <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
            <TopBar userSession={userSession}>{"Dashboard Admin"}</TopBar>

            <div className="w-[95%] mx-auto">
              <div className="w-[100%] h-[80px] justify-between flex mx-auto">
                <div className="">
                  <button
                    onClick={() => nav("/admin/kategori")}
                    className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Kategori Barang
                  </button>
                </div>
                {/* {addBarang ? null : ( */}
                <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
                  <input
                    type="text"
                    className="w-full h-full pl-2 rounded-lg"
                    placeholder="Search"
                  />
                </div>
                {/* )} */}
              </div>
              <div className="w-[100%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
              <div className="flex justify-between">
                <div className="">
                  <button
                    onClick={() => setPengadaanBarang(!pengadaanBarang)}
                    className="bg-[#7B2CBF] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Tambah Barang +
                  </button>
                </div>
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
                        return <option value={item.ruang}>{item.ruang}</option>;
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
        </div>
      </div>
    </>
  );
}
