import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')

    },

    {
      path: '/success',
      name: 'Success',
      component: () => import('../views/Dashboard.vue')
    },

    {
      path: '/account',
      name: 'condition',
      component: () => import('../views/condition.vue')
    },
    

  ]
})

export default router
