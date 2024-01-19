import React from "react";
import { ContentLayout } from "../../../layouts";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useGetOneDiskon, useUpdateDiskon } from "../../../hooks";

const UpdateDiskon = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  let body = {
    id,
  };
  const { data: diskonOneData } = useGetOneDiskon(body);

  const mutation = useUpdateDiskon();

  const onSubmit = (data) => {
    let body = {
      ...data,
      id: diskonOneData?.data?.id,
    };
    console.log(body);
    mutation.mutate(body);
  };

  function setDefaultValue() {
    setValue("total", diskonOneData?.data?.total);
    setValue("persen", diskonOneData?.data?.persen);
  }
  console.log(diskonOneData?.data?.total);
  React.useEffect(() => {
    setDefaultValue();
  }, [diskonOneData]);

  return (
    <ContentLayout
      name_page={"Halaman Update Diskon"}
      navigasi={
        <>
          <Link to={"/diskon"}>Diskon</Link>
          &gt; <Link>Update Diskon</Link>
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

export default UpdateDiskon;
