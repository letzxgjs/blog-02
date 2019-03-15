import Cookies from "js-cookie";
export const clearLoginInfo = () => {
  Cookies.remove("username");
};

export const changeImg = src => {
  return process.env.ROOT + src;
};
