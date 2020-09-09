import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'/*全局css*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

//配置请求的根路径
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization=window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$http=axios;

// Vue.prototype.$message=message
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.component('tree-table',TreeTable)

// Vue.prototype.$confirm=MessageBox.confirm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
