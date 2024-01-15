import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/reservation" element={<h1>reservation</h1>} />
      </Route>
      <Route element={<h1>Login</h1>} path="/" />
      <Route element={<h1>not-found</h1>} path="*" />
    </Routes>
  );
};

export default AppRoutes;
