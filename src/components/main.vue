<template>
  <div>
    <div class="nav">
      <div class="navbar">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">Web</el-menu-item>
          <el-menu-item index="3">大数据</el-menu-item>
          <el-menu-item index="4">Java</el-menu-item>
          <el-menu-item index="5">Python</el-menu-item>
          <el-menu-item index="6">关于博主</el-menu-item>
        </el-menu>
        <div class="personal">
          <div v-if="hasLogin">
            <el-button type="text" class="button">个人中心</el-button>
            <el-button type="text" class="button avatar">
              <el-dropdown @command="logout">
                <span class="user-info">
                  <img src="../assets/logo.png" alt="avatar">
                  <span class="el-dropdown-link">admin</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
          </div>
          <div class="beforeLogin" v-else>
            <el-button type="text" class="button login" @click="signin">登录</el-button>
            <el-button type="text" class="button reg" @click="signup">注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <login-and-reg class="popup" :popNum="popid" ref="dialog" width="500"></login-and-reg>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginAndReg from "@/components/login-and-reg.vue";
import { mapState, mapMutations } from "Vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      popid: 0
    };
  },
  computed: {
    // ...mapState(["hasLogin"])

    ...mapState({
      hasLogin: state => state.hasLogin
    })

    // hasLogin: function(state) {
    //   debugger;
    //   console.log("main.vue");
    //   console.log(this.$store.state);
    //   console.log(this.$store.state.hasLogin);
    //   return this.$store.state.hasLogin;
    // }

    // log() {
    //   return this.$store.state.hasLogin;
    // }
  },
  methods: {
    ...mapMutations({
      setLogout: "setLogout"
    }),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    signin() {
      this.popid = 1;
      this.$refs.dialog.init();
    },
    signup() {
      this.popid = 0;
      this.$refs.dialog.init();
    },
    logout() {
      this.setLogout();
    }
    // ...mapMutations(["setLogin", "logout"])
    // logout() {
    //   debugger;
    //   console.log(2222);
    //   console.log(this.$store.state.hasLogin);
    //   this.$store.commit("logout");
    //   console.log(this.$store.state.hasLogin);
    //   console.log(this.hasLogin);
    // }
  },
  components: {
    LoginAndReg
  },
  beforeUpdate() {
    console.log(this.popid);
  }
};
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
    .el-menu-demo {
      border: 0;
    }
    .personal {
      display: flex;
      margin-left: auto;
      // .beforeLogin {
      div {
        display: flex;
        height: 60px;
        line-height: 60px;
        .button {
          color: #000;
          padding: 0 20px;
          margin: 0;
          &:hover {
            cursor: pointer;
            background-color: #ecf5ff;
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          // flex-flow: row nowrap;
          // line-height: 1;
          img {
            display: block;
            height: 40px;
            width: 40px;
          }
        }
      }
    }
  }
}
</style>