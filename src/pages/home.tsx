import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  console.log("我进来了");

  const navgatito = useNavigate();

  const navgatite = (val: number) => {
    if (val === 1) {
      navgatito("/workbench", { state: { name: "cs", id: 1 } });
    } else {
      navgatito("/workbench", { state: { name: "cs", id: 2 } });
    }
  };

  return (
    <>
      <div className="home card">欢迎22222</div>
      <Button type="primary" onClick={() => navgatite(1)}>
        测试跳转带参数1
      </Button>
      <Button type="primary" onClick={() => navgatite(2)}>
        测试跳转带参数2
      </Button>
    </>
  );
};

export default Home;
