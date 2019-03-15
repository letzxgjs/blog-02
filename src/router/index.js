import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/main";
import Home from "@/components/home";
import Personal from "@/components/personal";
import User from "@/components/user";
import Userface from "@/components/userface";
import PublishArticle from "@/components/publish-article";
import ArticleDetail from "@/components/article-detail";
// import articleDetail from "@/api/data";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/publish-article",
          name: "publish-article",
          component: PublishArticle
          // meta: { requiresAuth: true }
        },
        {
          path: "/article-detail",
          name: "article-detail",
          component: ArticleDetail
        },
        {
          path: "/personal",
          name: "personal",
          component: Personal,
          children: [
            {
              path: "/user",
              name: "user",
              component: User
            },
            {
              path: "/article",
              name: "article",
              component: User
            },
            {
              path: "/comments",
              name: "comments",
              component: User
            },
            {
              path: "/userface",
              name: "userface",
              component: Userface
            }
          ]
        }
      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (loggedin()) {
//       next();
//     } else {
//       next("/home");
//     }
//   } else {
//     next();
//   }
// });

export default router;
