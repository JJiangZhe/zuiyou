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
    // Toast.clear();
    const { data, headers } = response;
    const toast = headers.toast;
    toast &&
      Toast.loading({
        message: data.message,
        forbidClick: true
      });
    return data;
  },
  error => {
    console.log(error);
    return error.data;
  }
);

export default request;
