import React, { useState } from "react";

import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import TabelPemeliharaanAdminPage from "./TabelPemeliharaanAdminPage";

export default function PemeliharaanAdminPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBar>{"Pemeliharaan "}</TopBar>
        <TabelPemeliharaanAdminPage />
      </div>
    </div>
  );
}
