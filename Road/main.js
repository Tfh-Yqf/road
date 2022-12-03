import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

Vue.prototype.user_url ='http://124.71.68.240:8081';

Vue.prototype.task_url ='http://124.71.68.240:8081';

Vue.prototype.upload_url ='http://124.71.68.240:8083';