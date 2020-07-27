<template>
  <div v-if="commentList">
    <div class="comment-item" v-for="(item, index) in commentList" :key="index">
      <div class="comment-lv1">
        <div class="left">
          <img
            :src="item.userinfo.user_img"
            alt=""
            v-if="item.userinfo && item.userinfo.user_img"
          />
          <img src="@/assets/img/default_img.jpg" alt="" v-else />
        </div>
        <div class="right">
          <div class="comment-info">
            <div class="info-left">
              <p class="user-name" v-if="item.userinfo">
                {{ item.userinfo.name || "无名氏" }}
              </p>
              <p class="date">{{ item.comment_date || "no time" }}</p>
            </div>
            <div class="info-right" @click="zanSelected = !zanSelected">
              <span class="reply" @click="$emit('replyClick', item.comment_id)">回复</span>
              <!-- 点赞先不做 -->
              <!-- <svg class="icon" aria-hidden="true" v-if="zanSelected">
                <use xlink:href="#icon-zan2"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-zan2-selected-copy"></use>
              </svg>
              <span>2378</span> -->
            </div>
          </div>
          <div class="comment-content">
            {{ item.comment_content }}
          </div>
        </div>
      </div>
      <div class="nested-comment">
        <nested-comment :comment-children="item.children" @sendCommentID="$emit('replyClick', $event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import NestedComment from "@/components/NestedComment.vue";

export default {
  data() {
    return {
      commentList: null,
      zanSelected: true,
    };
  },
  components: {
    NestedComment,
  },

  methods: {
    async getCommentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentList = this.changeToTree(res.data);
      this.$emit("commentLength", res.data.length);
      console.log(this.commentList[2]);
    },
    changeToTree(data) {
      function fn(comment_id) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == comment_id) {
            arr.push(data[i]);
            data[i].children = fn(data[i].comment_id);
          }
        }
        return arr;
      }
      return fn(null);
    },
  },
  created() {
    this.getCommentData();
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  //   border: 1px solid red;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 10px;
  padding-top: 10px;
}
.comment-lv1 {
  display: flex;
  justify-content: flex-start;

  .left {
    //   border:1px solid red;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
      padding-top: 2px;
    }
  }
  .right {
    flex: 1;
    .comment-info {
      display: flex;
      justify-content: space-between;
      .info-left {
        //   border: 1px solid red;
        .user-name {
          font-size: 3.46667vw;
          color: #757575;
        }
        .date {
          margin-top: 1.2vw;
          font-size: 3.2vw;
          height: 3.2vw;
          line-height: 3.2vw;
          color: #999;
        }
      }
      .info-right {
        font-size: 2.8vw;
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          width: 14px;
          height: 14px;
          margin-right: 2px;
          margin-top: -2px;
        }
        .reply {
          font-size: 12px;
          color: #5090cc;
        }
      }
    }
    p {
      margin: 0;
      padding: 0;
    }

    .comment-content {
      margin-top: 2.4vw;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
    }
  }
}
.nested-comment {
  margin: 10px 0 10px 40px;
  padding: 0 5px;
  // border: 1px solid red;
  background: #f4f4f4;
  border-radius: 4px;
}
</style>
