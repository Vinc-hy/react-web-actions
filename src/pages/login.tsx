import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Test = () => {
  const navgatito = useNavigate();

  const handLogin = () => {
    localStorage.setItem("token", "2222");
    navgatito("/home");
  };
  return (
    <Button type="primary" onClick={() => handLogin()}>
      登录
    </Button>
  );
};

export default Test;
