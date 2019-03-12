import http from "@/lib/index.js";
export const articleList = pageNum => {
  return http({
    method: "get",
    url: http.adornUrl("page/" + pageNum)
  });
};

// import http from "@/lib/index.js";
// export const articleList = padgeNum => {
//   return http.post("/page/" + padgeNum);
// };
