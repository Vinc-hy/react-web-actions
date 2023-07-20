import { Navigate } from "react-router-dom";

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  // const { pathname } = useLocation();
  // const route = false; //searchRoute(pathname, rootRouter)

  // * 判断是否有Token

  const token = localStorage.getItem("token"); //store.getState().global.token
  if (token === "" || !token) return <Navigate to="/login" replace />;
  // * 如果访问的地址没有在路由表中重定向到403页面
  // if (routerList.indexOf(pathname) === -1) return <Navigate to="*" />;

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children;
};

export default AuthRouter;
