import axios from "axios";
import { Toast } from "vant";
import { getLocal } from ".";

const request = axios.create({
  baseURL: "http://portrait.linasan.cn",
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });

    if (config.headers.authorization) {
      const token = getLocal("token");
      config.headers.authorization = "Bearer " + token;
    }

    return config;
  },
  error => {
    return error;
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return error.data;
  }
);

export default request;
