import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = async (body) => {
  return axios.get(
    `/api/v1/rekap?page=${body.currentPage}&&pageSize=10&searchTerm=${body.searchTerm}`
  );
};

const useGetRekap = (body) => {
  console.log(body);
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["rekap", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetRekap;
