import React, { useState, useEffect } from "react";
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
import { Layout, Menu, theme, Button } from "antd";
import routers from "@/router/index";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

const RouterView = () => {
  //   return useRoutes(routers);

  const flattenedMenuItems = flattenMenuItems(routers);
  console.log(flattenedMenuItems);
  return (
    <>
      <Routes>
        {flattenedMenuItems.map((item: any) => {
          return (
            <React.Fragment key={item.key}>
              <Route
                key={item.key}
                path={item.key}
                element={item.element}
              ></Route>
            </React.Fragment>
          );
        })}
      </Routes>
    </>
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
  }, [loaclRouter]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = routers.filter((item: any) => {
    return item.key !== "/404";
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
            console.log(key);
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
