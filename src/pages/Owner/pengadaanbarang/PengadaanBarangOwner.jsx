import React, { useEffect, useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import testgambar from "../../../assets/img_car.png";
import axios from "axios";
import DetailPengadaan from "../../../components/admin/pengadaanbarang/DetailPengadaan";
import FotoDetail from "../../../components/admin/pengadaanbarang/FotoDetail";

export default function PengadaanBarangOwner() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const [barang, setBarang] = useState([]);
  const [editBarang, setEditBarang] = useState(false);
  const [valuePengadaan, setValuePengadaan] = useState();
  const [detailPengadaan, setDetailPengadaan] = useState(false);
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const [detailFoto, setDetailFoto] = useState(false);
  const [foto, setFoto] = useState("");
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
  const editBarangFunc = (id) => {
    nav(`/owner/edit-barang/${id}`);
  };

  const fetchData = async () => {
    try {
      const queryParams = {
        quantity: 1,
      };
      const result = await axios.get(`http://localhost:8000/api/pengadaan`);
      setBarang(result.data.results);

      const resultRuang = await axios.get(
        `http://localhost:8000/api/getRuang`
      );
      setRuang(resultRuang.data.results);

      // Add a delay before making the next request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log("something went wrong");
    }
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
            <button className="mr-4" onClick={() => DeletePengadaan(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>

            <button
              className="mr-4"
              onClick={() => {
                setValuePengadaan(params.row.foto);
                setDetailPengadaan(true);
                console.log(params, "kom");
              }}
            >
              <BsEye size={20} />
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
          </div>
        );
      },
    },
  ];

  const DeletePengadaan = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id);
    window.location.reload();
  };

  const row = [];

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
        <DetailPengadaan
          open={detailPengadaan}
          setOpen={setDetailPengadaan}
          value={valuePengadaan}
        />
      ) : null}
      {detailFoto ? (
        <FotoDetail open={detailFoto} setOpen={setDetailFoto} foto={foto} />
      ) : null}
      <div className="w-full h-[160vh] flex">
        <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
          <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
        </div>
        <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
          <TopBarOwner>{"Dashboard Owner"}</TopBarOwner>
          <div className=" min-h-screen bg-white  w-[95%] mx-auto mt-[10px] ">
            {/* section 1  */}
            <div className="w-full h-[100px] bg-white flex p-3  justify-between">
              <div className="">
                <button
                  onClick={() => nav("/owner/tambah-barang")}
                  className="bg-[#7B2CBF] h-[40px] mt-1 mr-2 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Tambah Barang +
                </button>
                <button
                  onClick={() => nav("/owner/kategori")}
                  className="bg-[#7B2CBF] h-[40px] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Kategori Barang
                </button>
              </div>
              <button
                onClick={() => nav("/owner/menunggu-acc/")}
                className="bg-[#7B2CBF] relative mt-1 mb-3 h-[40px] px-3 text-center py-1 w-[300px] rounded-md text-[#E5D5F2] font-abc"
              >
                <div className="absolute h-[20px] text-sm w-[20px] text-white bg-red-500 -right-2 -top-2 rounded-full">
                  {barang.filter(item => item.status == 'pending').length}
                </div>
                Menunggu Persetujuan
              </button>
            </div>
            {/* section 1  */}
            {/* section 2 */}
            <div className="w-full  bg-white flex p-3  justify-start">
              <form className="flex ">
                <div className="">
                  <select
                    name=""
                    id="ruang"
                    className="border h-[34px] rounded-xl w-[100px] pl-2 "
                  >
                    <option value="" selected>Ruang</option>
                    {ruang.map((item) => {
                      return (
                        <option value={item.ruang}>{item.ruang}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="">
                  <select
                    name=""
                    id="bulan"
                    className="border h-[34px] rounded-xl w-[100px] pl-2 "
                  >
                    <option value="" selected>Bulan</option>
                    {bulan.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="">
                  <select
                    name=""
                    id="tahun"
                    className="border h-[34px] rounded-xl w-[100px] pl-2 "
                  >
                    <option value="">Tahun</option>
                    {tahun.map((item) => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="">
                  <select
                    name=""
                    id="statuss"
                    className="border h-[34px] rounded-xl w-[100px] pl-2 "
                  >
                    <option value="">Status</option>
                    <option value="">Pending</option>
                    <option value="">Acc</option>
                    <option value="">All</option>
                  </select>
                </div>
                <button className="bg-[#7B2CBF]  mb-4 px-3 text-center py-1 w-[100px] rounded-xl text-[#E5D5F2] font-abc">
                  Filter
                </button>
              </form>
            </div>
            {/* section 2 */}
            {/* section 3 */}
            <DataGrid
              className="w-[98%] mx-auto"
              disableRowSelectionOnClick
              autoHeight
              columns={columns}
              rows={row}
            />
            {/* section 3 */}
          </div>
        </div>
      </div>
    </>
  );
}
