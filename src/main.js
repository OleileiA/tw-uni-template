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

// 引入请求封装，将app参数传递到配置中
require("./config/request.js")(app);

appInit().then((res) => {
  if (res) app.$mount();
});
