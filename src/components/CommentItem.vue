<template lang="html">
  <!-- 目前仅二级评论弹出层的 父评论 使用 后续继续封装 -->
  <!-- 一级评论 -->
  <div class="comment-lv1" v-if="currentComment">
    <!-- 左边头像 -->
    <div class="left">
      <img
        :src="currentComment.userInfo.userImg"
        alt=""
        v-if="currentComment.userInfo && currentComment.userInfo.userImg"
      />
      <img src="@/assets/img/default_img.jpg" alt="" v-else />
    </div>
    <!-- 右边整块，包括名字和内容 -->
    <div class="right">
      <div class="comment-info">
        <div class="info-left">
          <p class="user-name" v-if="currentComment.userInfo">
            {{ currentComment.userInfo.nickname}}
          </p>
          <p class="date">{{ currentComment.date}}</p>
        </div>

        <div class="info-right"></div>
      </div>
      <div class="comment-content">
        {{ currentComment.content }}
      </div>
      <div class="comment-operation">
        <!-- 点赞 -->
        <div @click="$emit('clickZan')" class="comment-zan">
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-zan2"></use>
          </svg>
          <!-- <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-zan2-selected-copy"></use>
          </svg> -->
          <!-- <span :class="{ 'selected-color': zanSelected }">{{ zanNum }}</span> -->
        </div>

        <!-- 踩 -->
        <div class="comment-cai" @click="$emit('clickCai')">
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-cai"></use>
          </svg>
          <!-- <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-cai-selected"></use>
          </svg> -->
        </div>

        <!-- 转发 -->
        <div class="comment-forward" @click="$emit('clickForward')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-forward"></use>
          </svg>
        </div>

        <!-- 气泡 -->
        <div
          class="comment-qipao"
          @click="$emit('clickReply', currentComment._id)"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qipao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentComment", "zanSelected", "caiSelected", "zanNum"],
};
</script>
<style lang="scss">
@import "@/assets/iconStyle.scss";
.comment-lv1 {
  // background: rgba($color: #000000, $alpha: 0.1);
  display: flex;
  justify-content: flex-start;

  .left {
    img {
      width: 8.333vw;
      height: 8.333vw;
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

      // 名字和日期
      .info-left {
        //   border: 1px solid red;
        .user-name {
          font-size: 3.467vw;
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
      // 回复按钮
      .info-right {
        font-size: 2.8vw;
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          width: 3.889vw;
          height: 3.889vw;
          margin-right: 2px;
          margin-top: -2px;
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
    // 评论内容
    .comment-content {
      margin-top: 2.4vw;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
      margin-bottom: 2.222vw;
    }
    // 点赞收藏转发
    .comment-operation {
      font-size: 3.4667vw;
      // border: 1px solid red;
      display: flex;
      div {
        margin-right: 4.167vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div.comment-zan {
        span {
          margin-top: 0.556vw;
          margin-left: 0.556vw;
          color: #8a8a8a;
        }
      }
    }
  }
}
</style>
