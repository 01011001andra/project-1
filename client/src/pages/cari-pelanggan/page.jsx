import React from "react";
import { ContentLayout } from "../../layouts";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CariPelanggan = () => {
  const { register, watch } = useForm();

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Cari Pelanggan</Link>
        </>
      }
      name_page={"Halaman Cari Pelanggan"}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-5">
          <input
            type="text"
            placeholder="Cari pelanggan..."
            className="input input-bordered w-full"
            {...register("cari")}
          />
          <button className="btn btn-primary text-white">CARI</button>
        </div>
      </div>
      {watch("cari") ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Nomor Whatsapp</th>
                <th>Nama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>089512486112</td>
                <td>M. Alief Chandra</td>
                <td className="text-end">
                  <button className="btn btn-primary">order now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="">Silahkan masukkan nomor hp untuk cari pelanggan...</h2>
      )}
    </ContentLayout>
  );
};

export default CariPelanggan;
