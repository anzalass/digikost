import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";

export default function ChangePassword() {
    const nav = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        password: "",
        konfirmPassword: ""
    });

    const [err, setErr] = useState({
        konfirmPassword: ""
    })

    const [open, setOpen] = useState(false);


    const changeDataHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    const UpdatePassword = async () => {
        try {
            if (data.password == data.konfirmPassword) {
                const res = await axios.put(`${BACKEND_BASE_URL}/api/ChangePassword/${id}`, data);
                if (res.status === 200) {
                    window.location.href = `${BASE_URL}/AllUsers`;
                }
            } else {
                setErr({ konfirmPassword: "Konfirmasi Password Tidak Sama" })
            }
        } catch (e) {
            console.log("wkwk error :", e);
        }
    }

    return (
        <div className="w-full h-[160vh] flex">
            <div className={``}>
                {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
                {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
                <Sidebar setSidebar={5} width={open} setWidth={setOpen} />
            </div>
            <div className={`w-11/12 mx-auto`}>
                <TopBar>{"Edit Petugas Owner"}</TopBar>
                <div className="w-[94%] mx-auto">
                    <div className="w-full mt-6">
                        <h1 className="font-abc font-[500]">Password</h1>
                        <input
                            type="text"
                            name="password"
                            onChange={e => changeDataHandler(e)}
                            value={data.password}
                            className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
                        />
                    </div>
                    <div className="w-full mt-6">
                        <h1 className="font-abc font-[500]">Konfirmasi Password</h1>
                        <input
                            type="text"
                            name="konfirmPassword"
                            onChange={e => changeDataHandler(e)}
                            value={data.konfirmPassword}
                            className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
                        />
                        {err.konfirmPassword ?
                            <p>{err.konfirmPassword}</p> : null
                        }
                    </div>
                    <div className="w-full mt-6 justify-center mb-7 flex items-center">
                        <button onClick={UpdatePassword} className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
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
