import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";

const HasilPenjualan = () => {
  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Hasil Penjualan</Link>
        </>
      }
      name_page={"Halaman Hasil Penjualan"}
    >
      <h1>Hel Hasil</h1>
    </ContentLayout>
  );
};

export default HasilPenjualan;
