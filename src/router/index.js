import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
// import jwt from 'jsonwebtoken'
// import moment from 'dayjs'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/personal'
  }, {
    path: '/personal',
    // 当存在子路由的时候父路由就不在需要name了
    component: Home,
    meta: {
      requiresAuth: true
    },
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
        linkActiveClass:'high-router',
        component: () => import( /* webpackChunkName: "hotrank" */ '../components/user/hotRank.vue'),
        children: [{
          path: 'read',
          name: 'read',
          component: () => import( /* webpackChunkName: "read" */ '../components/user/hotrank/read.vue'),
        }, {
          path: 'like',
          name: 'like',
          component: () => import( /* webpackChunkName: "like" */ '../components/user/hotrank/like.vue'),
        }, {
          path: 'collection',
          name: 'collection',
          component: () => import( /* webpackChunkName: "collection" */ '../components/user/hotrank/collection.vue'),
        }]
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
  // 下面这两个路由配置可以让错误的路由都统一导航到错误提示页面
  {
    path: '/404',
    name: 'notfound',
    component: () => import( /* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // 取缓存的token和用户信息
//   const token = localStorage.getItem('token')
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'))
//   if (token !== '' && token !== null) {
//     // 验证token时效
//     const payload = jwt.decode(token)
//     console.log(moment().isBefore(moment(payload.exp * 1000)))
//     // true代表当前的时间在token过期时间之前，表示token未过期
//     if (moment().isBefore(moment(payload.exp * 1000))) {
//       store.commit('setToken', token)
//       store.commit('setUserInfo', userInfo)
//       store.commit('setIsLogin', true)
//       // if (!store.state.ws) {
//       //   store.commit('initWebSocket', {})
//       // }
//     } else {
//       localStorage.clear()
//     }
//   }
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const isLogin = store.state.isLogin
//     if (isLogin) {
//       // 已经登录的状态
//       // 权限的判断,meta元数据
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     // 放行不需要鉴权的路由
//     next()
//   }
// })

export default router