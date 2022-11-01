import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SignUp from './components/SignUp.vue'
import Forgot from './components/Forgot.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true}
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp 
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot
    },
  ]
})


router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("auth begins")
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        console.log("auth success")
        user = data;
        next()
      } 
    }).catch((e) => {
      console.log("auth failed")
      console.log(e)
    });
  } else {
    next()
  }
})



export default router;