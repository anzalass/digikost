import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Admin/LoginPage";
import HomePage from "./pages/Admin/HomePage";
import PengadaanBarang from "./pages/Admin/PengadaanBarangPage";
import PengeluaranPage from "./pages/Admin/PemeliharaanPage";
import DataRuanganPage from "./pages/Admin/DataRuanganPage";
import DetailBarangRuangan from "./pages/Admin/DetailBarangRuanganPage";

import HomePageOwner from "./pages/Owner/HomepageOwner";
import PengadaanBarangOwner from "./pages/Owner/pengadaanbarang/PengadaanBarangOwner";
import TambahBarangOwner from "./pages/Owner/pengadaanbarang/TambahBarangOwner";
import TambahKategoriOwner from "./pages/Owner/pengadaanbarang/TambahKategoriOwner";
import EditBarangOwner from "./pages/Owner/pengadaanbarang/EditBarangOwner";
import AccPengadaanBarangOwner from "./pages/Owner/pengadaanbarang/AccPengadaanBarangOwner";

import axios from "axios";
import PemeliharaanBarangOwner from "./pages/Owner/Pemeliharaanbarang/PemeliharaanBarangOwner";
import DataRuanganOwnerPage from "./pages/Owner/dataruangan/DataRuanganOwnerPage";
import TambahRuanganOwner from "./pages/Owner/dataruangan/TambahRuanganOwner";
import EditDataRuanganOwner from "./pages/Owner/dataruangan/EditDataRuanganOwner";
import DetailRuanganOwner from "./pages/Owner/detailruangan.jsx/DetailRuanganOwner";
import DaftarPetugasPage from "./pages/Owner/petugas/DaftarPetugasPage";
import PendaftaranPetugas from "./pages/Owner/petugas/PendaftaranPetugas";
import EditUserPage from "./pages/Admin/editprofileadmin/EditProfileAdminPage";
import EditProfileAdminPage from "./pages/Admin/editprofileadmin/EditProfileAdminPage";
import UbahPasswordAdminPage from "./pages/Admin/editprofileadmin/UbahPasswordAdminPage";
import PengadaanBarangAdminPage from "./pages/Admin/pengadaanbarang/PengadaanBarangAdminPage";

function App() {
  const [dataCookie, setDataCookie] = useState([]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getSession();
    console.log(token);
  }, []);

  // Set the authorization header with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getSession = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers,
      });

      console.log("response : ", response.data);
      setDataCookie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage userSession={dataCookie} loadingValue={loading} />
            }
          />
          <Route
            path="/"
            Component={() => <HomePage userSession={dataCookie} />}
          />
          <Route
            path="/tambah-barang"
            Component={() => <PengadaanBarang userSession={dataCookie} />}
          />
          <Route
            path="/detail-ruangan/:id"
            Component={() => <DetailBarangRuangan userSession={dataCookie} />}
          />
          <Route
            path="/data-ruangan"
            element={<DataRuanganPage userSession={dataCookie} />}
          />
          <Route
            path="/pengeluaran"
            element={<PengeluaranPage userSession={dataCookie} />}
          />
          <Route
            path="/profile"
            element={<EditProfileAdminPage userSession={dataCookie} />}
          />
          <Route
            path="/reset-password"
            element={<UbahPasswordAdminPage userSession={dataCookie} />}
          />
          {/* Owner Routes */}
          <Route
            path="/owner/"
            element={<HomePageOwner userSession={dataCookie} />}
          />
          <Route
            path="/owner/pengadaan-barang"
            element={<PengadaanBarangOwner />}
          />
          <Route path="/owner/tambah-barang" element={<TambahBarangOwner />} />
          <Route path="/owner/kategori" element={<TambahKategoriOwner />} />
          <Route path="/owner/edit-barang/:id" element={<EditBarangOwner />} />
          <Route
            path="/owner/pemeliharaan"
            element={<PemeliharaanBarangOwner />}
          />
          <Route
            path="/owner/menunggu-acc"
            element={<AccPengadaanBarangOwner />}
          />
          <Route
            path="/owner/data-ruangan"
            element={<DataRuanganOwnerPage />}
          />
          <Route
            path="/owner/tambah-ruangan"
            element={<TambahRuanganOwner />}
          />
          <Route
            path="/owner/edit-ruangan"
            element={<EditDataRuanganOwner />}
          />
          <Route
            path="/owner/detail-ruangan/:id"
            element={<DetailRuanganOwner />}
          />
          <Route
            path="/owner/daftar-petugas"
            element={<PendaftaranPetugas />}
          />
          <Route path="/owner/petugas" element={<DaftarPetugasPage />} />

          {/*  REVOLUSI*/}
          <Route
            path="/admin/pengadaan"
            element={<PengadaanBarangAdminPage userSession={dataCookie} />}
          />
          {/*  REVOLUSI*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
