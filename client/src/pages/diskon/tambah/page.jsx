import React from "react";
import { ContentLayout } from "../../../layouts";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostDiskon } from "../../../hooks";

const TambahDiskon = () => {
  const { register, handleSubmit } = useForm();
  const mutation = usePostDiskon();

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate({
      total: parseInt(data.total),
      persen: parseInt(data.persen),
    });
  };

  return (
    <ContentLayout
      name_page={"Halaman Tambah Diskon"}
      navigasi={
        <>
          <Link to={"/diskon"}>Diskon</Link>
          &gt; <Link>Tambah Diskon</Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-6 py-10 bg-[#dcdefa] p-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-xl text-center">Tambah diskon</h1>
        <div className="flex flex-col gap-5">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Total :</span>
            </div>
            <input
              type="number"
              {...register("total")}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Persen :</span>
            </div>
            <input
              {...register("persen")}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
        </div>
        <div className="flex gap-5 items-end justify-end">
          <Link to={"/diskon"} className="btn btn-error text-white">
            Kembali
          </Link>
          <button type="submit" className="btn btn-success text-white">
            Submit
          </button>
        </div>
      </form>
    </ContentLayout>
  );
};

export default TambahDiskon;
