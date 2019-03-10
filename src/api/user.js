import http from "@/lib/index.js";
export const login = param => {
  return http.post("/user/login", param);
};
