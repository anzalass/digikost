import { useState } from "react";

import Indikator from "../../components/admin/home/Indikator";
import Tagihan from "../../components/admin/pengadaanbarang/TabelBarang";
import Aktivitas from "../../components/admin/home/Aktivitas";
import AdminDetailCard from "../../components/admin/home/AdminDetailCard";
import SidebarOwner from "../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../components/layoutowner/TopbarOwner";
import AdminDetailCardOwner from "../../components/owner/AdminDetailCardOwner";
import { useEffect } from "react";

export default function HomePageOwner() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        <SidebarOwner setSidebar={1} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Owner"}</TopBarOwner>
        <div className="w-full mt-2 h-[50px] mx-auto ">
          <h1 className="text-[20px] font-abc ml-6">
            Selamat datang <span className="font-[500]">, Owner</span>
          </h1>
          <div className="mt-4 w-[95%] opacity-25 mx-auto  h-[1px] bg-slate-600"></div>
        </div>
        <Indikator />
        <div className="flex w-[97%] justify-center mx-aOuto  h-[60vh] ">
          <div className="w-[55%] ">
            <Aktivitas />
          </div>
          <div className=" w-[44%] ">
            <AdminDetailCardOwner />
          </div>
        </div>
      </div>
    </div>
  );
}
