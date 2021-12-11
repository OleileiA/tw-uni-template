import rrjConfig from "../config/index";
import { getWxUserInfo, loginRRJ } from "../api";
import { getUrlParams } from "./util";

export async function wxLogin(tarUrl) {
  const storage = window.localStorage;

  // code and state
  const queryParsed = getUrlParams(window.location.href);
  const code = queryParsed.code;
  const state = queryParsed.state;

  // token and userInfo
  const tokenStr = storage.getItem("rrj_user_token");
  const rrjUserInfoStr = storage.getItem("rrj_user_info");

  let token;
  let rrjUserInfo;
  if (
    tokenStr &&
    tokenStr !== "undefined" &&
    rrjUserInfoStr &&
    rrjUserInfoStr !== "undefined"
  ) {
    token = JSON.parse(tokenStr);
    rrjUserInfo = JSON.parse(rrjUserInfoStr);
  }

  // 确定微信已登录过
  if (rrjUserInfo && rrjUserInfo.app === "wechat" && isAuthFn(token)) {
    return rrjUserInfo;
  }

  // 登录流程
  if (code && state === "appwx") {
    const wxUserInfo = await getWxUserInfo({
      params: {
        code,
        state,
      },
    });
    if (wxUserInfo?.data?.app === "wechat") {
      const userInfo = await RRJLogin(wxUserInfo.data);
      if (userInfo?.token && userInfo?.user) {
        storage.setItem("rrj_user_info", JSON.stringify(userInfo.user));
        storage.setItem("rrj_user_token", JSON.stringify(userInfo.token));
        return userInfo.user;
      } else {
        // TODO: 获取RRJ用户信息失败
        return userInfo;
      }
    } else {
      // TODO: 微信登录失败
      return wxUserInfo.message;
    }
  } else {
    const args = {
      appid: rrjConfig.wxAppid,
      state: "appwx",
      backUrl: tarUrl || window.location.href,
    };
    wxRedirects(args);
  }
}

// 判断本地的信息是否过期
function isAuthFn(token) {
  if (token && token.id) {
    const numNow = +new Date();
    const numCreated = +new Date(token.created);
    const numExpire = numCreated + (token.ttl * 1000 - 7 * 24 * 60 * 60 * 1000);
    return numExpire >= numNow;
  }
  return false;
}

// 重定向到拥有登录域名注册的html
function wxRedirects({ appid, state, backUrl }) {
  window.location.replace(
    `http://renrenjiang.cn/auth.html?appid=${appid}&state=${state}&backurl=${encodeURIComponent(
      backUrl
    )}`
  );
}

// 人人讲的登录
async function RRJLogin(wxUserInfo) {
  const data = {
    avatar: wxUserInfo.avatar,
    nickname: wxUserInfo.nickname,
    uuid: wxUserInfo.uuid,
    openid: wxUserInfo.openid,
    app: wxUserInfo.app,
  };
  window.localStorage.setItem("rrj_wxuser_info", JSON.stringify(wxUserInfo));
  return await loginRRJ(data, {
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
}
