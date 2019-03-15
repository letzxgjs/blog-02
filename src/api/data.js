import http from "@/lib/index.js";
import { postFormData } from "@/lib/index.js";
export const articleList = pageNum => {
  return http({
    method: "get",
    url: http.adornUrl("page/" + pageNum)
  });
};

export const articleDetail = id => {
  return http({
    method: "get",
    url: http.adornUrl("article/" + id)
  });
};

export const commentsList = id => {
  return http({
    method: "get",
    url: http.adornUrl("article/" + id)
  });
};

export const postComment = data => {
  return http({
    method: "post",
    url: http.adornUrl("comment"),
    data
  });
};

export const publishArticle = data => {
  return http({
    method: "post",
    url: http.adornUrl("article"),
    data
  });
};

export const postAvatar = data => {
  return postFormData({
    method: "post",
    url: http.adornUrl("upload"),
    data
  });
};
