import { useState } from "react";
import digiKosLogo from "../../assets/20231121_094728_0000_2-removebg-previeww 1.svg";
import { GrHomeRounded, GrLogout } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";

import { GiHamburgerMenu } from "react-icons/gi";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config/base_url";
export default function Sidebar({ open, setSidebar, width, setWidth }) {
  const { user } = useSelector((state) => state.user);
  let sidebarMenu = [];
  if (user.role == 1) {
    sidebarMenu = [
      {
        title: "Beranda",
        url: "/home",
        icon: <GrHomeRounded className={` fill-white  my-auto`} />,
      },
      {
        title: "Semua Izin",
        url: "/Izin",
        icon: <BsPencilSquare className="my-auto" />,
      },
    ];
  } else if (user.role == 2) {
    sidebarMenu = [
      {
        title: "Beranda",
        url: "/home",
        icon: <GrHomeRounded className={` fill-white  my-auto`} />,
      },
      {
        title: "Permintaan Izin",
        url: "/PermintaanIzin",
        icon: <BsPencilSquare className="my-auto" />,
      },
      {
        title: "Izin Saya",
        url: "/PermintaanIzinGuru",
        icon: <BsPencilSquare className="my-auto" />,
      },
    ];
  } else if (user.role == 4) {
    sidebarMenu = [
      {
        title: "Beranda",
        url: "/home",
        icon: <GrHomeRounded className={` fill-white  my-auto`} />,
      },
      {
        title: "Users",
        url: "/AllUsers",
        icon: <BsPencilSquare className="my-auto" />,
      },
      // {
      //   title: "Mata Pelajaran",
      //   url: "/MataPelajaran",
      //   icon: <BsPencilSquare className="my-auto" />,
      // },
    ];
  } else if (user.role == 5) {
    sidebarMenu = [
      {
        title: "Beranda",
        url: "/home",
        icon: <GrHomeRounded className={` fill-white  my-auto`} />,
      },
      {
        title: "Permintaan Izin",
        url: "/PermintaanIzin",
        icon: <BsPencilSquare className="my-auto" />,
      },
    ];
  }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res) {
        localStorage.removeItem("token");
        window.location.href = `${BASE_URL}`;
      }
    } catch (err) {
      alert(err);
    }
  };

  const navigate = useNavigate();
  let [menuClick, setMenuClick] = useState(1);
  const [openSide, setOpenSide] = useState(false);
  const testing = () => {
    setMenuClick(3);
  };
  return (
    <>
      <GiHamburgerMenu
        className={`left-3 fixed top-2 z-50`}
        size={25}
        onClick={() => setWidth(!width)}
      />
      <div
        className={`fixed h-[100vh] bg-white left-0 z-40 ${
          width ? "block" : "hidden"
        } shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] transition-all`}
      >
        <div className="ml-[210px]"></div>
        <div className="mt-[60px] w-full">
          <img
            src={digiKosLogo}
            className={`h-[50px] w-full  mx-auto`}
            alt=""
          />
        </div>
        <div className="w-full p-3 mt-4 bg-white">
          <h1 className={` font-abc`}>Main Menu</h1>
          <div className=" ml-2 mt-4">
            {sidebarMenu &&
              sidebarMenu.map((sm, index) => (
                <Link
                  to={sm.url}
                  key={index}
                  onClick={(e) => {
                    setMenuClick(1);
                  }}
                  className={`flex mt-2 ${
                    setSidebar === index + 1
                      ? "bg-[#155f95] text-white"
                      : "bg-white text-black"
                  }  h-[30px] rounded-md p-1 pl-3`}
                >
                  {sm.icon}
                  <h1 className={` ml-2 font-abc my-auto text-[14px]`}>
                    {sm.title.length > 16
                      ? sm.title.slice(0, 15) + ".."
                      : sm.title}
                  </h1>
                </Link>
              ))}
            <div
              onClick={logout}
              className={`flex mt-2 bg-white text-black cursor-pointer h-[30px] rounded-md p-1 pl-3`}
            >
              <HiMiniClipboardDocumentList className="my-auto" />,
              <h1 className={`ml-2 font-abc my-auto text-[14px]`}>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
