import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getExport = async (body) => {
  return axios.get(
    `/api/v1/rekap?page=${body.currentPage}&&pageSize=10&searchTerm=${body.searchTerm}`,
    {
      responseType: "blob",
    }
  );
};

const useGetExport = (body) => {
  const query = useQuery({
    queryFn: getExport,
    queryKey: ["rekap", body],
    enabled: false,
    select: (data) => data?.data,
  });

  return query;
};

export default useGetExport;
