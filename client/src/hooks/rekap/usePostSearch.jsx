import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createNoTelp = (body) => {
  return axios.post("/api/v1/rekap/search", {
    no_telp: body.no_telp,
  });
};

const usePostSearch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return createNoTelp(body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export default usePostSearch;
