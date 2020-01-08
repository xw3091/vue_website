import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import '@/style/index.less'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
