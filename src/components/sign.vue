<template>
  <div class="login">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <!-- <el-tabs v-model="activeName"> -->
    <el-tabs v-model="activeName">
      <!-- <el-tabs :value="activeName"> -->
      <el-tab-pane label="登陆" name="login">
        <el-form
          :model="ruleForm1"
          status-icon
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" @keyup.enter.native="submitForm('ruleForm1')">
            <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
            <el-button @click="resetForm('ruleForm1')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm2.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" @keyup.enter.native="submitForm('ruleForm2')">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import axios from "axios";
// import http from "../lib/index.js";
import { mapMutations, mapActions } from "vuex";
import { login, reg } from "../api/user.js";
import { articleList } from "../api/data.js";
export default {
  name: "login",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm1: {
        pass: "",
        username: ""
      },
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules1: {
        pass: [{ validator: validatePass, trigger: "blur" }]
        // username: [{ validator: checkAge, trigger: "blur" }]
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }]
        username: [{ required: true, trigger: "blur" }]
      }
    };
  },
  props: ["popSwitch"],
  computed: {
    activeName: {
      // return popNum == 1 ? 'login' : 'reg'
      get: function() {
        if (this.popSwitch == 1) {
          return "login";
        } else {
          return "reg";
        }
      },
      set: function(val) {
        this.activeName = val;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "ruleForm1") {
            login({
              username: this.ruleForm1.username,
              password: this.ruleForm1.pass
            })
              .then(res => {
                if (res.data.status == "success") {
                  this.setUsername(this.ruleForm1.username);
                  this.setLogin();
                  this.getInfo();
                  this.resetForm(formName);
                  this.$message({
                    message: res.data.msg,
                    type: "success"
                  });
                  // this.ruleForm1.username = "";
                  // this.ruleForm1.pass = "";
                  this.$router.push({ name: "home" });
                  this.$emit("closeDialog");
                } else {
                  this.$message({
                    message: res.data.errMsg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  message: "服务器错误",
                  type: "error"
                });
              });
          } else {
            reg({
              username: this.ruleForm2.username,
              password: this.ruleForm2.pass
            }).then(res => {
              this.$message({
                message: res.data.data,
                type: "success"
              });
              this.resetForm(formName);
              // console.log(this.activeName);
              // this.activeName = "login";
              // console.log(this.activeName);
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations(["setUsername", "setLogin", "getAvatar"]),
    // ...mapMutations(["setUsername", "setLogin", "setLogout"]),
    ...mapActions({ getInfo: "getInfo" })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  margin: 0 auto;
  .el-tabs {
    margin: 0 auto;
    .el-input {
      width: 200px;
    }
  }
}
</style>
