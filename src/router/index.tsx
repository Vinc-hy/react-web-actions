// router index.js
// import LayOuts from "@/layout/index";
// import { RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import Test from "@/pages/test";

// const withLoadingComponent = (comp: JSX.Element) => (
//   <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
// );

const routers = [
  {
    key: "/",
    label: "首页",
    element: <Home />,
  },
  {
    label: "测试1",
    children: [
      {
        key: "/pages/test1",
        label: "子测试1",
        element: <Test />,
      },
      {
        key: "/pages/test2",
        label: "子测试2",
        element: <Test />,
      },
    ],
  },
  {
    key: "*",
    label: "404",
    element: <>404</>,
  },
];

export default routers;
