import React, { useState, useEffect, Suspense } from "react";
import { Layout, Menu, theme, Button } from "antd";
import routers from "@/router/index";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
import {
  useNavigate,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Loading from "@/components/loading";

const RouterView = () => {
  //   return useRoutes(routers);

  const flattenedMenuItems = flattenMenuItems(routers);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {flattenedMenuItems.map((item: any) => {
          return (
            <React.Fragment key={item.key}>
              <Route
                key={item.key}
                path={item.key}
                element={item.element}
              ></Route>
              <Route path="/" element={<Navigate to={"/"} replace />}></Route>
            </React.Fragment>
          );
        })}
      </Routes>
    </Suspense>
  );
};

function flattenMenuItems(menuItems) {
  let flattenedMenuItems: any = [];
  for (const item of menuItems) {
    if (item.children) {
      flattenedMenuItems = flattenedMenuItems.concat(
        flattenMenuItems(item.children)
      );
    } else {
      flattenedMenuItems.push(item);
    }
  }
  return flattenedMenuItems;
}

const LayOuts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [curretRouter, setCurrentRouter] = useState([""]);

  const loaclRouter = useLocation();

  useEffect(() => {
    setCurrentRouter([loaclRouter.pathname]);
    console.log(curretRouter, "curretRouter");
  }, [loaclRouter]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = routers.filter((item: any) => {
    return item.key !== "*";
  });

  const navigateTo = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={curretRouter}
          mode="inline"
          items={items as any}
          onClick={({ key }) => {
            navigateTo(key);
          }}
        ></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <RouterView />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayOuts;
