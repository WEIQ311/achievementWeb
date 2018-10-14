import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import qs from 'qs';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import routes from './router/router.js'
window.baseURL='http://campus.picp.net/score/';
Vue.config.productionTip = false;
Vue.prototype.$axiosF = axiosF;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});
new Vue({
  render: h => h(App),
    router
}).$mount('#app');

function axiosF(url, type, data, callBackRes, callBackErr) {
  let token = window.sessionStorage.getItem('token'), headers = {};
  if (token) {
    headers = {'token': token};
  }
  let param = {}, paramArr = [], urlP = '';
  for (let key in data) {
    paramArr.push(key + '=' + data[key]);
  }
  switch (type) {
    case 'get' :
      urlP = paramArr.length ? baseURL + url + '?' + paramArr.join('&') : baseURL + url;
      param = {
        method: 'get',
        headers: headers,
        url: urlP
      };
      break;
    case 'post':
      urlP = baseURL + url;
      param = {
        method: 'post',
        headers: headers,
        url: urlP,
        data: data
      };
      break;
    default:
      urlP = baseURL + url;
      param = {
        method: type,
        url: urlP
      };
      break;
  }
  axios(param).then(res => {
    console.log(res);
    let newToken = res.headers.newToken;
    token = res.headers.token;
    token = newToken || token || '';
    if (token) {
      window.sessionStorage.setItem('token', token);
    }
    console.log(token);
    return callBackRes(res);
  }).catch(err => {
    return callBackErr(err);
  });
}