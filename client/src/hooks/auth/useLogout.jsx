import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function logout() {
  return axios.get("/api/v1/auth");
}

const useLogOut = () => {
  const query = useQuery({
    queryFn: logout,
    queryKey: ["auth"],
    enabled: false,
  });

  return query;
};

export default useLogOut;
