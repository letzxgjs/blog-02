<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick" id="sign">
      <router-link to='./'>登录</router-link>
      <router-link to='./signup'>注册</router-link>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App', 
  data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="sass">
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
  form
    width: 500px

.el-form
  margin: 20px auto
  width: 500px
  .router-link-active
    &:visted
      text-decoration: none
      color: #2c3e50
  .el-input
    width: 300px
</style>
