<template>
  <div class="core">
    <div class="article">
      <div class="content">
        <h2>{{article.title}}</h2>
        <div
          class="subtitle"
        >{{article.author.username}} 发表于: {{article.created}} 分类: {{article.tips}}</div>
        <div class="htmlContent" v-html="article.content"></div>
      </div>
      <comment class="comments"></comment>
      <!-- <comment class="comments" :comments="comments"></comment> -->
    </div>
    <div class="gonggao">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章列表</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { articleDetail } from "../api/data.js";
import Comment from "@/components/comment.vue";
export default {
  data() {
    return {
      article: {},
      comments: []
    };
  },
  methods: {},
  components: { Comment },
  created() {
    if (JSON.stringify(this.$route.params) == "{}") {
      this.$router.push({
        name: "home"
      });
    } else {
      this.article = this.$route.params;
    }
  }
};
</script>

<style lang="scss" scoped>
.core {
  margin: 0 200px;
  margin-top: 20px;
  display: flex;
  .article {
    flex: 3;
    max-width: 75%;
    .content {
      background-color: #fff;
      padding: 20px;
      .htmlContent {
        text-align-last: left;
        padding: 20px;
        // overflow: auto;
        overflow-x: auto;
      }
    }
    .comments {
      background-color: #fff;
      padding: 20px;
      margin-top: 20px;
    }
  }
  .gonggao {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
