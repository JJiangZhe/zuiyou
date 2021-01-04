import request from "@/utils/axios";

interface Login {
  phone: string;
  password: string;
}

// 获取轮播图
export const loginAction = (data: Login) => {
  return request({
    url: "/api/portrait/user/login/password",
    data,
    method: "post"
  });
};

export const userInfo = () => {
  return request({
    url: "/api/portrait/user/info",
    headers: {
      authorization: true
    }
  });
};
