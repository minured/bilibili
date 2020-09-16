import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import http from "../http.js";

import { 
  Tab,
  Tabs, 
  Icon, 
  Field, 
  Toast, 
  Uploader,
  Divider,
  Dialog,
  ActionSheet,
  List,
  Collapse, 
  CollapseItem
} from "vant";

Vue.prototype.$http = http;
Vue.use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Field)
  .use(Toast)
  .use(Uploader)
  .use(Divider)
  .use(Dialog)
  .use(ActionSheet)
  .use(List)
  .use(Collapse)
  .use(CollapseItem)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
