<template>
  <div>
    <div class="comment-item" v-for="(item, i) in commentChildren" :key="i">
      <div class="current-level">
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
              <p class="user-name">{{ item.userinfo.name || "无名氏" }}</p>
              <p class="date">{{ item.comment_date || "no time" }}</p>
            </div>
            <div class="info-right">
              <span class="reply" @click="sendCommentID(item.comment_id)"
                >回复</span
              >
              <!-- TODO 点赞 -->
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zan2"></use>
              </svg>
              <span>2378</span> -->
            </div>
          </div>
          <div class="comment-content" v-if="isLevel3">
            回复
            <span style="color: #5090cc">{{ item.parent_user_info.name }}</span>
            ：{{ item.comment_content }}
          </div>
          <div class="comment-content" v-else>
            {{ item.comment_content }}
          </div>
        </div>
      </div>
      <div class="nested-comment">
        <nestedComment :commentChildren="item.children" :isLevel3="true" @sendCommentID="sendCommentID"/>
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
    sendCommentID(id) {
      this.$emit("sendCommentID", id); //被每层的本递归组件 接收
    },
    continueSendID(id) {
      this.sendCommentID(id)
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
}
.current-level {
  display: flex;
  padding-bottom: 2.778vw;
  padding-top: 2.778vw;
  width: 100%;
  .left {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 2.778vw;
      padding-top: 0.556vw;
    }
  }
  .right {
    flex: 1;
    .comment-info {
      display: flex;
      justify-content: space-between;
      .info-left {
        flex: 1;
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
          width: 3.889vw;
          height: 3.889vw;
          margin-right: 0.556vw;
          margin-top: -0.556vw;
        }
        .reply {
          font-size: 3.333vw;
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
</style>
