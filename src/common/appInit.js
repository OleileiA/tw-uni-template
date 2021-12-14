import rrjConfig from "../config/index";
import { getUrlParams, wxRedirects } from "./util";
import { wxLogin, getUserInfoFromApp } from "./login";
import { getWXSignature } from "../api";
import store from "../store/index";

export async function appInit() {
  const hostUrl = encodeURIComponent(window.location.href);
  const routeInfo = getUrlParams(hostUrl);

  // 签名处理
  await wxSignature(hostUrl);

  if (routeInfo.from === "app") {
    // app处理
    const userInfo = await getUserInfoFromApp();
    return _loginInfoDealer(userInfo);
  } else {
    // 正常处理
    const userInfo = await wxLogin();
    return _loginInfoDealer(userInfo);
  }
}

// 微信签名处理
async function wxSignature(hostUrl) {
  const { jWeixin } = window;
  const res = await getWXSignature({ hostUrl });
  jWeixin.config({
    debug: false,
    appId: rrjConfig.wxAppid,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
  });
}

// 登陆之后的信息处理
function _loginInfoDealer(userInfo) {
  if (userInfo?.msg === 1 && userInfo?.userInfo?.id) {
    store.commit("setUserInfo", userInfo.userInfo);
    store.commit("setToken", userInfo.token);
    uni.showToast({
      title: "登陆成功",
      duration: 1000,
    });
    return 1;
  } else if (userInfo?.msg === -1) {
    // 从人人讲的后台获取用户信息失败
    uni.showToast({
      title: `登录失败，${userInfo.info}`,
      duration: 2000,
    });
    return 0;
  } else if (userInfo?.msg === -2) {
    // 可能是当前路由携带的code失效
    uni.showToast({
      title: `${userInfo.info}`,
      duration: 2000,
    });
    setTimeout(() => {
      wxRedirects({
        appid: rrjConfig.wxAppid,
        state: "appwx",
        backUrl: window.location.origin,
      });
    }, 2000);
    return 0;
  }
  return 1;
}
