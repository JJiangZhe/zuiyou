import request from "@/utils/axios";

// 获取轮播图
export const getBanners = () => {
  return request({
    url: "​/api​/portrait​/banner​/ten"
  });
};

// 获取分类
export const getCategorylv1 = () => {
  return request({
    url: "/api/portrait/category/zero"
  });
};
