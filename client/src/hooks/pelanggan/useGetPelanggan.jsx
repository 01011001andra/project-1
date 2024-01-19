import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/pelanggan?page=${body.currentPage}&&pageSize=10&searchTerm=${body.searchTerm}`
  );
};

const useGetPelanggan = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["pelanggan", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetPelanggan;
