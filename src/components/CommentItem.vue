<template lang="html">
  <div class="comment-lv1">
    <!-- 左边头像 -->

    <div class="left">
      <img
        :src="item.userinfo.user_img"
        alt=""
        v-if="item.userinfo && item.userinfo.user_img"
      />
      <img src="@/assets/img/default_img.jpg" alt="" v-else />
    </div>
    <!-- 右边整块，包括名字和内容 -->
    <div class="right">
      <div class="comment-info">
        <div class="info-left">
          <p class="user-name" v-if="item.userinfo">
            {{ item.userinfo.name || "无名氏" }}
          </p>
          <p class="date">{{ item.comment_date || "no time" }}</p>
        </div>

        <div class="info-right"></div>
      </div>
      <div class="comment-content">
        {{ item.comment_content }}
      </div>
      <div class="comment-operation">
        <!-- 点赞 -->
        <div @click="onZanSelected" class="comment-zan">
          <svg class="icon" aria-hidden="true" v-if="!zanSelected">
            <use xlink:href="#icon-zan2"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-zan2-selected-copy"></use>
          </svg>
          <span :class="{ 'selected-color': zanSelected }">{{ zanNum }}</span>
        </div>

        <!-- 踩 -->
        <div class="comment-cai" @click="caiSelected = !caiSelected">
          <svg class="icon" aria-hidden="true" v-if="!caiSelected">
            <use xlink:href="#icon-cai"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-cai-selected"></use>
          </svg>
        </div>

        <!-- 转发 -->
        <div class="comment-forward" @click="forward = !forward">
          <svg class="icon" aria-hidden="true" v-if="!forward">
            <use xlink:href="#icon-forward"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-forward-selected"></use>
          </svg>
        </div>

        <!-- 气泡 -->
        <div
          class="comment-qipao"
          @click="$emit('replyClick', item.comment_id)"
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
  prop: ["currentComment"],
  mounted() {
    console.log(this.currentComment);
  },
};
</script>
<style lang=""></style>
