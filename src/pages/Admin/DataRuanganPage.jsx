import { useEffect, useState } from "react";
import TabelDataRuangan from "../../components/admin/dataruangan/TabelDataRuangan";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../config/base_url";

export default function DataRuanganPage() {
  const [addRuangan, setaddRuangan] = useState(0);
  const [editRuangan, setEditRuangan] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataRuangan, setDataRuangan] = useState([]);
  const [errRuangan, setErrRuangan] = useState({
    kodeRuang: "",
    ruang: "",
  });
  const [valueEdit, setValueEdit] = useState({
    kodeRuang: "",
    ruang: "",
  });

  useEffect(() => {
    getAllRuangan();
  }, []);

  const getAllRuangan = async () => {
    try {
      const ruang = await axios.get(`${BACKEND_BASE_URL}/api/getRuang`);
      console.log(ruang);
      setDataRuangan(ruang.data.results);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log(err);
    }
  };

  const [dataRuang, setDataRuang] = useState({
    kodeRuang: "",
    ruang: "",
  });

  const changeEditHandler = (e) => {
    setValueEdit({
      ...valueEdit,
      [e.target.name]: e.target.value,
    });
  };

  const changeRuangHandler = (e) => {
    setDataRuang({
      ...dataRuang,
      [e.target.name]: e.target.value,
    });
  };

  const tambahRuang = async () => {
    try {
      const add = await axios.post(
        `${BACKEND_BASE_URL}/api/tambahRuang`,
        dataRuang
      );

      if (add.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response.data.errors);
      setErrRuangan({
        kodeRuang: err.response.data.errors.kodeRuang,
        ruang: err.response.data.errors.ruang,
      });
    }
  };

  const editRuang = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/updateRuang`,
        valueEdit
      );

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setErrRuangan({
        kodeRuang: err.response.data.errors.kodeRuang,
        ruang: err.response.data.errors.ruang,
      });
    }
  };

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <Sidebar setSidebar={4} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBar>{"Data Ruangan"}</TopBar>
        <div className="w-full mt-2 h-[50px] mx-auto ">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="">
              <button
                onClick={() => setaddRuangan(1)}
                className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Tambah Ruangan
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

          {addRuangan === 1 && editRuangan === 0 ? (
            <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
              <div action="" className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    name="kodeRuang"
                    onChange={(e) => changeRuangHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errRuangan.kodeRuang ? <p>{errRuangan.kodeRuang}</p> : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    name="ruang"
                    onChange={(e) => changeRuangHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errRuangan.ruang ? <p>{errRuangan.ruang}</p> : null}
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={() => tambahRuang()}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setaddRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {addRuangan === 0 && editRuangan === 1 ? (
            <div className="w-[95%] mx-auto h-[50vh] bg-white rounded-xl">
              <div className="w-[95%] mx-auto mt-6 p-3">
                <h1 className="font-abc">Edit Ruangan</h1>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    name="kodeRuang"
                    value={valueEdit.kodeRuang}
                    onChange={(e) => changeEditHandler(e)}
                    disabled
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errRuangan.kodeRuang ? <p>{errRuangan.kodeRuang}</p> : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    name="ruang"
                    value={valueEdit.ruang}
                    onChange={(e) => changeEditHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {errRuangan.ruang ? <p>{errRuangan.ruang}</p> : null}
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={editRuang}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {addRuangan === 0 || editRuangan === 1 ? (
            <TabelDataRuangan
              setEdit={setEditRuangan}
              setErrRuangan={setErrRuangan}
              setValueEdit={setValueEdit}
              edit={editRuangan}
              data={dataRuangan}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
