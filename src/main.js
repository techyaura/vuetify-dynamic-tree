import Vue from 'vue'
import '@/plugins/vue-composition-api'
import axios from '@/plugins/axios'
import '@/styles/styles.scss'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
