import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const postGrafik = (body) => {
  return axios.post("/api/v1/rekap/grafik", body);
};

const usePostGrafik = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return postGrafik(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rekap"] });
    },
  });

  return mutation;
};

export default usePostGrafik;
