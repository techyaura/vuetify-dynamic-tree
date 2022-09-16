import Vue from 'vue'
import '@/plugins/vue-composition-api'
import axios from '@/plugins/axios'
import '@/styles/styles.scss'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
