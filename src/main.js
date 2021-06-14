import Vue from "vue";
// import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router/index";
// import "@/assets/style/font/iconfont.css";
import "@/assets/style/index.less";
import $axios from "@/utils/request";
import mixin from "./mixin/index";
import store from "./store/index";

import "@/components/Vant";
// rem
import "amfe-flexible";
// 把变量挂载到vue的原型上
Vue.prototype.$axios = $axios;
$axios.defaults.baseURL = 'http://localhost:16000/bottle-pay/'
$axios.defaults.headers ={
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
  "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
}
$axios.defaults.timeout = 5000
// $axios.defaults.withCredentials = true


Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");
