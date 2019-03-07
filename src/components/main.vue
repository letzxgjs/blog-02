<template>
  <div>
    <div class="nav">
      <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">Web</el-menu-item>
          <el-menu-item index="3">大数据</el-menu-item>
          <el-menu-item index="4">Java</el-menu-item>
          <el-menu-item index="5">Python</el-menu-item>
          <el-menu-item index="6">关于博主</el-menu-item>
        </el-menu>
        <div class="personal">
            <ul>
              <li class="login" @click="signin">登录</li>
              <li class="reg" @click="signup">注册</li>
            </ul>
        </div>
      </div>
    </div>
      <login-and-reg :popNum="popid" ref="dialog"></login-and-reg>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginAndReg from '@/components/login-and-reg.vue'
export default {
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1', 
        popid: 0
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }, 
      signin(){
        this.popid = 1
        this.$refs.dialog.init()
      }, 
      signup(){
        this.popid = 0
        this.$refs.dialog.init()
      }
    }, 
    components: {
      LoginAndReg
    },
    beforeUpdate(){
      console.log(this.popid)
    }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  background-color: #fff;
  padding: 0 200px;
  margin: 0 auto;
  box-sizing: border-box;
  .navbar {
    // position: relative;
    display: flex;
    height: 60px;
    border-bottom: 1px solid #e6e6e6;
    .personal {
      display: flex;
      margin-left: auto;
      ul {
        display: flex;
        height: 60px;
        line-height: 60px;
        li {
          height: 100%;
          align-items: stretch;
          float: left;
          padding: 0 20px;
          &:hover {
            cursor: pointer;
            background-color: #ecf5ff;
          }
        }
      }
    }
  }
}
</style>