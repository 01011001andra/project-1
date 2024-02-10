import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "../../utils/helper";

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
      successNotify("Berhasil dihapus!");
    },
    onError: (error) => {
      errorNotify("Gagal menghapus!");
    },
  });

  return mutation;
};

export default useDeletePelanggan;
