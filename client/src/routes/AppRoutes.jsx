import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { CariPelanggan, Login } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/cari-pelanggan" element={<CariPelanggan />} />
        <Route path="/daftar-pelanggan" element={<h1>daftar-pelanggan</h1>} />
        <Route path="/diskon" element={<h1>diskon</h1>} />
        <Route path="/hasil-penjualan" element={<h1>hasil penjualan</h1>} />
        <Route path="/rekap-penjualan" element={<h1>rekap penjualan</h1>} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};

export default AppRoutes;
