<template>
  <div class="page">
    <div
      class="comment-item"
      v-for="(item, i) in commentChildren.slice(0, 3)"
      :key="i"
    >
      <div class="current-level" @click="sendCommentID(item.comment_id)">
        <div class="comment">
          <!-- 评论用户名-->
          <div class="comment-info">
            <span class="user-name">{{ item.userInfo.nickname|| "无名氏" }}</span>
            <span style="font-size:3.46667vw;color: #212121">：</span>
          </div>

          <!-- 评论内容 -->
          <div class="comment-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div
      class="more-comment"
      v-if="commentChildren.length > 3"
      @click="$emit('popAllChildren')"
    >
      共{{ commentChildren.length }}条回复 >
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
};
</script>

<style lang="scss" scoped>
.page {
  .more-comment {
    font-size: 3vw;
    color: #5090cc;
    padding-bottom: 0.667vw;
  }
}
.comment-item {
}
.current-level {
  //   border: 1px solid red;
  display: flex;
  padding: 0.4vw 0;
  width: 100%;

  // 嵌套评论
  .comment {
    flex: 1;
    // border: 1px solid red;
    display: flex;
    align-items: center;

    .comment-info {
      // border: 1px solid red;
      .user-name {
        font-size: 3.46667vw;
        color: #5090cc;
      }
    }

    .comment-content {
      // border: 1px solid red;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
    }
  }
}
</style>
