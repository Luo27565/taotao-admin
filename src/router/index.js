import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/index',
    hidden: true,
  },
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    hidden: false,
    redirect: "index",
    children:[
      {
        path:'/index',
        name:'Index',
        meta:{
          name:'首页',
          icon:'#icon-ali-lvsefenkaicankaoxianban-'
        },
        component:()=> import("@/views/index.vue")
      }
    ]
  },
  {
    path:'/fish',
    name:'Fish',
    component: Layout,
    hidden: false,
    meta:{
      name:'渔具',
      icon:'#icon-ali-fish'
    },
    children:[
      {
        path:'/detail',
        name:'Detail',
        meta:{
          name:'渔具详情',
          icon:'#icon-ali-fishing1'
        },
        component:()=> import("@/views/detail.vue")
      },
      {
        path:'/category',
        name:'Category',
        meta:{
          name:'渔具分类',
          icon:'#icon-ali-fishing'
        },
        component:()=> import("@/views/category.vue")
      },
      {
        path:'/add',
        name:'Add',
        meta:{
          name:'添加渔具',
          icon:'#icon-ali-add'
        },
        component:()=> import("@/views/add.vue")
      }
    ]
  },
  {
    path:'/form',
    name:'Form',
    component: Layout,
    hidden: false,
    meta:{
      name:'订单',
      icon:'#icon-ali-dingdanguanli-'
    },
    children:[
      {
        path:'/order',
        name:'Order',
        meta:{
          name:'订单管理',
          icon:'#icon-ali-dingdanguanli1'
        },
        component:()=> import("@/views/order.vue")
      }
    ]
  },
  {
    path:'/chart',
    name:'Chart',
    component: Layout,
    hidden: false,
    meta:{
      name:'报表',
      icon:'#icon-ali-icon-p_mrpbaobiao'
    },
    children:[
      {
        path:'/report',
        name:'Report',
        meta:{
          name:'渔具报表',
          icon:'#icon-ali-baobiao'
        },
        component:()=> import("@/views/report.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
