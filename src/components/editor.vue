<template>
  <div>
    <editor class="tinymce" api-key="API_KEY" :init="initTinymce" v-model="content"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
export default {
  data() {
    return {
      init: {
        selector: ".tinymce",
        plugins: ["paste", "link"],
        skin_url: "../../static/tinymce/skins/lightgray",
        language: "zh_CN",
        language_url: "../static/tinymce/zh_CN.js"
      }
    };
  },
  mounted() {
    tinymce.init(this.initTinymce);
  },
  components: { Editor }
};
</script>

<style lang="scss" scoped>
</style>
