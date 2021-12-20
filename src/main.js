import Vue from "vue";
import App from "./App";
import store from "./store";
import { appInit } from "./common/appInit";

Vue.config.productionTip = false;

App.mpType = "app";

Vue.prototype.$store = store;

const app = new Vue({
  store,
  ...App,
});


appInit().then((res) => {
  require("./config/request.js")(app);
  // 引入请求封装，将app参数传递到配置中
  if (res) app.$mount();
});
