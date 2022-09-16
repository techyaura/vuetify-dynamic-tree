import axios from 'axios'
import Vue from 'vue'

function createInstance(baseURL) {
  const config = {
    baseURL,
  }

  return axios.create(config)
}
const baseURL = process.env.baseURL || 'https://noisy-polished-diploma.glitch.me/'

const urlInstance = createInstance(baseURL)

export default {
  install() {
    Vue.prototype.$http = urlInstance
  },
}
