import React from "react";
import { useForm } from "react-hook-form";
import { usePostPelanggan } from "../../../hooks";

const PelangganModal = ({ detailPelanggan }) => {
  const { register, watch, handleSubmit } = useForm();
  const mutation = usePostPelanggan();

  const onSubmit = (data) => {
    let body = {
      nama: detailPelanggan?.nama,
      no_telp: detailPelanggan?.no_telp,
      alamat: detailPelanggan?.alamat,
      no_telp: detailPelanggan?.no_telp,
      ...data,
    };

    mutation.mutate(body);
  };

  return (
    <dialog id="PelangganModal" className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full justify-between gap-5"
        >
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg text-center">
              Pelanggan tersedia!
            </h3>
            <div className="overflow-x-auto">
              <table>
                <tbody>
                  <tr>
                    <td className="py-3 font-bold">Nama</td>
                    <td>: {detailPelanggan?.nama}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">No Telp</td>
                    <td>: {detailPelanggan?.no_telp}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Alamat</td>
                    <td>: {detailPelanggan?.alamat}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Terakhir membeli</td>
                    <td>: {detailPelanggan?.tanggal}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Berat (Kg)</td>
                    <td>
                      :{" "}
                      <input
                        type="number"
                        className="input-bordered input"
                        {...register("totalKg")}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success text-white"
            disabled={watch("totalKg") == 0}
          >
            LANJUT
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default PelangganModal;
