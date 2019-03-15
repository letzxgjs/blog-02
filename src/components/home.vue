<template>
  <div>
    <div class="publish-artical">
      <el-button type="primary" class="primary" @click="publish">发表文章</el-button>
    </div>
    <div class="content">
      <div class="articles">
        <ul v-for="(item, index) in articles" :key="index">
          <li @click="seeMore(item)">
            <div class="avatar">
              <a href="#">
                <img :src="changeImg(item.author.avatar)">
              </a>
            </div>
            <div class="brief">
              <h2>
                <span>
                  <el-tag size="small">{{item.tips}}</el-tag>
                </span>
                {{item.title}}
              </h2>
              <div class="author">
                <span>{{item.author.username}}</span>
                <span>{{new Date(item.created).toLocaleString()}}</span>
                <span class="comments">
                  <i class="el-icon-document"></i>
                  {{item.commentNum}}
                </span>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          class="pages"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="maxNum"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <div class="articles-list">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章列表</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" ref="zxg9051">
      <login-and-reg modalid="popid" popName="popName" ref="modalChange"></login-and-reg>
    </el-dialog>
  </div>
</template>

<script>
import LoginAndReg from "@/components/login-and-reg";
import { articleList, articleDetail } from "../api/data.js";

export default {
  data() {
    return {
      dialogVisible: false,
      modalid: 0,
      pageNum: 1,
      articles: [],
      maxNum: 1,
      pageSize: 5
    };
  },
  props: ["popid"],
  computed: {
    popName() {
      return popid == 0 ? "login" : "reg";
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    publish() {
      this.$router.push({ name: "publish-article" });
    },
    init() {
      articleList(this.pageNum).then(res => {
        this.maxNum = res.data.maxNum;
        this.articles = res.data.artList;
      });
    },
    changeImg(imgsrc) {
      return process.env.ROOT + imgsrc;
    },
    currentChange(val) {
      this.pageNum = val;
      this.init();
    },
    seeMore(item) {
      // this.$router.push({ name: "article-detail", params: { _id: item._id } });
      // console.log(item);
      this.$router.push({ name: "article-detail", params: item });
    }
  },
  mounted() {
    this.init();
  },
  components: { LoginAndReg }
};
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
        .brief {
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
    .box-card {
      background-color: #fff;
    }
  }
}
</style>