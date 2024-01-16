import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";

const DaftarPelanggan = () => {
  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Daftar Pelanggan</Link>
        </>
      }
      name_page={"Halaman Daftar Pelanggan"}
    ></ContentLayout>
  );
};

export default DaftarPelanggan;
