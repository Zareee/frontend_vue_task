import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import MainPage from '@/pages/MainPage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage.vue'

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: MainPage
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem('authenticated') === 'true'

  if (to.meta.requiresAuth && !authenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
