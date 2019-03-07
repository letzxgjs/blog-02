import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import Signup from '@/components/Signup'
// import signin from '@/components/signin'
// import admin from '@/components/admin'
import Main from '@/components/main'
import Home from '@/components/home'
import PublishArticle from '@/components/publish-article'
// import loginAndReg from '@/components/loginAndReg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main, 
      redirect: '/home', 
      children: [
        {
          path: '/home', 
          name: 'home', 
          component: Home
        }, 
        {
          path: '/publish-article',
          name: 'publish-article',
          component: PublishArticle
        }
      ]
    }, 
    {
      path: '/home', 
      name: 'home', 
      component: Home
    }
  ]
})
