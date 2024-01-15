import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { Login } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/reservation" element={<h1>reservation</h1>} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};

export default AppRoutes;
