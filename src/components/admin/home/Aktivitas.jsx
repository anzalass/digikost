import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useSelector } from "react-redux";

export default function Aktivitas() {
  const [aktivitas, setAktivitas] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchAktivitas = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/getAktivitasByUser/${user?.id}`
    );
    setAktivitas(res.request.data.results);
  };

  useEffect(() => {
    fetchAktivitas();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "pembuat", headerName: "Pembuat", minWidth: 150, flex: 0.7 },
    { field: "tgl", headerName: "Tanggal", minWidth: 150, flex: 0.7 },
    { field: "jam", headerName: "Jam", minWidth: 100, flex: 0.7 },
    {
      field: "statusGuruPengajar",
      headerName: "Guru Pengajar",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "statusGuruPiket",
      headerName: "Guru Pengajar",
      minWidth: 100,
      flex: 0.7,
    },
    { field: "aktivitas", headerName: "Aktivitas", minWidth: 100, flex: 0.7 },
  ];

  const row = [];

  aktivitas.forEach(async (a) => {
    const getIzinById = await axios.get(
      `${BACKEND_BASE_URL}/api/getIzinById/${a.idIzin}`
    );
    if (getIzinById.status != 404) {
      row.push({
        id: a.id,
        pembuat: a.idPembuat,
        tgl: a.tanggal,
        statusGuruPengajar: getIzinById.data.results.responGuruPengajarq,
        statusGuruPiket: getIzinById.data.results.responGuruPiket,
        jam: new Date(a.tanggal).toTimeString(),
        aktivitas: a.aktivitas,
      });
    }
  });

  return (
    <div className="bg-white w-[100%] mt-3 mx-auto">
      <div className="w-full justify-between flex p-2 ">
        <div className="">
          <h1 className="font-abc font-[500] text-[18px] my-3  ">
            Detail Aktivitas
          </h1>
        </div>
        <div className="">
          <button className="font-abc px-6 rounded-lg text-white text-[14px] py-1  font-[500] bg-[#155f95] my-3  ">
            Refresh Aktivitas
          </button>
        </div>
      </div>

      <DataGrid
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
    </div>
  );
}
