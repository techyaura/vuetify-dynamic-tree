import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    name: 'explorer',
    path: '/explorer/:active?',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
