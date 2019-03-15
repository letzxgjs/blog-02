<template>
  <div class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="文章分类" prop="category" class="inline">
        <el-select v-model="ruleForm.category" placeholder="请选择">
          <el-option label="nodejs" value="nodejs"></el-option>
          <el-option label="vue" value="vue"></el-option>
          <el-option label="react" value="react"></el-option>
          <el-option label="angular" value="angular"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题" prop="title" class="inline">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
    </el-form>
    <editor id="tinymce" api-key="API_KEY" v-model="content" :init="init"></editor>
    <div class="btn">
      <el-button type="primary" @click="submitForm">立即创建</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
export default {
  data() {
    return {
      ruleForm: {
        category: "",
        title: ""
      },
      rules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      tinymceHtml: "请输入内容",
      content: "请输入内容",
      init: {
        id: "#tinymce",
        selector: "textarea#editor",
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "static/tinymce/skins/lightgray",
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat"
      }
    };
  },
  components: { Editor },
  mounted() {
    // tinymce.init({});
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 200px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .ruleForm {
    .el-form-item {
      text-align: left;
    }
    .inline {
      display: inline-block;
      margin-right: 40px;
    }
    #editor {
      display: block;
      .tox-toolbar {
        display: flex;
      }
    }
  }
  .btn {
    text-align: left;
  }
}
</style>
