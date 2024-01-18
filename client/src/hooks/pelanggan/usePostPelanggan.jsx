import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const createPelanggan = (body) => {
  return axios.post("/api/v1/pelanggan", {
    nama: body.nama,
    alamat: body.alamat,
    no_telp: body.no_telp,
    totalKg: body.totalKg,
  });
};

const usePostPelanggan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return createPelanggan(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
    },
  });

  return mutation;
};

export default usePostPelanggan;
