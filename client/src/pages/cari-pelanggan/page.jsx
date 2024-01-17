import React from "react";
import { ContentLayout } from "../../layouts";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PelangganModal } from "./components";

const CariPelanggan = () => {
  const { register, watch } = useForm();
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0, 10);
  function handleCari() {
    document.getElementById("PelangganModal").showModal();
  }

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
            placeholder="Masukkan nomor wa pelanggan..."
            className="input input-bordered w-full"
            {...register("cari")}
          />

          <button onClick={handleCari} className="btn btn-primary text-white">
            Cari
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-6 py-10 bg-[#dcdefa] p-5 rounded-lg">
        <h1 className="font-bold text-xl text-center">
          Tambah pelanggan baru!
        </h1>
        <div className="flex flex-col gap-5">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Nama pelanggan :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Nomor whatsapp :</span>
            </div>
            <input
              defaultValue={watch("cari")}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Alamat :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Tanggal :</span>
            </div>
            <input
              type="date"
              defaultValue={date}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
        </div>
        <button className="btn btn-success text-white">Submit</button>
      </form>

      {/* <h2 className="">Silahkan masukkan nomor hp untuk cari pelanggan...</h2> */}
      <PelangganModal />
    </ContentLayout>
  );
};

export default CariPelanggan;
