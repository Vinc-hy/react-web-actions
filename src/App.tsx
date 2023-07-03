import React, { useState, memo } from "react";
import "./App.css";
import routers from "@/router/index";
import { useRoutes } from "react-router-dom";
import LayOuts from "./layout";

const App = memo(() => {
  // return useRoutes(routers);
  return (
    <>
      <LayOuts></LayOuts>
    </>
  );
});

export default App;
