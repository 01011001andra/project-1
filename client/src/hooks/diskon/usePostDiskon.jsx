import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};

export default usePostDiskon;
