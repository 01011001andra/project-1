import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../utils/helper";

const createPelanggan = (body) => {
  return axios.post("/api/v1/pelanggan", {
    nama: body.nama,
    alamat: body.alamat,
    no_telp: body.no_telp,
    totalKg: parseFloat(body.totalKg),
  });
};

const usePostPelanggan = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return createPelanggan(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
      navigate("/daftar-pelanggan");
      successNotify("Berhasil menambahkan!");
    },
    onError: (error) => {
      errorNotify("Gagal menambahkan!");
    },
  });

  return mutation;
};

export default usePostPelanggan;
