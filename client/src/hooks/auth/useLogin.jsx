import React from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores";

const login = (body) => {
  return axios.post("/api/v1/auth", {
    username: body.username,
    password: body.password,
  });
};

const useLogin = () => {
  const queryClient = new QueryClient();
  const { setLoginResponse } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: (data) => {
      setLoginResponse(data?.data);
      navigate("/cari-pelanggan");

      queryClient.invalidateQueries(["auth"]);
    },
  });

  return mutation;
};

export default useLogin;
