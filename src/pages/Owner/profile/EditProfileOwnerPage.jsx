import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";

import { Link, useNavigate } from "react-router-dom";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useSelector } from "react-redux";

export default function EditProfileOwnerPage({ children }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    noHP: ""
  })

  const [err, setErr] = useState({
    name: "",
    email: "",
    noHP: ""
  })

  useEffect(() => {
    setDataUser({
      name: user?.name,
      email: user?.email,
      noHP: user?.noHP
    })
    console.log();
  }, [user])

  const changeDataHandler = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    })
    console.log(dataUser);
  }

  const UpdateUser = async () => {
    try {
      const res = await axios.put(`${BACKEND_BASE_URL}/api/updateDataUser/` + user?.id, dataUser);
      if (res.status === 200) {
        window.location.href = `${BASE_URL}owner/pengadaan-barang`;
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
        <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Edit Profile Admin"}</TopBarOwner>
        {children}
        <div className="w-[94%] mx-auto">
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Nama</h1>
            <input
              type="text"
              name="name"
              value={dataUser.name}
              onChange={e => changeDataHandler(e)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
            {err.name ?
              <p>{err.name}</p> : null
            }
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Email</h1>
            <input
              type="text"
              name="email"
              value={dataUser.email}
              onChange={e => changeDataHandler(e)}
              disabled={true}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">No Telephone</h1>
            <input
              type="text"
              name="noHP"
              value={dataUser.noHP}
              onChange={e => changeDataHandler(e)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
            {err.noHP ?
              <p>{err.noHP}</p> : null
            }
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
              onClick={() => nav("/owner")}
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
