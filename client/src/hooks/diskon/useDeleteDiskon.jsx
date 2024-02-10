import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "../../utils/helper";

const deleteDiskon = (body) => {
  return axios.delete(`/api/v1/diskon/${body.id}`);
};

const useDeleteDiskon = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return deleteDiskon(body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diskon"] });
      document.getElementById("delete_diskon").close();
      successNotify("Berhasil dihapus!");
    },
    onError: (error) => {
      errorNotify("Gagal menghapus!");
    },
  });

  return mutation;
};

export default useDeleteDiskon;
