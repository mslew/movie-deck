import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {path: "/", component: () => import("../views/HomeView.vue")},
  {path: "/register", component: () => import("../views/RegisterView.vue")},
  {path: "/sign-in", component: () => import("../views/SignInView.vue")},
  {path: "/feed", component: () => import("../views/FeedView.vue"),
  meta:{
    requiresAuth: true,
  }},
  {path: "/author", component: () => import("../views/AuthorView.vue"),
  meta:{
    requiresAuth: true,
  }}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async(to, from, next)=>{
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }else{
      alert("You do not have access yet! Sign in or register to gain access!");
      next("/");
    }
  }else{
    next();
  }
})

export default router