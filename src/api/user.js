import http from "@/lib/index.js";
export const login = param => {
  return http({
    method: "post",
    url: http.adornUrl("/user/login"),
    data: param
  });
};

export const info = () => {
  return http({
    method: "get",
    url: http.adornUrl("/user/info")
  });
};
export const reg = param => {
  return http({
    method: "post",
    url: http.adornUrl("/user/reg"),
    data: param
  });
};
