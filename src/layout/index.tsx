import React, { useState, useEffect } from "react";
import { Layout, Menu, theme, Button, Spin, Dropdown, Space } from "antd";
import { routes as routers } from "@/router/index";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Tab from "./tabs";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const LayOut: React.FC = () => {
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const [curretRouter, setCurrentRouter] = useState([""]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setCurrentRouter([pathname]);
  }, [pathname, collapsed]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 处理菜单栏
  const flattenMenuItems = (menuItems: any) => {
    const flattenedItems: any = [];
    menuItems.forEach((item) => {
      const { children, ...rest } = item;
      if (children && children.length === 1 && !children[0].children) {
        flattenedItems.push({ ...rest, ...children[0] });
      } else {
        flattenedItems.push({ ...rest });
        if (children) {
          const childItems = flattenMenuItems(children);
          flattenedItems[flattenedItems.length - 1].children = childItems;
        }
      }
    });
    return flattenedItems;
  };

  const arr = flattenMenuItems(routers);

  const items = arr.filter((item: any) => {
    return item.key !== "*" && item.key !== "/login" && item.key !== "/";
  });

  console.log(items, "itemsitems");

  const navigateTo = useNavigate();

  return (
    <Spin spinning={false} tip="正在加载中...">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={curretRouter}
            triggerSubMenuAction="click"
            mode="inline"
            items={items as any}
            onClick={({ key }) => {
              navigateTo(key);
            }}
          ></Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className={styles.flexBox}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <div className={styles.rightTop}>
                <UserOutlined className={styles.icon} />
                <Dropdown
                  dropdownRender={() => (
                    <Space style={{ padding: 8 }}>
                      <Button
                        type="primary"
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigateTo("/login");
                        }}
                      >
                        退出登录
                      </Button>
                    </Space>
                  )}
                >
                  <span className={styles.name}>Admin</span>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Tab></Tab>
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default LayOut;
