<template>
  <div
    class="wrapper"
    v-if="video"
    @click="$router.push('/videoDetail/' + video.videoId)"
  >
    <div class="left-image">
      <img :src="video.cover" alt="cover" />
    </div>
    <div class="right-info">
      <div class="title">{{ video.name }}</div>

      <div class="upper">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-UPzhu2-copy"></use>
        </svg>
        {{ video.upper }}
      </div>
      <div class="play-info">
        <div class="play-info-left">
          <div class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play1"></use>
            </svg>
            3.7万
          </div>
          <div class="danmu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-danmushu"></use>
            </svg>
            316
          </div>
        </div>
        <div class="right-menu" @click.stop="onMenuClick(video.videoId)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/iconfont";
export default {
  name: "myCollection",
  props: ["video"],
  data() {
    return {};
  },

  methods: {
    onMenuClick(videoId) {
      this.$emit("menuClick", videoId);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/baseStyle.scss";
.wrapper {
  padding-bottom: 4.167vw;
  font-size: 3.889vw;
  color: #212121;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.222vw;
  div.left-image {
    //   border: 1px solid red;
    flex: 2;
    display: flex;
    height: 100%;
    img {
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 1.111vw;
      // border: 1px solid red;
    }
    padding-right: 2.778vw;
  }

  div.right-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // border: 1px solid red;
    flex: 3;
    div.title {
      //   text-align: center;
      //   font-weight: bold;
      // 两行显示省略号
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    div.upper {
      color: #aaa;
      font-size: 3.333vw;
      //   border: 1px solid red;
      display: flex;
      //   justify-content: center;
      align-items: center;
    }
    div.play-info {
      display: flex;
      //   border: 1px solid red;
      align-items: center;
      justify-content: space-between;
      font-size: 3.333vw;
      color: #aaa;
      .play-info-left {
        display: flex;

        .play {
          display: flex;
          align-items: center;
          margin-right: 6.944vw;
        }
        .danmu {
          display: flex;
          align-items: center;
        }
      }

      .right-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        // border: 1px solid red;
        right: 0;
        bottom: 0;
      }
    }
  }
}
.icon {
  // border: 1px solid red;
  width: 4.444vw;
  height: 4.444vw;
  margin-right: 1.389vw;
}
</style>
