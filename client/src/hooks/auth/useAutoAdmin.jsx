import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function autoAdmin() {
  return axios.get("/api/v1/auth/autoAdmin");
}

const useAutoAdmin = () => {
  const query = useQuery({
    queryFn: autoAdmin,
    queryKey: ["autoAdmin"],
  });

  return query;
};

export default useAutoAdmin;
