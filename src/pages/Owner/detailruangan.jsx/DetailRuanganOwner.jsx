import { useState } from "react";

import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";


import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GiAutoRepair } from "react-icons/gi";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../config/base_url";
// import ModalMaintenenceOwner from "./ModalMaintenenceOwner";
// import ModalChangeStatusOwner from "./ModalChangeStatusOwner";
import ModalChangeStatus from "../../../components/admin/detailbarangruangan/ModalChangeStatus";
import ModalMaintenence from "../../../components/admin/detailbarangruangan/ModalMaintenence";
import EditPemeliharaanModal from "../../../components/admin/pemeliharaan/EditPemeliharaanModal";

export default function DetailRuanganOwner() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [maintenence, setMaintenence] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [data, setData] = useState([]);
  const [pengadaan, setPengadaan] = useState([]);
  const [barang, setBarang] = useState([]);
  const [editMaintenence, setEditMaintenence] = useState(false);

  const [pemeliharaanBarang, setPemeliharaanBarang] = useState([]);

  const [updateData, setUpdateData] = useState({
    keterangan: null,
    id: null,
  });

  const { id } = useParams();
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const data = await axios.get("http://127.0.0.1:8000/api/getBarangRuangan/"+id);
      const getBarang = await axios.get(
        `http://localhost:8000/api/getKategori`
      );
      const getPengadaan = await axios.get(
        `http://localhost:8000/api/pengadaan`
      );
      const getPemeliharan = await axios.get(
        `http://localhost:8000/api/getPemeliharaan`
      );
      // setAsetBarang(data.data.results);
      setBarang(getBarang.data.results);
      setPengadaan(getPengadaan.data.results);
      setPemeliharaanBarang(getPemeliharan.data.results);
    } catch (err) {
      alert(err);
    }
  };

  const hapusPemeliharaan = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/api/deletePemeliharaan/${id}`
      );

      if (response) {
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };

  const columnsRuangan = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "qtybarang",
      headerName: "Qty Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4 "
              onClick={() => {
                setMaintenence(!maintenence);
                setData(params.row);
              }}
            >
              <GiAutoRepair size={20} />
            </button>
            <button className="mr-4">
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="">
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const columnsRuanganPemeliharaan = [
    { field: "id", headerName: "ID ", minWidth: 50, flex: 0.5 },
    {
      field: "tgl",
      headerName: "Tanggal",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Ruangan",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "biaya",
      headerName: "Biaya",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div
            className=""
            onClick={() => {
              updateData.id = params.id;
              setChangeStatus(!changeStatus);
            }}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              onClick={() => hapusPemeliharaan(params.id)}
              className="mr-4"
            >
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="" onClick={() => {
              updateData.id = params.id;
              setData(params.row);
              setEditMaintenence(true)
            }}>
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const rowBarangRuanganPemeliharaan = [];
  const rowBarangRuangan = [];

  pemeliharaanBarang
    .filter((item) => item.kodeRuang == id)
    .forEach((a) => {
      rowBarangRuanganPemeliharaan.push({
        id: a.kodePemeliharaan,
        tgl: a.created_at,
        nama_barang: a.kodeBarang,
        jumlah: a.jumlah,
        keterangan: a.keterangan,
        lokasi_barang: a.kodeRuang,
        status: a.status,
        biaya: a.harga,
      });
    });

  barang.forEach(async (a) => {
    let jumlahBarang = 0;
    // const getPengadaan = await axios.get("http://127.0.0.1:8000/api/findByKategori/"+a.kodeBarang);
    console.log(a.kodeBarang);
    const filterPengadaan = pengadaan.filter(
      (item) =>
        item.kodeBarang == a.kodeBarang &&
        item.kodeRuang == id &&
        item.is_active == 1
    );
    const filterPemeliharaan = pemeliharaanBarang.filter(
      (item) => item.kodeBarang == a.kodeBarang && item.kodeRuang == id && item.status != 'selesai'
    );

    filterPengadaan.forEach((bi) => {
      jumlahBarang += bi.quantity;
    });

    filterPemeliharaan.forEach((bi) => {
      jumlahBarang -= bi.jumlah;
    });
    console.log(a.kodeBarang);

    rowBarangRuangan.push({
      id: a.kodeBarang,
      nama_barang: a.namaBarang,
      qtybarang: jumlahBarang,
    });
  });

  return (
    <>
      {maintenence ? (
        <ModalMaintenence open={maintenence} setOpen={setMaintenence} data={data} ruang={id} />
      ) : null}
      {changeStatus ? (
        <ModalChangeStatus id={updateData.id} open={changeStatus} setOpen={setChangeStatus} />
      ) : null}
      {editMaintenence ? (
        <EditPemeliharaanModal
          open={editMaintenence}
          setOpen={setEditMaintenence}
          id={updateData.id}
          row={data}
        />
      ) : null}
      <div className="w-full h-[160vh] flex">
        <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
          <SidebarOwner setSidebar={4} width={open} setWidth={setOpen} />
        </div>
        <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
          <TopBarOwner>{"Detail Ruangan Owner"}</TopBarOwner>
          <div className="w-full">
            <div className="w-[96%] mx-auto mt-10">
              <DataGrid
                columns={columnsRuangan}
                rows={rowBarangRuangan.filter((item) => item.qtybarang)}
                disableRowSelectionOnClick
                autoHeight
              />
            </div>
            <div className="w-[96%] mx-auto mt-12">
              <DataGrid
                columns={columnsRuanganPemeliharaan}
                rows={rowBarangRuanganPemeliharaan.filter(item => item.status != 'selesai')}
                disableRowSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
