import request from "@/utils/axios";
import { Login } from "@/interfaces";

// 登陆
export const loginAction = (data: Login) => {
  return request({
    url: "/api/portrait/user/login/password",
    data,
    method: "post"
  });
};

// 获取用户信息
export const userInfo = () => {
  return request({
    url: "/api/portrait/user/info",
    headers: {
      authorization: true
    }
  });
};
