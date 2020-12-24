import axios from "axios";

const request = axios.create({
  baseURL: "http://portrait.linasan.cn",
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  config => {
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
