import Vue from "vue";
import uView from "uview-ui";
Vue.use(uView);

const http = uni.$u.http;

// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// export const getMenu = (data) => http.get('/ebapi/public_api/index', data);

// 获取微信的用户信息
export const getWxUserInfo = (data) =>
  http.get("/api/v3/account/wechat/userinfo", data);

// 人人讲账号的登录
export const loginRRJ = (data, config) =>
  http.post("/api/v3/account/login_auth", data, config);
