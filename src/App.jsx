import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import { store } from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import SemuaIzin from "./pages/Siswa/SemuaIzin";
import DetailIzin from "./pages/Siswa/DetailIzin";
import PermissionGuruPengajar from "./pages/GuruPiket/PermissionGuruPengajar";
import PermissionGuruPiket from "./pages/Guru/PermissionGuruPiket";
import AllUser from "./pages/Admin/User/AllUser";
import AddUser from "./pages/Admin/User/AddUser";
import EditUser from "./pages/Admin/User/EditUser";
import AddMapel from "./pages/Admin/MataPelajaran/AddMapel";
import MapelSiswa from "./pages/Admin/MataPelajaran/MapelSiswa";
import EditProfilePage from "./pages/EditProfilePage";


function App() {
  const { isLogin, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, [isLogin === true]);

  return (
    <>
      <BrowserRouter>
        {user === undefined ? (
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        )
          :
          user.role === 2 ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/PermintaanIzin" element={<PermissionGuruPengajar />} />
              <Route path="/Detail/:id" element={<DetailIzin />} />
              <Route path="/Profile" element={<EditProfilePage />} />
            </Routes>
          ) : user.role === 3 ?
            (
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route path="/Izin" element={<SemuaIzin />} />
                <Route path="/PermintaanIzin" element={<PermissionGuruPiket />} />
                <Route path="/Detail/:id" element={<DetailIzin />} />
                <Route path="/Profile" element={<EditProfilePage />} />
              </Routes>
            )
            : user.role === 4 ?
              (<Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route path="/AllUsers" element={<AllUser />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/EditUser/:id" element={<EditUser />} />
                <Route path="/MataPelajaran" element={<MapelSiswa />} />
                <Route path="/AddMapel" element={<AddMapel />} />
                <Route path="/Profile" element={<EditProfilePage />} />
              </Routes>) : user.role == 5 ?
                (
                  <Routes>
                    <Route
                      path="/"
                      element={<HomePage />}
                    />
                    <Route path="/PermintaanIzin" element={<SemuaIzin />} />
                    <Route path="/Detail/:id" element={<DetailIzin />} />
                    <Route path="/Profile" element={<EditProfilePage />} />
                  </Routes>
                )
                :
                (
                  <Routes>
                    <Route
                      path="/"
                      element={<HomePage />}
                    />
                    <Route path="/Izin" element={<SemuaIzin />} />
                    <Route path="/Detail/:id" element={<DetailIzin />} />
                    <Route path="/Profile" element={<EditProfilePage />} />
                  </Routes>
                )
        }
      </BrowserRouter>
    </>
  );
}

export default App;
