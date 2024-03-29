import React from "react";
import { ContentLayout } from "../../../layouts";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetOnePelanggan, useUpdatePelanggan } from "../../../hooks";

const UpdatePelanggan = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const mutation = useUpdatePelanggan();
  const { data: daftarOnePelangganData } = useGetOnePelanggan({ id });
  console.log(daftarOnePelangganData);
  const onSubmit = (body) => {
    mutation.mutate({ ...body, id });
  };

  function setDefaultValue() {
    setValue("nama", daftarOnePelangganData?.data?.nama);
    setValue("alamat", daftarOnePelangganData?.data?.alamat);
    setValue("no_telp", daftarOnePelangganData?.data?.no_telp);
    setValue("totalKg", daftarOnePelangganData?.data?.totalKg);
  }
  React.useEffect(() => {
    setDefaultValue();
  }, [daftarOnePelangganData]);

  return (
    <ContentLayout
      name_page={"Halaman Update Pelanggan"}
      navigasi={
        <>
          <Link to={"/daftar-pelanggan"}>Daftar Pelanggan</Link>
          &gt; <Link>Update Pelanggan</Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-6 py-10 bg-[#dcdefa] p-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-xl text-center">Update pelanggan baru</h1>
        <div className="flex flex-col gap-5">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Nama pelanggan :</span>
            </div>
            <input
              type="text"
              {...register("nama")}
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
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Berat :</span>
            </div>
            <input
              type="number"
              {...register("totalKg")}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
        </div>
        <div className="flex gap-5 items-end justify-end">
          <Link to={"/daftar-pelanggan"} className="btn btn-error text-white">
            Kembali
          </Link>
          <button className="btn btn-success text-white">Update</button>
        </div>
      </form>
    </ContentLayout>
  );
};

export default UpdatePelanggan;
