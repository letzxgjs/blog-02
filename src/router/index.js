import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/main";
import Home from "@/components/home";
import PublishArticle from "@/components/publish-article";
import ArticleDetail from "@/components/article-detail";
import articleDetail from "@/api/data";

Vue.use(Router);

export default new Router({
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
        },
        {
          path: "/article-detail",
          name: "article-detail",
          component: ArticleDetail
        }
      ]
    }
  ]
});
