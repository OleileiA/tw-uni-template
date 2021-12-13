import Vue from "vue";
import uView from "uview-ui";
Vue.use(uView);

const http = uni.$u.http;

// 微信配置
export const getWXSignature = ({ hostUrl }) => {
  return http.get(`/api/v3/wechat/jsconfig?url=${hostUrl}`);
};

// 获取微信的用户信息
export const getWxUserInfo = ({ code, state }) =>
  http.get("/api/v3/account/wechat/userinfo", {
    params: {
      code,
      state,
    },
  });

// 使用微信信息对人人讲的注册及登录
export const loginRRJ = ({ avatar, nickname, uuid, openid, app }, config) =>
  http.post(
    "/api/v3/account/login_auth",
    {
      avatar,
      nickname,
      uuid,
      openid,
      app,
    },
    config
  );

// 使用用户id获取人人讲用户信息
export const getUserInfo = ({ userId }) =>
  http.get(`/api/v3/users/${userId}/show`);

// 获取动态
export const getDynamicDetail = ({ exercise_id, label }) => {
  return http.get("/api/v3/dynamic/exercise/info", {
    params: {
      exercise_id,
      label,
    },
  });
};
