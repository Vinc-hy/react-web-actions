import { Pagination, Space, Table, Tag } from "antd";
import { getList } from "@/api/login";
import { useEffect, useState } from "react";

const Test = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const { fetchData, handleCurrentChange, page, size, total, data, loading } =
    getList();

  useEffect(() => {
    getCurList();
  }, []);

  const getCurList = async () => {
    const res = await fetchData();
    res.data.list?.map((item: any) => {
      item.key = item.id;
      return item;
    });
  };

  const paginationProps: any = {
    current: page, //当前页码
    size: size, // 每页数据条数
    showTotal: () => <div>总共{total}项</div>,
    showQuickJumper: true,
    showSizeChanger: true,
    total, // 总条数
    onChange: (page, size) => handleCurrentChange(page, size),
    hideOnSinglePage: false,
  };

  console.log(paginationProps, "paginationProps");
  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.list}
        pagination={paginationProps}
        scroll={{ x: 1500, y: 300 }}
      ></Table>
    </div>
  );
};

export default Test;
