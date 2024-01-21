import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const postWhatsapp = (body) => {
  return axios.post(`/api/v1/complete/${body.id}`, {
    harga: body.harga,
  });
};

const usePostWhatsapp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return postWhatsapp(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
    },
  });

  return mutation;
};

export default usePostWhatsapp;
