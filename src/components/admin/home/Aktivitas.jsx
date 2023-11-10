import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function Aktivitas() {
  const data = [
    {
      id: 1,
      tgl: "27-08-2023",
      jam: "12:30",
      aktivitas: "Maintenence Kipas",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "tgl", headerName: "Tanggal", minWidth: 150, flex: 0.7 },
    { field: "jam", headerName: "Jam", minWidth: 100, flex: 0.7 },
    { field: "aktivitas", headerName: "Aktivitas", minWidth: 100, flex: 0.7 },
  ];

  const row = [];

  data.forEach((a) => {
    row.push({
      id: a.id,
      tgl: a.tgl,
      jam: a.jam,
      aktivitas: a.aktivitas,
    });
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
          <button className="font-abc px-6 rounded-lg text-white text-[14px] py-1  font-[500] bg-[#7B2CBF] my-3  ">
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
