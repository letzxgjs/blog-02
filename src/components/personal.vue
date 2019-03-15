<template>
  <div class="core">
    <el-col :span="4">
      <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="1" :route="{name:'user'}">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{name:'article'}">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{name:'comments'}">
          <i class="el-icon-document"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="4" :route="{name:'userface'}">
          <i class="el-icon-setting"></i>
          <span slot="title">更改头像</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view>
        <template v-slot:trigger>
          <el-dialog
            title="上传头像"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>
              <img src="http://116.62.147.91:3000/avatar/default.jpg">
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="postImg">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </router-view>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    postImg() {
      this.dialogVisible = false;
    },
    handleClose() {}
  }
};
</script>

<style lang="scss" scoped>
// .core {
//   // margin: 0 200px;
// }
</style>
