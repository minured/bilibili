import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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
  CollapseItem,
  Popup,
  Cell,
  ShareSheet,
} from "vant";

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
  .use(Popup)
  .use(Cell)
  .use(ShareSheet);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
