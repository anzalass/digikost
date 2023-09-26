import axios from "axios";
import loginBanner from "../../assets/BACKGROUND.png";
import digiKosLogo from "../../assets/Digikos.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config/base_url";

export default function LoginPage({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errData, setErrData] = useState({
    email: "",
    password: ""
  })
  const [redirect, setRedirect] = useState(false);
  const nav = useNavigate();

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const login = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );

      localStorage.setItem("token", response.data.message);

      const content = response.data.message;
      console.log(response.status);
      console.log(content);
      setRedirect(true);
    } catch (e) {
      console.log(e);
      setErrData({
        email: e.response.data.errors.email,
        password: e.response.data.errors.password
      })
    }
  };

  useEffect(() => {
    if (user?.role !== undefined) {
      window.location.href = `${BASE_URL}`;
    }
  }, [user]);

  // if (user.name != undefined) {
  //   window.location.href = "/";
  // }

  // if (redirect) {
  //   window.location.href = "/";
  // }

  return (
    <div className="w-full h-[100vh] bg-[#fff] flex">
      <div className="w-[50%] relative h-full justify-center p-5 items-center ">
        {children}
        <img
          src={digiKosLogo}
          className="h-[50px] z-40 mx-auto mt-12  w-[150px] invisible"
          alt=""
        />
        <div className="bg-[#fff] p-3 w-[80%] mx-auto mt-4 pl-[8px] ">
          <div className="w-[90%] -300 mx-auto justify-center items-center ">
            <h1 className="text-[30px] ml-8 font-[500] mt-[30px] font-abc">
              Selamat Datang
            </h1>
            <h3 className="font-abc mt-3 ml-8">
              Login dibawah untuk akses akunmu
            </h3>

            <div className="mt-8 ml-8">
              <h1 className="font-abc mb-1">Username</h1>
              <input
                type="text"
                name="email"
                onChange={(e) => changeHandler(e)}
                className="border-2  rounded-xl pl-3 w-[90%] h-[36px] font-abc text-[14px] border-slate-400"
                placeholder="Masukan Username"
              />
              {errData.email ?
                <p>{errData.email}</p> : null
              }
            </div>
            <div className="mt-4 ml-8">
              <h1 className="font-abc mb-1">Password</h1>
              <input
                type="password"
                name="password"
                onChange={(e) => changeHandler(e)}
                className="border-2  rounded-xl pl-3 w-[90%] h-[36px] font-abc text-[14px] border-slate-400"
                placeholder="Masukan Password"
              />
              {errData.password ?
                <p>{errData.password}</p> : null
              }
            </div>
            <div className="mt-8 ml-8">
              <button
                onClick={login}
                className="rounded-xl  font-abc text-white w-[90%] bg-[#7B2CBF] h-[36px]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="w-full  text-[12px] h-[20px] font-abc text-center mt-[100px]">
          2023 digikos. All Right Reserved{" "}
          <span className="ml-4">Sistem manajemen kost </span>
        </div>
      </div>
      <div className="w-[65%] right-0 absolute items-end justify-end h-full">
        <img src={loginBanner} className=" w-[100vw] h-full " alt="" />
      </div>
    </div>
  );
}
