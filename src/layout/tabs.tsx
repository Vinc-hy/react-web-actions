import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes as routers } from "@/router/index";

const Tab = () => {
  const navgatito = useNavigate();

  const router = useLocation();

  console.log(router, "router");

  const onChange = (key: string) => {
    navgatito(key);
  };

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "remove") {
      remove(targetKey);
    }
  };

  const remove = (targetKey: string) => {
    const targetIndex = itemTabs.findIndex((pane) => pane.key === targetKey);
    const newPanes = itemTabs.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setactiveKey(key);
      navgatito(key);
    }
    setitemTabs(newPanes);
  };

  const [itemTabs, setitemTabs] = useState([
    { key: "/home", label: "首页", state: {} },
  ]);

  const [activeKey, setactiveKey] = useState("");

  const flattenedMenuItems = routers.flatMap((menuItem) => {
    if (menuItem.children) {
      return [menuItem, ...menuItem.children];
    } else {
      return menuItem;
    }
  });

  const newRouterArr = flattenedMenuItems;

  useEffect(() => {
    // TODO:先判断是否存在这个路由
    const filterArr = itemTabs?.filter((item: any) => {
      return item?.key === router?.pathname;
    });
    // 找出对应路由的名字
    const filterName: any = newRouterArr.filter((item: any) => {
      return item?.key === router?.pathname;
    });
    // TODO:不存在的话添加进去
    if (!filterArr.length) {
      const arr: any = filterArr;
      arr.push({
        key: router?.pathname,
        label: `${filterName[0]?.label}`,
        state: router?.state,
      });
      setitemTabs(itemTabs.concat(arr));
    }
    // 激活单签
    setactiveKey(router?.pathname);
  }, [router]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Tabs
        defaultActiveKey={"/home"}
        onTabClick={(key) => onChange(key)}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={itemTabs}
        hideAdd
      />
    </div>
  );
};

export default Tab;
