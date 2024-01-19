import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getOne = (body) => {
  return axios.get(`/api/v1/pelanggan/${body.id}`);
};

const useGetOnePelanggan = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getOne(body);
    },
    queryKey: ["pelanggan", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetOnePelanggan;
