import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './api/routes';
import store from "./components/store/Store"
Vue.config.productionTip = false

 // eslint-disable-next-line
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
