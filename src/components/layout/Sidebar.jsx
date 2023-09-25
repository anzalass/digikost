import { useState } from "react";
import digiKosLogo from "../../assets/Digikos.svg";
import { GrHomeRounded, GrLogout } from "react-icons/gr";
import { ImEnter } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import { PiEnvelopeOpenBold } from "react-icons/pi";
import { BiSolidUserAccount } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";

import { GiHamburgerMenu } from "react-icons/gi";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, setSidebar, width, setWidth }) {
  const sidebarMenu = [
    {
      title: "Beranda",
      url: "/",
      icon: <GrHomeRounded className={` fill-white  my-auto`} />,
    },
    {
      title: "Pengadaan Barang",
      url: "/tambah-barang",
      icon: <BsPencilSquare className="my-auto" />,
    },
    {
      title: "Pemeliharaan Barang",
      url: "/pengeluaran",
      icon: <ImEnter className="my-auto" />,
    },
    {
      title: "Data Ruangan",
      url: "/data-ruangan",
      icon: <HiMiniClipboardDocumentList className="my-auto" />,
    },
  ];

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res) {
        localStorage.removeItem("token");
        window.location.reload();
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
    <div
      className={`${
        !width
          ? "w-[220px]  md:w-[80px] lg:w-[220px] xl:w-[220px] "
          : "w-[80px] md:w-[80px] lg:w-[80px] xl:w-[80px]"
      }  fixed min-h-screen bg-[#fff] transition-all w-[80px] `}
    >
      <div className="relative">
        <GiHamburgerMenu
          className={`absolute  top-2 ${
            !width
              ? "right-2 hidden md:hidden lg:block xl:block "
              : "right-7 hidden md:hidden lg:block xl:block"
          }`}
          size={25}
          onClick={() => setWidth(!width)}
        />
      </div>
      <div className="ml-[210px]">
        {/* <button className="" onClick={(e) => open(0)}>
          x
        </button> */}
      </div>
      <div className="pt-[40px] w-full">
        <img
          src={digiKosLogo}
          className={`${
            !width
              ? "hidden sm:hidden  md:hidden lg:hidden xl:hidden "
              : "hidden  md:hidden lg:hidden xl:hidden "
          } h-[50px] w-[100px]  mx-auto`}
          alt=""
        />
      </div>
      <div className="w-full p-3 mt-4 bg-white">
        <h1
          className={`${
            !width
              ? "hidden sm:hidden  md:hidden lg:block xl:block "
              : "hidden sm:hidden  md:hidden lg:hidden xl:hidden "
          } font-abc`}
        >
          Main Menu
        </h1>
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
                    ? "bg-[#9556CC] text-white"
                    : "bg-white text-black"
                }  h-[30px] rounded-md p-1 pl-3`}
              >
                {sm.icon}
                <h1
                  className={`${
                    !width
                      ? "hidden  md:hidden lg:block xl:block "
                      : "hidden  md:hidden lg:hidden xl:hidden "
                  } ml-2 font-abc my-auto text-[14px]`}
                >
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
            <h1
              className={`${
                !width
                  ? "hidden  md:hidden lg:block xl:block "
                  : "hidden  md:hidden lg:hidden xl:hidden "
              } ml-2 font-abc my-auto text-[14px]`}
            >
              Logout
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
