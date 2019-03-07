<template>
  <div>
    <div class="publish-artical">
      <el-button type="primary" class="primary" @click="publish">发表文章</el-button>
    </div>
    <div class="content">
      <div class="articles">
        <ul v-for="i in 10" :key="i">
          <li>
            <div class="avatar">
              <a href="#">
                <img src="../assets/logo.png">
              </a>
            </div>
            <div class="brief">
              <h2><span><el-tag size="small">vue</el-tag></span>ElementUI官网的配色看着费眼神</h2>
              <div class="author">
                <span>admin</span><span>2019-3-3T20:40:00</span>
                <span class="comments"><i class="el-icon-document"></i>2</span>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          class="pages"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="articles-list">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章列表</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%" ref="zxg9051">
      <login-and-reg modalid="popid" popName="popName" ref="modalChange"></login-and-reg>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, 
      modalid: 0
    }
  }, 
  props: ['popid'], 
  computed: {
    popName(){
      return popid == 0 ? "login" : "reg"
    }
  }, 
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }, 
      publish(){
        this.$router.push({name: "publish-article"})
      }, 
      init() {
        // console.log(this.$refs.modalChange)
        // this.$refs.modalChange.switchActiveName(this.popid)
        this.dialogVisible = true
      }
    }
}
</script>

<style lang="scss" scoped>
.publish-artical {
  height: 50px;
  line-height: 50px;
  padding: 0 200px;
  text-align: right;
  background-color: #fff;
  .primary {
    height: 40px;
  }
}
.content {
  margin: 0 200px;
  margin-top: 15px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;
  .articles {
    background-color: #fff;
    display: flex;
    flex-flow: row wrap;
    ul {
      width: 100%;
      height: 100%;
      li {
        display: flex;
        padding: 15px;
        padding-left: 75px;
        border-bottom: 1px dotted #e2e2e2;
        position: relative;
        .avatar {
          // width: 80px;
          // display: flex;
          position: absolute;
          top: 15px;
          left: 15px;
          a {
            img {
              width: 45px;
              height: 45px;
            }
          }
        }
        .brief{
          height: 50px;
          width: 100%;
          text-align-last: left;
          h2 {
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            margin: 0;
            font-weight: normal;
          }
          .author {
            margin-top: 10px;
            color: #888;
            span {
              padding-right: 15px;
              .el-icon-document {
                padding-right: 15px;
              }
            }
            .comments {
              float: right;
            }
          }
        }
      }
    }
    .pages {
      margin: 15px auto;
    }
  }
  .articles-list {
    .box-card{
      background-color: #fff;
    }
  }
}
</style>