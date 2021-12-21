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
