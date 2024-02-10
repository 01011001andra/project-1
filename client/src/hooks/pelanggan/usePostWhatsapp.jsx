import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { errorNotify, successNotify } from "../../utils/helper";

const postWhatsapp = (body) => {
  return axios.post(`/api/v1/pelanggan/complete/${body.id}`, {
    harga: body.harga,
  });
};

const usePostWhatsapp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (body) => {
      return postWhatsapp(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
      navigate("/rekap-penjualan");
      successNotify("Berhasil menambahkan!");
    },
    onError: (error) => {
      errorNotify("Gagal menambahkan!");
    },
  });

  return mutation;
};

export default usePostWhatsapp;
