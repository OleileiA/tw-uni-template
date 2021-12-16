import rrjConfig from "../config/index";
import { getUserInfo, getWxUserInfo } from "../api";
import { getUrlParams, RRJLogin, wxRedirects } from "./util";

// TODO: 需要注意code和state这两个query不要出现在业务开发的路由跳转中
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
    // TODO： 免登陆
    return { msg: 1, userInfo: rrjUserInfo, token: token };
  }

  // 登录流程
  if (code && state === "appwx") {
    const wxUserInfo = await getWxUserInfo({
      code,
      state,
    });
    if (wxUserInfo?.app === "wechat") {
      const userInfo = await RRJLogin(wxUserInfo);
      if (userInfo?.token && userInfo?.user?.id) {
        storage.setItem("rrj_user_info", JSON.stringify(userInfo.user));
        storage.setItem("rrj_user_token", JSON.stringify(userInfo.token));
        // TODO: 正常登录成功
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
      backUrl: tarUrl || removeExtraQuery(window.location.href),
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

// 重定向之前去除路径中的code和state
export function removeExtraQuery(url) {
  const urlSplitArr = url.split("?");
  let origin = urlSplitArr[0];
  const queryStr = urlSplitArr[1];
  if (queryStr) {
    const queryStrArr = queryStr.split("&");
    const tempArr = queryStrArr.filter((item) => {
      return !(item.startsWith("code") || item.startsWith("state"));
    });
    return tempArr.length ? origin + "?" + tempArr.join("&") : origin;
  } else {
    return origin;
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
