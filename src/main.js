import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'

Vue.config.productionTip = false

new Vue({
  router,
  provide: () => {
    return {
      api: api
    }
  },
  render: function (h) { return h(App) },
}).$mount('#app')
