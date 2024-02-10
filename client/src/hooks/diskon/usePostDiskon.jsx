import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../utils/helper";

const createDiskon = (body) => {
  return axios.post("/api/v1/diskon", {
    total: body.total,
    persen: body.persen,
  });
};

const usePostDiskon = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return createDiskon(body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diskon"] });
      navigate("/diskon");
      successNotify("Berhasil menambahkan!");
    },
    onError: (error) => {
      errorNotify("Gagal menambahkan!");
    },
  });

  return mutation;
};

export default usePostDiskon;
