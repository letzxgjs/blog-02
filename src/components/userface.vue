<template>
  <div class="main">
    <el-upload
      class="avatar-uploader"
      :action="uploadTo"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" @click="uploadAvatar" class="confirm-btn">点击上传</el-button>
    <el-dialog title="上传头像" :visible.sync="dialogVisible" width="500px">
      <div class="cropper-wrap">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          @realTime="realTime"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :enlarge="option.enlarge"
        ></vueCropper>
        <div class="pre-item">
          <div>头像预览</div>
          <div
            class="show-preview"
            :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}"
          >
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { postAvatar } from "@/api/data";
import { changeImg } from "@/lib/tool";
import http from "@/lib/index";
import { VueCropper } from "vue-cropper";
export default {
  data() {
    return {
      uploadTo: http.adornUrl("upload"),
      dialogVisible: false,
      imageUrl: "",
      modelSrc: "",
      previews: {},
      option: {
        img: "",
        size: 1,
        full: true,
        outputType: "png",
        canMove: true,
        canMoveBox: true,
        fixedBox: false,
        original: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 150,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        cropData: {},
        enlarge: 1,
        mode: "contain"
      }
    };
  },
  components: { VueCropper },
  computed: {
    ...mapState(["avatar"])
  },
  mounted() {
    this.initAvatar();
  },
  methods: {
    ...mapActions(["getInfo"]),
    initAvatar() {
      // this.fileList2[0].url = changeImg(this.avatar);
    },
    realTime(data) {
      var previews = data;
      var h = 0.5;
      var w = 0.2;

      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      };

      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: w
      };
      this.previews = data;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file);
      });
      return false;
      // return isJPG && isLt2M;
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.dialogVisible = false;
          this.modelSrc = img;
          this.imageUrl = this.modelSrc;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.dialogVisible = false;
          this.modelSrc = data;
          this.imageUrl = this.modelSrc;
        });
      }
    },
    confirmImg() {
      this.finish("base64");
      // this.$refs.cropper.getCropBlob(data => {
      //   console.log(data);
      //   postAvatar(data);
      // });
      // console.log(data);
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: "image/png" });
    },
    uploadAvatar() {
      const file = this.dataURLtoFile(this.modelSrc, "avatar.png");
      var data = new FormData();
      data.append("file", file);
      postAvatar(data).then(res => {
        if (res.data.status == 1) {
          this.getInfo();
          this.imageUrl = "";
          this.$message({
            message: "头像上传成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "头像上传失败",
            type: "error"
          });
        }
      });
    },
    handleAvatarSuccess() {
      this.initAvatar();
      this.getInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: #fff;
  text-align: left;
  .avatar-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .avatar-uploader:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .confirm-btn {
    display: block;
    box-sizing: border-box;
  }
  .cropper-wrap {
    display: flex;
    padding: 0;
    .vue-cropper {
      width: 300px;
      height: 300px;
      margin-right: 20px;
    }
  }
}
</style>
