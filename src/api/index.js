import Vue from "vue";
import uView from "uview-ui";
import rrjConfig from "../config/index";

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
export const loginRRJ = ({ avatar, nickname, uuid, openid, app }) =>
  http.post(
    "/api/v3/account/login_auth",
    {
      avatar,
      nickname,
      uuid,
      openid,
      app,
    }
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

/*
 * ---------------------------------------- K歌相关的接口 ------------------------------------------------
 */

// 根据id获取作品
export const getWorksById = ({ id }) => {
  return http.get("api/drawing/findById", {
    params: {
      id,
    },
    custom: {
      baseURL: rrjConfig.apiBasePath2,
    },
  });
};

// 获取鲜花排名
export const getFollowsRankList = ({ drawId }) => {
  return http.get("api/drawing/flowers", {
    params: {
      drawId,
    },
    custom: {
      baseURL: rrjConfig.apiBasePath2,
    },
  });
};

// 获取朗诵或者K歌的更多内容
// userId: 不传就推荐其他人内容
// type: 4歌曲，5朗诵
export const getMoreContent = ({ userId, rows, type }) => {
  const param = {
    rows,
  };
  if (userId) param.userId = userId;
  if (type) param.type = type;
  return http.get("api/v2/drawing/findRecommend", {
    params: {
      ...param,
    },
    custom: {
      baseURL: rrjConfig.apiBasePath2,
    },
  });
};

// 关注
export const sqyFollow = ({ userId }) => {
  return http.post(
      "api/follow/followUser",
      {
        rrjUserId: userId
      },
      {
        custom: {
          baseURL: rrjConfig.apiBasePath2,
        },
      }
  )
}

// 取关
export const sqyUnfollow = ({ userId }) => {
  return http.post(
      "api/follow/cancelFollowUser",
      {
        rrjUserId: userId
      },
      {
        custom: {
          baseURL: rrjConfig.apiBasePath2,
        },
      }
  )
}
