import rrjConfig from "../config/index";
import { getUserInfo, getWxUserInfo } from "../api";
import { getUrlParams, RRJLogin, wxRedirects } from "./util";

// 微信跳转的登录方式
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
      code,
      state,
    });
    if (wxUserInfo?.data?.app === "wechat") {
      const userInfo = await RRJLogin(wxUserInfo.data);
      if (userInfo?.token && userInfo?.user?.id) {
        storage.setItem("rrj_user_info", JSON.stringify(userInfo.user));
        storage.setItem("rrj_user_token", JSON.stringify(userInfo.token));
        return { msg: 1, userInfo: userInfo.user, token: userInfo.token };
      } else {
        // TODO: 获取RRJ用户信息失败
        return { msg: -1, info: JSON.stringify(userInfo) };
      }
    } else {
      // TODO: 微信登录失败
      return { msg: -2, info: wxUserInfo.message };
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

// 从app获取用户信息
export async function getUserInfoFromApp() {
  return new Promise((resolve) => {
    window.AppBridge.callhandler("getRrjAccessToken", {}, async (data) => {
      let result = data;
      // android 传递过来的是json字符串
      if (typeof data === "string" && data.indexOf("{") > -1) {
        result = JSON.parse(data);
      }
      const userInfo = await getUserInfo({ userId: result.user_id });
      if (userInfo?.id) {
        window.localStorage.setItem("rrj_user_info", JSON.stringify(userInfo));
        window.localStorage.setItem(
          "rrj_user_token",
          JSON.stringify({
            id: result.token,
          })
        );
        resolve({ msg: 1, userInfo: userInfo, token: { id: result.token } });
      } else {
        // -1表示RRJ本身的登录失败
        resolve({ msg: -1, info: JSON.stringify(userInfo) });
      }
    });
  });
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
