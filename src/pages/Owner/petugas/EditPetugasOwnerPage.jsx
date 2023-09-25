import React, { useState, useEffect } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";

export default function EditPetugasOwnerPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [userSelected, setUserSelected] = useState({
    id: "",
    name: "",
    email: "",
    noHP: ""
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserById();
  }, [id])

  const GetUserById = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/getUserById/${id}`);
      setUserSelected({
        id: res.data.results.id,
        name: res.data.results.name,
        email: res.data.results.email,
        noHP: res.data.results.noHP
      });
    } catch (e) {
      console.log(e);
    }
  }

  const changeDataHandler = (e) => {
    setUserSelected({
      ...userSelected,
      [e.target.name]: e.target.value
    })
    console.log(userSelected);
  }

  const UpdateUser = async () => {
    try {
      const res = await axios.put(`${BACKEND_BASE_URL}/api/updateDataUser/` + userSelected.id, userSelected);
      if (res.status === 200) {
        window.location.href = `${BASE_URL}owner/petugas`;
      }
    } catch (e) {
      console.log("wkwk error :", e);
      setErr({
        name: e.response.data.error.name,
        noHP: e.response.data.error.noHP
      })
    }
  }

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        <SidebarOwner setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Edit Petugas Owner"}</TopBarOwner>
        <div className="w-[94%] mx-auto">
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Nama</h1>
            <input
              type="text"
              name="name"
              onChange={e => changeDataHandler(e)}
              value={userSelected.name}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Email</h1>
            <input
              type="text"
              name="email"
              onChange={e => changeDataHandler(e)}
              value={userSelected.email}
              disabled={true}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">No Telephone</h1>
            <input
              type="number"
              name="noHP"
              onChange={e => changeDataHandler(e)}
              value={userSelected.noHP}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <button className="bg-[#7B2CBF] px-3 py-1 w-[240px] rounded-md text-[#E5D5F2] font-abc">
              Request Ubah Password
            </button>
          </div>
          <div className="w-full mt-6 justify-center mb-7 flex items-center">
            <button onClick={UpdateUser} className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
              Simpan
            </button>
            <button
              onClick={() => nav("/owner/petugas")}
              className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
