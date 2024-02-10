import React from "react";
import { AppRoutes } from "./routes";
import { MainLayout } from "./layouts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./stores";
import { errorNotify } from "./utils/helper";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const { setLogout } = useAuth();
  axios.interceptors.response.use(
    function (response) {
      // 200 type responses, this should be left as it is
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        errorNotify(
          "Masa Login Telah Berakhir, Harap login kembali!",
          12312312312
        );
        setLogout();
        navigate("/");
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error)
      // Handle your 401 error, maybe the UI changes and removing from local storage
      return Promise.reject(error);
    }
  );
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
