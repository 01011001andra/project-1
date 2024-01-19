import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const updateDiskon = (body) => {
  return axios.put(`/api/v1/diskon/${body.id}`, {
    total: body.total,
    persen: body.persen,
  });
};

const useUpdateDiskon = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return updateDiskon(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diskon"] });
      navigate("/diskon");
    },
  });

  return mutation;
};

export default useUpdateDiskon;
