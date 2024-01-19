import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = () => {
  return axios.get("/api/v1/diskon");
};

const useGetDiskon = () => {
  const query = useQuery({
    queryFn: () => {
      return getAll();
    },
    queryKey: ["diskon"],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetDiskon;
