<template>
  <van-collapse v-model="activeNames" :border="false" @change="onChange">
    <div class="videoinfo">
      <van-collapse-item :title="videoData.name" name="1">
        <template #title>
          <div class="video-title" :class="{ 'title-wrap': titleWrap }">
            <span class="video-type">{{ videoData.category.title }}</span>
            {{ videoData.name }}
          </div>
          <div class="video-moreinfo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-UPzhu"></use>
            </svg>
            <span class="up">{{ videoData.userinfo.name }}</span>
            <span class="play-count">2233万观看</span>
            <span class="danmu">1.2万弹幕</span>
            <span class="date">{{ videoData.date }}</span>
          </div>
        </template>
        <div class="video-collapse">
          我是视频简介啦 <br />
          是视频简介啦 <br />
          视频简介啦<br />
          简介啦~
        </div>
      </van-collapse-item>
    </div>
  </van-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      titleWrap: true,
    };
  },
  props: ["videoData"],
  methods: {
    onChange() {
      this.$emit("onChange");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/iconStyle.scss";
.videoinfo {
  margin-bottom: 10px;
  // border: 1px solid red;
  .video-title {
    // background: rgba(0, 0, 0, 0.2);
    font-size: 4.26667vw;
    font-weight: 400;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #212121;
    text-overflow: ellipsis;
    margin-bottom: 1vw;
    width: 86.66667vw;
    height: 6.4vw;
    line-height: 6.4vw;
    &.title-wrap {
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: -0.833vw;
    }
    .video-type {
      background: #f4f4f4;
      padding: 1vw 1.6vw 0.6vw 1.6vw;
      font-size: 3.2vw;
      height: 5vw;
      line-height: 5vw;
      color: #fb7299;
      border-radius: 3vw;
    }
  }
  .video-moreinfo {
    // background: rgba(0, 0, 0, 0.2);

    line-height: 4.444vw;
    font-size: 3.2vw;

    .icon {
      width: 4.444vw;
      height: 4.444vw;
      vertical-align: middle;
      margin-top: -0.756vw;
      margin-right: 1.111vw;
    }
    .up {
      color: #212121;
      margin-right: 3vw;
    }
    .play-count {
      color: #999;
      margin-right: 3vw;
    }
    .danmu {
      color: #999;
      margin-right: 3vw;
    }
    .date {
      color: #999;
      margin-right: 3vw;
    }
  }
  .video-collapse {
    // background: rgba(0, 0, 0, 0.2);
    font-size: 3.2vw;
    line-height: 4.8vw;
    color: #999;
    padding-top: 1.33333vw;
    white-space: pre-wrap;
  }
}
</style>
