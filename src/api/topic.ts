import request from "@/utils/axios";

// 话题列表
export const getTopicList = () => {
  return request({
    url: "/api/portrait/topic/list"
  });
};

// 选择话题
export const chooseTopic = () => {
  return request({
    url: "/api/portrait/topic/check"
  });
};
