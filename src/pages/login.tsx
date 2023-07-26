import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "@/api/login";
const Test = () => {
  const navgatito = useNavigate();

  const { fetchData } = AdminLogin();

  const handLogin = async () => {
    try {
      const res = await fetchData({
        password: "408hhh",
        phone: "13166666666",
      });
      console.log(res?.data, "qwqw返回值");
      localStorage.setItem("token", res?.data.token || "2222");
    } catch (err) {
      console.log("此接口无效了");
      localStorage.setItem("token", "2222");
    }
    navgatito("/home");
  };
  return (
    <Button type="primary" onClick={() => handLogin()}>
      登录
    </Button>
  );
};

export default Test;
