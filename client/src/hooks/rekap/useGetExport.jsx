import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getExport = async (body) => {
  return axios.get(`/api/v1/rekap/export`, {
    responseType: "blob",
  });
};

const useGetExport = (body) => {
  const query = useQuery({
    queryFn: getExport,
    queryKey: ["rekap", body],
    enabled: false,
  });

  return query;
};

export default useGetExport;
