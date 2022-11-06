import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {path: "/", component: () => import("../views/HomeView.vue")},
  {path: "/register", component: () => import("../views/RegisterView.vue")},
  {path: "/sign-in", component: () => import("../views/SignInView.vue")},
  {path: "/feed", component: () => import("../views/FeedView.vue")},
  {path: "/about", component: () => import("../views/AboutView.vue")},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
