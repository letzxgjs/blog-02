import http from "@/lib/index.js";
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
