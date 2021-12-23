import { loginRRJ } from "../api";

// 获取query对象
export const getUrlParams = (url) => {
  const uQuery = url.split("?");
  const uGetArr = {};
  if (uQuery.length > 1) {
    const uParam = uQuery[1].split("&");
    for (let i = 0; i < uParam.length; i++) {
      const uTemp = uParam[i].split("=");
      uGetArr[uTemp[0]] = uTemp[1];
    }
  }
  return uGetArr;
};

// 拼接queryString
export const puzzleQueryStr = (queryObj) => {
  const result = [];
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key]) {
      result.push(`${key}=${queryObj[key]}`);
    }
  });
  return `${result.join("&")}`;
};

// 重定向到拥有登录域名注册的html
export function wxRedirects({ appid, state, backUrl }) {
  window.location.replace(
    `http://renrenjiang.cn/auth.html?appid=${appid}&state=${state}&backurl=${encodeURIComponent(
      backUrl
    )}`
  );
}

// 微信信息注册登录RRJ
export async function RRJLogin(wxUserInfo) {
  const data = {
    avatar: wxUserInfo.avatar,
    nickname: wxUserInfo.nickname,
    uuid: wxUserInfo.uuid,
    openid: wxUserInfo.openid,
    app: wxUserInfo.app,
  };
  window.localStorage.setItem("rrj_wxuser_info", JSON.stringify(wxUserInfo));
  return await loginRRJ(data);
}

// 根据秒数计算标准时间格式
export function secFormatTime(num) {
  num = parseInt(num);
  let min = parseInt(num / 60);
  let minStr = min > 9 ? String(min) : "0" + min;
  let sec = num % 60;
  let secStr = sec > 9 ? String(sec) : "0" + sec;
  return `${minStr}:${secStr}`;
}

// 判断安卓还是ios
export function isAndroidOrIOS() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return "android";
  }
  if (isiOS) {
    return "ios";
  }
  return false;
}

// 获取系统信息
export function getSysInfo() {
  return uni.getSystemInfoSync();
}
