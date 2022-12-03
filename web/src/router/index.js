import VueRouter from 'vue-router'
import user from './user'
import account from './account'
import system from './system'
import algorithm from './algorithm'
import task from './task'
import chart from './chart'

const index = {
  path: '/',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/views/home/Home'),
    },
  ]
}

const routes = [index, user, account,system,algorithm,task,chart];

export default new VueRouter({ mode: 'history', routes })
