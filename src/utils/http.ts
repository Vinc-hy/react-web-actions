import axios from "axios";
import { message } from "antd";

/**
 * 返回状态信息，根据 http 状态错
 * @param {Number} status
 * @returns
 */
const showStatus = (status: number): string => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

/**
 * 初始化 axios 服务
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,

  // 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  validateStatus() {
    return true;
  },
});

/**
 * 拦截请求
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Platform = `1`;
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  async (error) => {
    error.data = {};
    error.data.msg = "服务器异常，请联系管理员！";
    return await Promise.resolve(error);
  }
);

// 返回拦截
service.interceptors.response.use(
  (response) => {
    const status = response.status;
    let msg = "";
    // http 状态码
    if (status < 200 || status >= 300) {
      msg = showStatus(status);
      if (typeof response.data === "string") {
        response.data = {
          msg,
        };
      } else {
        response.data.msg = msg;
      }

      message.error(msg);

      console.log("status", status);

      //  没有权限跳转到登录页面重新登录
      if (status === 401) {
        console.log("== 401");
        localStorage.removeItem("token");
        // location.reload()
      }
    }

    return response;
  },
  async (error) => {
    console.log("error.config:::", error);
    // 请求缓存处理方式
    const message = error?.message;
    if (axios.isCancel(error) && message.data && message.data.config.cache) {
      return await Promise.resolve(message.data); // 返回结果数据
    }
    if (axios.isCancel(error)) {
      console.log("repeated request: ", message);
    } else {
      // 处理错误业务代码
      error.data = {};
      error.data.msg = "请求超时或服务器异常，请检查网络或联系管理员！";
      message.error(error.data.msg);
    }

    return await Promise.reject(error);
  }
);

export default service;
