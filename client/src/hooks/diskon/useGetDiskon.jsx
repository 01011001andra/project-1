import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/diskon?page=${body.currentPage}&&pageSize=10&searchTerm=${body.searchTerm}`
  );
};

const useGetDiskon = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["diskon", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetDiskon;
