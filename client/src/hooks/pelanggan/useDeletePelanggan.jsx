import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePelanggan = (body) => {
  return axios.delete(`/api/v1/pelanggan/${body.id}`);
};

const useDeletePelanggan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return deletePelanggan(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggan"] });
      document.getElementById("delete_pelanggan").close();
    },
  });

  return mutation;
};

export default useDeletePelanggan;
