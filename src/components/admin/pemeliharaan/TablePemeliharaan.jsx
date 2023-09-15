import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import TambahPemeliharaan from "./TambahPemeliharaan";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";

// import "sweetalert2/src/sweetalert2.scss";

export default function TablePengeluaran() {
  const [addPemeliharaan, setAddPemeliharaan] = useState(false);
  const [dataPemeliharaan, setDataPemeliharaan] = useState([]);
  const [filterBulan, setFilterBulan] = useState('');
  const [filterTahun, setFilterTahun] = useState('');
  const bulan = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  let tahunSekarang = new Date().getFullYear() + 1;
  const tahun = [];

  for (let i = 0; i < 10; i++) {
    tahun.push(tahunSekarang - 1);
    tahunSekarang = tahunSekarang - 1;
  }

  useEffect(() => {
    fetchPemeliharaan();
  }, [])

  const fetchPemeliharaan = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/getPemeliharaan");

    setDataPemeliharaan(response.data.results);
  }

  const deleteBarang = () => {
    Swal.fire("Any fool can use a computer");
  };

  const columns = [
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
      field: "jumlah",
      headerName: "Jumlah",
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
    },
    {
      field: "aksi",
      headerName: "Aksi",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button className="mr-4">
              <BiPrinter size={20} />
            </button>
            <button className="mr-4" onClick={() => deleteBarang()}>
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

  const row = [];

  dataPemeliharaan.filter(item => (
    (filterBulan === '' || new Date(item.created_at).getMonth() === Number(filterBulan)) &&
    (filterTahun === '' || new Date(item.created_at).getFullYear() === Number(filterTahun))
  )).forEach((a) => {
    row.push({
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

  return (
    <div className="bg-white w-[95%] mt-3 mx-auto">
      <div className="flex justify-between w-full p-3">
        <div className="flex">
          <select
            name=""
            id=""
            onChange={e => setFilterBulan(e.target.value)}
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Bulan</option>
            {bulan.map((item, index) => {
              return (
                <option value={index}>{item}</option>
              )
            })}
          </select>
          <select
            name=""
            id=""
            onChange={e => setFilterTahun(e.target.value)}
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Tahun</option>
            {tahun.map((item) => {
              return (
                <option value={item}>{item}</option>
              )
            })}
          </select>
          <div className="">
            <button className="bg-[#7B2CBF] mb-3 px-3 text-center py-1 w-[130px] rounded-3xl text-[#E5D5F2] font-abc">
              Tampilkan
            </button>
          </div>
        </div>
      </div>
      <DataGrid
        className="w-[98%] mx-auto"
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
      {addPemeliharaan ? (
        <TambahPemeliharaan
          setClose={setAddPemeliharaan}
          close={!addPemeliharaan}
        />
      ) : null}
    </div>
  );
}
