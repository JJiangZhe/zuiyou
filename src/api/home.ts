import request from "@/utils/axios";
import { ArticleByType } from "@/interfaces";

// 获取分类
export const getCategorylv1 = () => {
  return request({
    url: "/api/portrait/category/zero"
  });
};

// 根据文章类型获取文章
export const getArticleByType = (params: ArticleByType) => {
  return request({
    url: "/api/portrait/post/list",
    params
  });
};

// 根据话题获取文章
export const getTopicByCt = (id: number) => {
  return request({
    url: "/api/portrait/topic/read/" + id
  });
};
