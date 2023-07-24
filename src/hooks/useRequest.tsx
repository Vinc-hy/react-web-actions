import api from "@/utils/http";
import qs from "qs";
import { useRef, useState } from "react";

export type RequestMethods = "get" | "put" | "post" | "delete";

interface RequestOptions {
  url: string;
  method: RequestMethods;
  type?: "json";
  data?: Record<string, any>;
  page?: number;
  pageSize?: number;
  pagination?: boolean; // 是否分页
  cache?: boolean; // 是否开始缓存
  setExpireTime?: number; // 缓存时间
  cancelRequest?: boolean; // 是否开启取消重复请求
  query?: Record<string, any>;
}

interface State {
  code: number;
  success: boolean;
  data: { list?: any[]; total?: number; [index: string]: any };
  msg: any;
  loading: boolean;
  query: Record<string, any>;
  filter: Record<string, any>;
  sort: { sort_key: string } | null;
  page: number;
  size: number;
  total: number;
  multiple: boolean;
  count: number;
}

/**
 * TODO：还需要封装取消请求的方法
 *
 * axios 请求状态封装，返回响应式数据 fetch(), loading, code, msg 等常用方法/状态
 *
 *
 * @param {Object} options 对象
 * @param {String} options.url 请求的URL
 * @param {String} options.method 请求的方法
 * @param {Object} options.data 请求的参数
 * @param {boolean} options.pagination 是否分页
 * @param {boolean} options.cache 是否开启缓存机制
 * @param {boolean} options.cacheKey 设置缓存唯一标识
 * @param {number} options.cacheTime 设置缓存的超时时间
 * @param {number} options.staleTime 设置缓存数据的新鲜度
 * @returns {Object} 返回fetch(), loading, code, msg
 */
export const UseRequest = (
  options: RequestOptions = {
    url: "/",
    method: "get",
    type: "json",
    data: {},
    query: {},
    pagination: false, // 是否分页
  }
) => {
  const params: State = {
    code: 0, // 业务码
    success: false, // 请求是否成功
    data: options.data || {},
    msg: "",
    loading: false,
    query: options.query || {},
    filter: {},
    sort: null,
    page: options.page || 1,
    size: options.pageSize || 400,
    total: 0,
    multiple: true, // 请求多次
    count: 0, // 第几次请求
  };

  const stateRef = useRef({ ...params });

  const [state, setState] = useState({ ...stateRef.current });

  // 分页请求
  const handleCurrentChange = (page: number, size: number) => {
    stateRef.current.page = page;
    stateRef.current.size = size;
    setState({ ...stateRef.current });
    fetchData(state.query);
  };

  // 请求函数
  const fetchData = async (subOptions?: Record<string, any>) => {
    stateRef.current.loading = true;
    stateRef.current.query = {
      ...subOptions,
      ...(options.pagination && {
        page: stateRef.current.page,
        size: stateRef.current.size,
      }),
      ...stateRef.current.filter,
      ...stateRef.current.sort,
    };
    try {
      const q = {
        ...options,
        ...(options.method?.toUpperCase() === "GET"
          ? {
              params: stateRef.current.query,
            }
          : {
              data:
                options.type?.toUpperCase() === "FORMDATA"
                  ? qs.stringify(stateRef.current.query)
                  : stateRef.current.query,
            }),
      };
      const result = await api.request(q);
      const { code, msg, data } = result.data;
      console.log("inner request", code, msg, data);

      stateRef.current.success = code === 0;
      stateRef.current.code = code;
      stateRef.current.msg = msg;
      stateRef.current.data = data;
      stateRef.current.total = data?.list ? data?.total : 0;
      stateRef.current.loading = false;
    } catch (e) {
      stateRef.current.success = false;
      stateRef.current.loading = true;
      stateRef.current.msg = e.errMsg;
    }
    console.log(stateRef.current, "qwqwq222");

    setState({ ...stateRef.current });
    return stateRef.current;
  };

  return {
    handleCurrentChange,
    fetchData,
    page: stateRef.current.page,
    size: stateRef.current.size,
    total: stateRef.current.total,
    data: state.data,
    loading: stateRef.current.loading,
  };
};
