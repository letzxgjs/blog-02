<template>
  <div class="publish-article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :rules="rules"
        ref="formInline"
      >
        <el-form-item label="文章分类" prop="type">
          <el-select v-model="formInline.type" placeholder="文章分类">
            <el-option label="vue" value="vue"></el-option>
            <el-option label="react" value="react"></el-option>
            <el-option label="node" value="node"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formInline.title" placeholder="输入标题"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tinymce">
      <Tinymce ref="tinymce" :id="'tinymce'" v-model="content"></Tinymce>
    </div>
    <div class="btn-wrap">
      <el-button type="primary" @click="publish">立即发布</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { publishArticle } from "@/api/data";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formInline: {
        type: "",
        title: ""
      },
      content: "",
      rules: {
        type: [{ required: true, message: "请选择文章分类", trigger: "blur" }],
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }]
      },
      tinymceHtml: "请输入内容",
      init: {
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray",
        height: 200,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false
      }
    };
  },
  mounted() {
    // tinymce.init({});
  },
  computed: {
    ...mapState(["hasLogin"])
  },
  components: { Tinymce },
  methods: {
    publish() {
      console.log(this);
      console.log(this.hasLogin);
      if (this.hasLogin) {
        if (this.content) {
          if (this.formInline.type && this.formInline.title) {
            let data = {
              content: this.content,
              tips: this.formInline.type,
              title: this.formInline.title
            };
            publishArticle(data)
              .then(res => {
                if (res.data.status == "1") {
                  this.$message({
                    message: res.data.msg,
                    type: "success"
                  });
                  this.$router.push("/home");
                } else {
                  this.$message({
                    message: "文章发表没有成功",
                    type: "fial"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  message: "error",
                  type: "error"
                });
              });
          } else {
            this.$message({
              message: "请确定文章分类和标题",
              type: "error"
            });
          }
        } else {
          this.$message({
            message: "内容不能为空!",
            type: "info"
          });
        }
      } else {
        this.$message({
          message: "请先登录!",
          type: "info"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.publish-article {
  margin: 0 200px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .title {
    margin-top: 20px;
    .el-form {
      .el-form-item {
        & + .el-form-item {
          margin-left: 40px;
        }
      }
    }
  }
  .btn-wrap {
    margin-top: 10px;
    text-align: left;
  }
}
</style>