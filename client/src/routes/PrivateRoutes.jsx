import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../stores";

const PrivateRoutes = () => {
  const { loginResponse } = useAuth();

  return loginResponse ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
