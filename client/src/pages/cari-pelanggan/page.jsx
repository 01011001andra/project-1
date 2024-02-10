import React, { useState } from "react";
import { ContentLayout } from "../../layouts";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PelangganModal } from "./components";
import { usePostPelanggan, usePostSearch } from "../../hooks";

const CariPelanggan = () => {
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0, 10);

  const [tambahPelanggan, setTambahPelanggan] = useState(false);
  const [detailPelanggan, setDetailPelanggan] = useState({});

  const searchMutation = usePostSearch();
  const pelangganMutation = usePostPelanggan();

  const { register, handleSubmit, watch, setValue } = useForm();

  function handleCari() {
    let body = {
      no_telp: watch("cari"),
    };

    searchMutation
      .mutateAsync(body)
      .then((res) => {
        setTambahPelanggan(false);
        setDetailPelanggan(res.data);
        document.getElementById("PelangganModal").showModal();
      })
      .catch((err) => {
        setTambahPelanggan(true);
      });
    setValue("no_telp", watch("cari"));
  }

  const onSubmit = (data) => {
    let body = {
      nama: data.nama,
      alamat: data.alamat,
      no_telp: data.no_telp,
      totalKg: data.totalKg,
    };
    pelangganMutation.mutate(body);
  };

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
            {...register("cari")}
            placeholder="Masukkan nomor wa pelanggan..."
            className="input input-bordered w-full"
          />

          <button onClick={handleCari} className="btn btn-primary text-white">
            Cari
          </button>
        </div>
      </div>
      {tambahPelanggan ? (
        <form
          className="flex flex-col gap-6 py-10 bg-[#dcdefa] p-5 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl text-center">
            Tambah pelanggan baru
          </h1>
          <div className="flex flex-col gap-5">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Nama pelanggan :</span>
              </div>
              <input
                type="text"
                {...register("nama")}
                required
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Alamat :</span>
              </div>
              <input
                {...register("alamat")}
                required
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">No Telp :</span>
              </div>
              <input
                {...register("no_telp")}
                required
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Berat (Kg) :</span>
              </div>
              <input
                type="number" step="0.001"
                {...register("totalKg")}
                required
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <div className="w-full">
            <button className="w-full btn btn-success text-white">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <h2 className="">Silahkan masukkan nomor hp untuk cari pelanggan...</h2>
      )}

      <PelangganModal detailPelanggan={detailPelanggan?.data} />
    </ContentLayout>
  );
};

export default CariPelanggan;
