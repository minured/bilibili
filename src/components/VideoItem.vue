<template>
  <div class="video-item" @click="$emit('videoClick')">
    <div class="img-wrapper">
      <img :src="videoInfo.img" alt="" />
      <div class="video-bottom clearfix">
        <span class="play-count play-info">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
          2233
        </span>
        <span class="comment-count play-info">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-comment"></use>
          </svg>
          {{ videoInfo.commentlen || 666 }}
        </span>
      </div>
    </div>
    <span class="video-title">{{ videoInfo.name }}</span>
  </div>
</template>

<script>
import "@/assets/iconfont.js";

export default {
  props: ["videoInfo"],
};
</script>

<style lang="scss" scoped>
.clearfix:before {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}

.video-item {
  margin-bottom: 1.389vw;
  padding: 2.222vw 2.5vw;
  overflow: hidden;
  width: 45vw;
  .img-wrapper {
    position: relative;
    height: 26.944vw;

    .video-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      width: 100%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
    }
    img {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    }
    .play-info {
      position: absolute;
      bottom: 0;
      padding: 1vw;
      font-size: 3.2vw;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 3.889vw;
        height: 3.889vw;
        margin-bottom: 0.556vw;
        margin-right: 0.833vw;
      }
    }
    .play-count {
      left: 0;
    }
    .comment-count {
      right: 0;
    }
  }
  .video-title {
    font-size: 3.2vw;
    color: #212121;
    margin-top: 1.3vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
