<template>
  <div class="comments">
    <h3>评论</h3>
    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
    <el-button type="primary" @click="summitComment">立即发表</el-button>
    <ul class="comments-wrap" v-if="comments.length">
      <li v-for="(comment, index) in comments" :key="index">
        <div class="from-user">
          <div class="avatar">
            <img :src="changeImg(comment.from.avatar)" :alt="comment.from.username">
          </div>
          <div class="user-info">
            <div class="username">{{comment.from.username}}</div>
            <div class="time">{{new Date(comment.updatedAt).toLocaleString()}}</div>
          </div>
        </div>
        <div class="comment-content">{{comment.content}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { commentsList, postComment } from "../api/data.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      textarea: "",
      comments: []
    };
  },
  computed: {
    ...mapState(["hasLogin"])
  },
  // props: ["comments"],
  mounted() {
    this.getComments();
    console.log(this.comments.from.updateAt);
  },
  methods: {
    getComments() {
      commentsList(this.$route.params._id).then(res => {
        if (res.data) {
          this.comments = res.data.comment;
        }
      });
    },
    changeImg(src) {
      return process.env.ROOT + src;
    },
    summitComment() {
      if (this.hasLogin) {
        if (this.textarea.trim()) {
          let data = {
            article: this.$route.params._id,
            content: this.textarea
          };
          postComment(data).then(res => {
            if (res.data.status == "1") {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.textarea = "";
              this.getComments();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "评论内容不能为空",
            type: "info"
          });
        }
      } else {
        this.$message({
          message: "请先登录",
          type: "info"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comments {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  .el-textarea {
    margin-bottom: 20px;
  }
  .el-button {
    display: block;
    margin-bottom: 20px;
    text-align: left;
  }
  .comments-wrap {
    text-align: left;
    li {
      border-top: 1px solid #aaa;
      padding: 10px 0;
      .from-user {
        display: flex;
        .avatar {
          flex: 2;
          img {
            width: 50px;
            height: 50px;
          }
        }
        .user-info {
          flex: 22;
          margin-left: 8px;
          .username {
            margin-bottom: 8px;
            color: #01aaed;
          }
          .time {
            color: #aaa;
          }
        }
      }
    }
    .comment-content {
      padding-left: 58px;
    }
  }
}
</style>