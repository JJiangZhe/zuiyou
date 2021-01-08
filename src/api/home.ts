import request from "@/utils/axios";
import { ArticleByCt } from "@/interfaces";

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

// 分类获取文章
export const getArticleByCt = (params: ArticleByCt) => {
  return request({
    url: "/api/portrait/post/level",
    params
  });
};

export const getTopicByCt = (id: number) => {
  return request({
    url: "/api/portrait/topic/read/" + id
  });
};
