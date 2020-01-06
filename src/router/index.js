import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: layout
  },
]

const router = new VueRouter({
  routes
})

export default router
