import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/user/UserLogin.vue'
import MerMsg from '../views/user/MerMsg.vue'
import MyHis from '../views/user/MyHis.vue'
import MyTicket from '../views/user/MyTicket.vue'
import UserMain from '../views/user/UserMain.vue'
import User from '../views/User.vue'
import LotteryDraw from '../views/user/LotteryDraw.vue'
import { set_session, get_session } from "../api/base";

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'User',
    component: User,
    // beforeEnter: ((to, from, next) => {
    //   if (to.name != "User" && !get_session('openID')) next({ name: "User" });
    //   else next();
    // }),
    children: [
      {
        path: 'login',
        name: 'UserLogin',
        component: UserLogin
      },
      {
        path: 'main',
        name: 'UserMain',
        component: UserMain
      },
      {
        path: 'mer_msg',
        name: 'MerMsg',
        component: MerMsg
      },
      {
        path: 'my_his',
        name: 'MyHis',
        component: MyHis
      },
      {
        path: 'my_ticket',
        name: 'MyTicket',
        component: MyTicket
      },
      {
        path: 'lottery_draw',
        name: 'LotteryDraw',
        component: LotteryDraw
      },
    ]
  },
  {
    path: '/mer',
    name: 'Mer',
    component: () => import('../views/Mer.vue'),
    // beforeEnter: ((to, from, next) => {
    //   if (to.name != "Mer" && !get_session('mer_open_id')) next({ name: "Mer" });
    //   else next();
    // }),
    children: [
      {
        path: 'login',
        name: 'MerLogin',
        component: () => import('../views/mer/MerLogin.vue')
      }, {
        path: 'main',
        name: 'MerMain',
        component: () => import('../views/mer/MerMain.vue')
      }, {
        path: 'mer_his',
        name: 'MerHis',
        component: () => import('../views/mer/MerHis.vue')
      }, {
        path: 'cancel',
        name: 'MerCancel',
        component: () => import('../views/mer/MerCancel.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
