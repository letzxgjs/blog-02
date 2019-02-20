import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import signin from '@/components/signin'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // }, 
    {
      path: '/',
      name: 'signin',
      component: signin
    }, 
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }, 
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
