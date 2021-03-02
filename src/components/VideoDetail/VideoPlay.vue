<template>
  <div class="video-player">
    <video :src="videoData.content" controls></video>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["videoData"],
  methods: {},
};
</script>

<style lang="scss">
.video-player {
  // border: 1px solid green;
  width: 100vw;
  video {
    width: 100%;
  }
}
</style>
