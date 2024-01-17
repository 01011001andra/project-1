import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";

const RekapPenjualan = () => {
  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Hasil Penjualan</Link>
        </>
      }
      name_page={"Halaman Hasil Penjualan"}
    >
      <h1>Rekap</h1>
    </ContentLayout>
  );
};

export default RekapPenjualan;
