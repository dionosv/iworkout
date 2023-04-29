import { createRouter, createWebHistory } from 'vue-router'
import {Account} from '../views/Account.vue'
// import {Dashboard} from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    // {
    //   path: '/success',
    //   name: 'Success',
    //   component: {Dashboard}
    // },
    {
      path: '/account',
      name: 'Account',
      component: {Account}
    },
  ]
})

export default router