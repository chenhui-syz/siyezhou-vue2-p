import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      name: 'postlist',
      component: () => import( /* webpackChunkName: "postlist" */ '../components/user/postList.vue')
    },{
      path: 'essencelist',
      name: 'essencelist',
      component: () => import( /* webpackChunkName: "essencelist" */ '../components/user/essenceList.vue')
    },{
      path: 'hotrank',
      name: 'hotrank',
      component: () => import( /* webpackChunkName: "hotrank" */ '../components/user/hotRank.vue')
    },]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/User/Login.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import( /* webpackChunkName: "reg" */ '../views/User/Reg.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router