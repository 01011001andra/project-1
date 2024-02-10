import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getOne = (body) => {
  return axios.get(`/api/v1/diskon/${body.id}`);
};

const useGetOneDiskon = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getOne(body);
    },
    queryKey: ["diskon", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetOneDiskon;
