import Sidebar from "../../components/layout/Sidebar.jsx";
import TopBar from "../../components/layout/TopBar.jsx";
import TableTambahBarang from "../../components/admin/pengadaanbarang/TabelBarang.jsx";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { data } from "autoprefixer";
import { BASE_URL, BACKEND_BASE_URL } from "../../config/base_url.jsx";

export default function TambahBarangPage({ userSession }) {
  const [barang, setBarang] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [allKategori, setallKategori] = useState([]);
  const [kategori, setKategori] = useState({
    kodeBarang: "",
    namaBarang: "",
  });

  const [kategoriErrors, setKategoriErrors] = useState({
    kodeBarang: "",
    namaBarang: ""
  });

  const TambahKategori = async (e) => {
    e.preventDefault();
    try {
      const findKategori = await axios.get(
        `${BACKEND_BASE_URL}/api/findKategori/` +
        kategori.kodeBarang +
        "/" +
        kategori.namaBarang
      );

      if (findKategori.status === 200) {
        window.alert("dah ada");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const tambah = await axios.post(
            `${BACKEND_BASE_URL}/api/tambahKategori`,
            kategori
          );

          if (tambah.status === 200) {
            window.location.reload();
          }
        } catch (err) {
          setKategoriErrors(err.response.data.errors);
          setKategoriErrors({
            kodeBarang: err.response.data.errors.kodeBarang,
            namaBarang: err.response.data.errors.namaBarang
          })
          console.log(err.response.data.errors)
        }
      } else {
        console.error("Error while searching:", error);
      }
    }
  };

  const EditHandler = (kodeBarang, namaBarang) => {
    setKategori((prevData) => ({
      ...prevData,
      kodeBarang: kodeBarang,
      namaBarang: namaBarang,
    }));

    setIsEdit(true);
  };

  const TambahHandler = () => {
    setKategori((prevData) => ({
      ...prevData,
      kodeBarang: "",
      namaBarang: "",
    }));

    setIsEdit(false);
  };

  const UpdateKategori = async (id) => {
    const result = await axios.put(
      `${BACKEND_BASE_URL}/api/updateKategori/` + id,
      kategori
    );
    if (result) {
      window.location.reload();
    }
  };

  const DeleteKategori = async (id) => {
    console.log("ini id nya : ", id);
    const result = await axios.delete(
      `${BACKEND_BASE_URL}/api/kategoriDelete/` + id
    );
    if (result) {
      window.location.reload();
    }
  };

  const changeKategoriHandler = (e) => {
    setKategori({
      ...kategori,
      [e.target.name]: e.target.value,
    });
    console.log(kategori);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const queryParams = {
        quantity: 1,
      };
      const result = await axios.get(`${BACKEND_BASE_URL}/api/pengadaan`);
      setBarang(result.data.results);

      const resultKategori = await axios.get(`${BACKEND_BASE_URL}/api/getKategori`);
      setallKategori(resultKategori.data.results);

      // Add a delay before making the next request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log("something went wrong");
    }
  };

  const [addBarang, setAddBarang] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "Kode Barang", minWidth: 50, flex: 0.5 },

    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "aksi",
      headerName: "Aksi",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button className="mr-4" onClick={() => DeleteKategori(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button
              className=""
              onClick={() => EditHandler(params.id, params.row.nama_barang)}
            >
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];

  allKategori.forEach((a) => {
    row.push({
      id: a.kodeBarang,

      nama_barang: a.namaBarang,
    });
  });

  return (
    <div className="w-full h-[100vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <Sidebar setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBar userSession={userSession}>{"Pengadaan Barang"}</TopBar>
        <div className="w-[95%] h-[80px] justify-between flex mx-auto">
          <div className="">
            <button
              onClick={() => setAddBarang(!addBarang)}
              className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
            >
              Kategori Barang
            </button>
          </div>
          {addBarang ? null : (
            <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
              <input
                type="text"
                className="w-full h-full pl-2 rounded-lg"
                placeholder="Search"
              />
            </div>
          )}
        </div>
        <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>

        {!addBarang ? <TableTambahBarang data={barang} /> : null}

        {addBarang ? (
          <div className="w-[95%] mx-auto h-[105vh] bg-white rounded-xl">
            {isEdit ? (
              <div className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode Barang</h1>
                  <input
                    type="text"
                    value={kategori.kodeBarang}
                    name="kodeBarang"
                    disabled
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Barang</h1>
                  <input
                    type="text"
                    value={kategori.namaBarang}
                    name="namaBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>

                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={(e) => UpdateKategori(kategori.kodeBarang)}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => TambahHandler()}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode Barang</h1>
                  <input
                    type="text"
                    value={kategori.kodeBarang}
                    name="kodeBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriErrors.kodeBarang ?
                    <p>{kategoriErrors.kodeBarang}</p>
                    :
                    null
                  }
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Barang</h1>
                  <input
                    type="text"
                    value={kategori.namaBarang}
                    name="namaBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriErrors.namaBarang ?
                    <p>{kategoriErrors.namaBarang}</p>
                    :
                    null
                  }
                </div>

                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={(e) => TambahKategori(e)}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setAddBarang(!addBarang)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
            <div className="w-[95%] mx-auto mt-6 p-3 bg-white">
              <DataGrid
                className="w-full"
                disableRowSelectionOnClick
                autoHeight
                columns={columns}
                rows={row}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
