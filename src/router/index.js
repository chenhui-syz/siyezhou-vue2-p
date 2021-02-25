import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/personal',
    // 当存在子路由的时候父路由就不在需要name了
    component: Home,
    // 首页下的各个模块
    children: [{
        path: '',
        name: 'postlist',
        component: () => import( /* webpackChunkName: "postlist" */ '../components/user/postList.vue')
      }, {
        path: 'essencelist',
        name: 'essencelist',
        component: () => import( /* webpackChunkName: "essencelist" */ '../components/user/essenceList.vue')
      }, {
        path: 'hotrank',
        name: 'hotrank',
        component: () => import( /* webpackChunkName: "hotrank" */ '../components/user/hotRank.vue')
      },
      {
        path: 'info',
        name: 'info',
        component: () => import( /* webpackChunkName: "info" */ '../components/user/info.vue')
      },
      {
        path: 'updatebasicinfo',
        name: 'updatebasicinfo',
        component: () => import( /* webpackChunkName: "updatebasicinfo" */ '../components/user/updateBasicInfo.vue')
      },
      {
        path: 'updatepassword',
        name: 'updatepassword',
        component: () => import( /* webpackChunkName: "updatepassword" */ '../components/user/updatePassword.vue')
      },
      {
        path: 'updateemail',
        name: 'updateemail',
        component: () => import( /* webpackChunkName: "updateemail" */ '../components/user/updateEmail.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '../components/user/register.vue')
      },
      {
        path: 'lottery',
        name: 'lottery',
        component: () => import( /* webpackChunkName: "lottery" */ '../components/user/lottery.vue')
      }
    ]
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
  },
  {
    path: '/addpost',
    name: 'addpost',
    component: () => import( /* webpackChunkName: "addpost" */ '../views/AddPost.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router