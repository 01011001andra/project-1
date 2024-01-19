import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";
import { Recharts } from "./components";

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
      <div className="w-full min-h-[25vh] gap-16 md:min-h-[40vh] lg:min-h-[50vh] xl:min-h-[70vh] 2xl:min-h-[80vh] flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-center ">
          <h1 className="font-bold uppercase">Grafik hasil penjualan</h1>
          <label className="form-control w-full max-w-xs">
            <select className="select select-bordered">
              <option disabled selected>
                Pilih salah satu
              </option>
              <option>Harian</option>
              <option>Bulanan</option>
              <option>Tahunan</option>
            </select>
          </label>
        </div>
        <Recharts />
      </div>
    </ContentLayout>
  );
};

export default HasilPenjualan;
