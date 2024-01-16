import React from "react";
import { AppRoutes } from "./routes";
import { MainLayout } from "./layouts";

const App = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
