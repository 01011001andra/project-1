import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import {
  CariPelanggan,
  DaftarPelanggan,
  Diskon,
  HasilPenjualan,
  Login,
  RekapPenjualan,
  TambahPelanggan,
  UpdatePelanggan,
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/cari-pelanggan" element={<CariPelanggan />} />
        <Route path="/daftar-pelanggan" element={<DaftarPelanggan />} />
        <Route path="/daftar-pelanggan/tambah" element={<TambahPelanggan />} />
        <Route
          path="/daftar-pelanggan/update/:id"
          element={<UpdatePelanggan />}
        />
        <Route path="/diskon" element={<Diskon />} />
        <Route path="/hasil-penjualan" element={<HasilPenjualan />} />
        <Route path="/rekap-penjualan" element={<RekapPenjualan />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};

export default AppRoutes;
