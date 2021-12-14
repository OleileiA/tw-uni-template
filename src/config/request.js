import rrjConfig from "./index.js";

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = () => {
  // 初始化请求配置,
  uni.$u.http.setConfig((config) => {
    config.baseURL = rrjConfig.apiBasePath;
    return config;
  });

  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 为一些特殊的请求改变基础域名
      if (config?.custom?.baseURL) {
        config.baseURL = config.custom.baseURL;
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
