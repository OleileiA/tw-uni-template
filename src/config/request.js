import rrjConfig from "./index.js";

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = () => {
  // 基础信息
  let rrjUserInfo;
  let token;

  // 初始化请求配置,
  uni.$u.http.setConfig((config) => {
    config.baseURL = rrjConfig.apiBasePath;
    return config;
  });

  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
      console.log('config', config);
      // 为一些特殊的请求改变基础域名
      if (config?.custom?.baseURL) {
        config.baseURL = config.custom.baseURL;
      }

      // 增加token
      if (token?.id) {
        config.header.Authorization = token.id;
      } else {
        try {
          const tokenStr = uni.getStorageSync("rrj_user_token");
          if (tokenStr) {
            token = JSON.parse(tokenStr);
            if (token?.id) config.header.Authorization = token.id;
          }
        } catch (e) {
          console.error("token解析异常");
        }
      }

      // 增加用户信息
      if (rrjUserInfo?.id) {
        config.params.u = rrjUserInfo.id;
      } else {
        const rrjUserInfoStr = uni.getStorageSync("rrj_user_info");
        if (rrjUserInfoStr) {
          rrjUserInfo = JSON.parse(rrjUserInfoStr);
          if (rrjUserInfo?.id) {
            config.params.u = rrjUserInfo.id;
          } else {
            config.params.u = 0;
          }
        }
      }

      // post请求
      if (config.method === 'POST') {
        config.header["content-type"] = "application/x-www-form-urlencoded";
      }

      return config;
    },
    (config) => {
      return Promise.reject(config);
    }
  );

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      // 有的接口在data返回值中又嵌套一层
      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        return response.data;
      }
    },
    (response) => {
      return Promise.reject(response);
    }
  );
};
