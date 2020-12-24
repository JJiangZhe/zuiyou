import request from "@/utils/axios";

export const getBanners = () => {
  return request({
    url: "​/api​/portrait​/banner​/ten"
  });
};

export const getCategorylv1 = () => {
  return request({
    url: "/api/portrait/category/zero"
  });
};
