// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import swal from 'sweetalert'
import Cookies from 'js-cookie'
// import store from 'vuex/store'
// import filter from './assets/js/filter'

import 'element-ui/lib/theme-chalk/index.css'

window.axios = axios;
window.swal = swal;
window.cookies = Cookies;

axios.defaults.baseURL = 'https://portal-rmm.wise-paas.com';
axios.defaults.timeout = 1000 * 200
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.headers['Content-Type'] = 'application/json'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//   store,
//   filter:filter,
  template: '<router-view></router-view>'
})
