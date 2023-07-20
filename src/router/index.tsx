import { lazy, ReactNode, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Loading from "@/components/loading";
import AuthRouter from "./authRouter";

// 懒加载
const Test = lazy(() => import("@/pages/test"));
const LayOut = lazy(() => import("@/layout/index"));

//解决白屏现象
const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading></Loading>}> {children} </Suspense>;
};

export const routes: any[] = [
  {
    path: "/",
    key: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    key: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "/login",
    },
  },
  {
    key: "/home",
    label: "首页",
    element: <LayOut />,
    children: [
      {
        label: "首页",
        path: "/home",
        key: "/home",
        icon: <HomeOutlined />,
        element: lazyLoad(
          <AuthRouter>
            <Home />
          </AuthRouter>
        ),
      },
    ],
  },
  {
    key: "more",
    label: "更多",
    element: <LayOut />,
    icon: <SettingOutlined />,
    children: [
      {
        path: "/workbench",
        key: "/workbench",
        label: "更多1",
        element: lazyLoad(
          <AuthRouter>
            <Test />
          </AuthRouter>
        ),
      },
      {
        path: "/product/card",
        key: "/product/card",
        label: "更多2",
        element: lazyLoad(
          <AuthRouter>
            <Test />
          </AuthRouter>
        ),
      },
      {
        path: "/pageone/pagefour",
        key: "/pageone/pagefour",
        label: "更多3",
        element: lazyLoad(
          <AuthRouter>
            <Test />
          </AuthRouter>
        ),
      },
    ],
  },

  {
    key: "*",
    label: "404",
    element: <LayOut />,
    children: [
      {
        path: "*",
        element: <>这里啥都没有</>,
      },
    ],
  },
];

const Router = () => {
  const router = useRoutes(routes);
  return router;
};

export default Router;
