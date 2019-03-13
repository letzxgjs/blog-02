<template>
  <div class="core">
    <div class="article">
      <div class="content">
        <h2>{{article.title}}</h2>
        <div class="subtitle">admin 发表于: 2019 分类: vue</div>
      </div>
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

export default {
  data() {
    return {
      article: {}
    };
  },
  methods: {},
  mounted() {
    articleDetail(this.$route.params._id)
      .then(res => {
        if (res.data) {
          this.article = res.data.article;
        }
      })
      .catch(err => {
        this.$message({
          message: "服务器错误",
          type: "error"
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.core {
  margin: 0 200px;
  .article {
    display: flex;
    .content {
      flex: 18;
    }
    .gonggao {
      flex: 6;
    }
  }
}
</style>
