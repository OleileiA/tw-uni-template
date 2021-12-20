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

require("./config/request.js")(app);

appInit().then((res) => {
  if (res) {
    app.$mount();
  }
});
