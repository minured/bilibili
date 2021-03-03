<template>
  <div class="page">
    <div class="comment-item" v-for="(item, i) in commentChildren" :key="i">
      <div class="current-level" @click="sendCommentID(item.comment_id)">
        <div class="comment">
          <!-- 评论用户名-->
          <div class="comment-info">
            <span class="user-name">{{ item.userinfo.name || "无名氏" }}</span>
            <span style="font-size:3.46667vw;color: #212121">：</span>
          </div>

          <!-- 评论内容：两种情况，如果是三级评论，则加上 回复 XX： -->
          <!-- 情况一：三级评论 -->
          <div class="comment-content" v-if="isLevel3">
            回复
            <span style="color: #5090cc">{{ item.parent_user_info.name }}</span>
            <span style="font-size:3.46667vw">：</span>
            {{ item.comment_content }}
          </div>

          <!-- 情况二： 二级评论 -->
          <div class="comment-content" v-else>{{ item.comment_content }}</div>
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
  padding-bottom: 2.778vw;
  padding-top: 2.778vw;
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
