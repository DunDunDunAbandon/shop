import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'/*全局css*/
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

//导入timeline
import Timeline from './plugins/timeline/index.js'
import TimelineItem from './plugins/timeline-item/index.js'
//注册为全局可的组件
Vue.use(Timeline)
Vue.use(TimelineItem)

//导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'


//配置请求的根路径
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
//在request拦截器中展示进度条NProgress.start()
axios.interceptors.request.use(config=>{
  //console.log(config);
  NProgress.start()
  config.headers.Authorization=window.sessionStorage.getItem('token');
  //在最后必须return config
  return config;
})
//在request拦截器中隐藏进度条NProgress.done()
axios.interceptors.response.use(config=>{
  NProgress.done()
  return config
})
Vue.prototype.$http=axios;

// Vue.prototype.$message=message
Vue.use(ElementUI);

//将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false;

Vue.component('tree-table',TreeTable)

Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDate()+'').padStart(2,'0')
  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// Vue.prototype.$confirm=MessageBox.confirm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
