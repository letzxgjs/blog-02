<template>
  <div class="main">
    <el-upload
      class="upload-demo"
      :action="uploadTo"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList2"
      list-type="picture"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <slot name="trigger">弹框确认</slot>
    </el-upload>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { postAvatar } from "@/api/data";
import { changeImg } from "@/lib/tool";
import http from "@/lib/index";
export default {
  data() {
    return {
      uploadTo: http.adornUrl("upload"),
      imgBase64: "",
      fileList2: [
        {
          name: "food.jpeg",
          url: ""
        }
      ]
    };
  },
  computed: {
    ...mapState(["avatar"])
  },
  mounted() {
    this.initAvatar();
  },
  methods: {
    ...mapActions(["getInfo"]),
    initAvatar() {
      this.fileList2[0].url = changeImg(this.avatar);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file.raw instanceof File);
      // var reader = new FileReader();
      // var maxImgSize = 512000;
      // var imgBase64 = reader.readAsDataURL(file.raw);
      // console.log(reader.readAsDataURL(file.raw));
    },
    beforeUpload(file) {
      var reader = new FileReader();
      // var maxImgSize = 512000;
      reader.onload = function() {
        console.log(this);
        this.imgBase64 = reader.result;
        reader.readAsDataURL(file);
      };
      console.log(this.imgBase64);
    },
    onSuccess() {
      this.initAvatar();
      this.getInfo();
    },
    updated() {}
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: #fff;
  text-align: left;
}
</style>
