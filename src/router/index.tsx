// router index.js
// import LayOuts from "@/layout/index";
import React from "react";
// import { RouteObject } from "react-router-dom";
import Home from "@/pages/home";

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routers = [
  {
    key: "/",
    label: "首页",
    element: <Home />,
  },
  {
    key: "/pages/home",
    label: "测试",
    element: withLoadingComponent(<Home />),
  },
  {
    label: "测试1",
    children: [
      {
        key: "/pages/test1",
        label: "子测试1",
        element: withLoadingComponent(<Home />),
      },
      {
        key: "/pages/test2",
        label: "子测试2",
        element: withLoadingComponent(<Home />),
      },
    ],
  },
  {
    key: "/404",
    label: "404",
    element: <>404</>,
  },
];

export default routers;
