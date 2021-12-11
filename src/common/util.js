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
