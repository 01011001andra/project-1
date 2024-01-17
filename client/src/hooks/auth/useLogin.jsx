import React from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const login = (body) => {
  return axios.post("/api/auth", {
    username: body.username,
    password: body.password,
  });
};

const useLogin = () => {
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
    },
  });

  return mutation;
};

export default useLogin;
