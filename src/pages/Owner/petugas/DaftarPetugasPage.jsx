import React, { useEffect, useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function DaftarPetugasPage() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);
    setAllUser(res.data.results);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const deletePetugas = async (id) => {
    const res = await axios.delete(`${BACKEND_BASE_URL}/api/deleteUser/${id}`,);

    if (res.status === 200) {
      window.location.reload();
    }
  }

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    {
      field: "nama",
      headerName: "Nama Petugas",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "nohp",
      headerName: "No HP",
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
            <button onClick={() => deletePetugas(params.id)} className="mr-4">
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
  allUser.forEach((a) => {
    row.push({
      id: a.id,
      nama: a.name,
      email: a.email,
      role: a.role,
      nohp: a.noHP
      // qtybarang: a.qtybarang,
    });
  });

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Daftar Petugas"}</TopBarOwner>
        <div className="w-full">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="">
              <button
                onClick={() => nav("/owner/daftar-petugas")}
                className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Tambah Petugas +
              </button>
            </div>
            <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
              <input
                type="text"
                className="w-full h-full pl-2 rounded-lg"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="w-[90%] mx-auto">
            <DataGrid
              rows={row}
              columns={columns}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </div>
  );
}