import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetDiskon, usePostWhatsapp } from "../../../hooks";
import {
  convertToWhatsAppFormat,
  formatNomorTelepon,
  toRupiah,
} from "../../../utils/helper";
import { useNavigate } from "react-router";

const KirimWhatsappDetail = ({ detailPelanggan }) => {
  const [harga, setHarga] = useState();
  const [berat, setBerat] = useState();
  const { data: diskonData } = useGetDiskon({});
  const mutation = usePostWhatsapp();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const diskonByBerat = diskonData?.gabungan?.find(
    (item) => detailPelanggan?.data?.totalKg >= item?.total
  );

  const onSubmit = (data) => {
    const availableHarga =
      harga - (harga * diskonByBerat?.persen) / 100 || harga;

    let body = {
      ...data,
      id: detailPelanggan?.data?.id,
      harga: availableHarga,
    };

    mutation
      .mutateAsync(body)
      .then((res) => {
        const nomorWhatsApp = formatNomorTelepon(body.no_telp);
        const pesanTeks = encodeURIComponent(`Hi! pesanan kamu sudah siap.
berikut rinciannya:
        
total kg: ${body?.totalKg} kg
harga : Rp. ${toRupiah(harga)}
diskon: ${diskonByBerat ? `${diskonByBerat?.persen}%` : "-"}
total harga: ${
          diskonByBerat
            ? toRupiah(harga - (harga * diskonByBerat?.persen) / 100)
            : toRupiah(harga)
        }
        
Terima kasih.`);

        const linkWhatsApp = `https://wa.me/${convertToWhatsAppFormat(
          nomorWhatsApp
        )}?text=${pesanTeks}`;

        window.open(linkWhatsApp, "_blank");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    setHarga(detailPelanggan?.data?.totalKg * 10000);
    setBerat(detailPelanggan?.data?.totalKg);
    setValue("nama", detailPelanggan?.data?.nama);
    setValue("alamat", detailPelanggan?.data?.alamat);
    setValue("no_telp", detailPelanggan?.data?.no_telp);
    setValue("totalKg", detailPelanggan?.data?.totalKg);
  }, [detailPelanggan]);

  return (
    <dialog id="KirimWhatsappDetail" className="modal">
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
                    <td>
                      :{" "}
                      <input
                        type="text"
                        {...register("nama")}
                        disabled
                        className="text-black"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Alamat</td>
                    <td>
                      :{" "}
                      <input
                        type="text"
                        {...register("alamat")}
                        disabled
                        className="text-black"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">No Telp</td>
                    <td>
                      :{" "}
                      <input
                        type="number"
                        step={0.001}
                        {...register("no_telp")}
                        disabled
                        className="text-black"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Berat (Kg)</td>
                    <td>
                      :{" "}
                      <input
                        type="number"
                        step={0.001}
                        {...register("totalKg")}
                        disabled
                        className="text-black"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Harga Setelah Diskon</td>
                    <td>
                      :{" "}
                      <input
                        type="number"
                        {...register("harga")}
                        disabled
                        className="text-black hidden"
                      />
                      {diskonByBerat
                        ? toRupiah(
                            harga - (harga * diskonByBerat?.persen) / 100
                          )
                        : toRupiah(harga)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="submit" className="btn btn-success text-white">
            KIRIM
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default KirimWhatsappDetail;
