<template>
  <div>
    <el-form :model="ruleForm4" status-icon :rules="rules4" ref="ruleForm4" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm4.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm4.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm4')">提交</el-button>
        <el-button @click="resetForm('ruleForm4')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm4.checkPass !== '') {
            this.$refs.ruleForm4.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm4.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm4: {
          pass: '',
          username: ''
        },
        rules4: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { required: true, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios
              .post('/proxyApi/user/login', {
                username: this.ruleForm4.username, 
                password: this.ruleForm4.pass
              })
              .then(res => {
                alert(JSON.stringify(res.data))
                if(res.data.code == 1) {
                // if(res.data.status == 'success') {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                    })
                  this.$router.push({name: 'admin'})
                }else {
                  this.$message({
                    message: 'failed to login!',
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                this.$message({
                  message: 'server failure', 
                  type: 'error'
                })
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="sass" scoped>
  .el-input
    width: 360px
</style>
