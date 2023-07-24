import { UseRequest } from "@/hooks/useRequest";

export const AdminLogin = () => {
  return UseRequest({
    url: "/admin/v1/login",
    method: "post",
  });
};

// 分页写法
export const getList = () => {
  return UseRequest({
    url: "/admin/v1/menu/getMenuList",
    method: "get",
    pagination: true,
    pageSize: 10,
  });
};
