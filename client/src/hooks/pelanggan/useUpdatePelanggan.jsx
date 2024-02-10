import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../utils/helper";

const updatePelanggan = (body) => {
  console.log(body);
  return axios.put(`/api/v1/pelanggan/${body.id}`, {
    nama: body.nama,
    alamat: body.alamat,
    no_telp: body.no_telp,
    totalKg: body.totalKg,
  });
};

const useUpdatePelanggan = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return updatePelanggan(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
      navigate("/daftar-pelanggan");
      successNotify("Berhasil mengupdate!");
    },
    onError: (error) => {
      errorNotify("Gagal mengupdate!");
    },
  });

  return mutation;
};

export default useUpdatePelanggan;
