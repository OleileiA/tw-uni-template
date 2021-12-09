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
      return config;
    },
    (config) => {
      return Promise.reject(config);
    }
  );

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (response) => {
      return Promise.reject(response);
    }
  );
};
