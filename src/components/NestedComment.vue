<template>
  <div class="page">
    <div class="comment-item" v-for="(item, i) in commentChildren" :key="i">
      <div class="current-level" @click="sendCommentID(item._id)">
        <div class="comment">
          <div v-if="isLevel3" class="level2-wrapper">
            <div class="comment-head">
              <!-- 用户名 -->
              <span class="user-name">{{ item.userInfo.nickname }}</span>

              <span v-html="'&nbsp;'"></span>
              <span class="reply">回复</span>
              <span v-html="'&nbsp;'"></span>
              <span style="color: #5090cc" class="user-name">{{
                item.parentUser
              }}</span>
              <span style="font-size:3.46667vw" class="dots">：</span>
              <br />
            </div>

            <div class="level3-content comment-content">{{ item.content }}</div>
          </div>

          <div v-else class="level2-wrapper">
            <div class="comment-head">
              <span class="user-name">{{ item.userInfo.nickname }}</span>
              <!-- <span v-html="'&nbsp;'"></span> -->
              <span class="dots">：</span>
            </div>

            <div class="level2-content comment-content">{{ item.content }}</div>
          </div>
        </div>
      </div>

      <div class="nested-comment">
        <nestedComment
          :commentChildren="item.children"
          :isLevel3="true"
          @sendCommentID="sendCommentID"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nestedComment",
  props: ["commentChildren", "isLevel3"],
  methods: {
    // 递归组件 层层向上发送事件
    // 评论id的传递路径： nestedComment => CommentList => Commend(在此发送)
    sendCommentID(id) {
      this.$emit("sendCommentID", id); //被每层的本递归组件 接收
    },
    continueSendID(id) {
      this.sendCommentID(id);
    },
  },
  mounted() {
    console.log(this.commentChildren);
  },
};
</script>

<style lang="scss" scoped>
.page {
}
.comment-item {
}
.current-level {
  // border: 1px solid red;
  display: flex;
  padding: 1vw 0;
  width: 100%;

  // 嵌套评论
  .comment {
    flex: 1;
    font-size: 3.46667vw;
    // border: 1px solid red;
    display: flex;
    align-items: center;

    .comment-head {
      // border: 1px solid red;
      margin-bottom: 12px;
      .user-name {
        color: #5090cc;
      }
      .reply {
        color: #212121;
      }

      .dots {
        padding-bottom: 5px;
      }
    }

    .level2-wrapper,
    .level3-wrapper {
      width: 100%;
    }
    .comment-content {
      border-bottom: 0.5px solid #ddd;
      padding-left: 4vw;
      padding-bottom: 3vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
    }
  }
}
</style>
