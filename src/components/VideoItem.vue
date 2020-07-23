<template>
  <div class="video-item" @click="$emit('videoClick')">
    <img :src="videoInfo.img" alt="" />
    <span class="video-title">{{ videoInfo.name }}</span>
  </div>
</template>

<script>
export default {
  props: ["videoInfo"],
};
</script>

<style lang="scss" scoped>
.video-item {
  margin-bottom: 1.389vw;
  padding: 2.222vw 2.5vw;
  overflow: hidden;
  width: 45vw;
  img {
    width: 100%;
    height: 25.278vw;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
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
