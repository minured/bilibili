<template>
  <div class="page">
    <div class="navbar-wrapper">
      <nav-bar :userInfo="userInfo" />
    </div>
    <div class="video-wrapper" v-if="videoData">
      <div class="video-player">
        <video :src="videoData.content" controls></video>
      </div>
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
          <div class="video-operation">
            <div class="operation-left">
              <div class="zan" @click="zanSelected = !zanSelected">
                <svg class="icon" aria-hidden="true" v-if="zanSelected">
                  <use xlink:href="#icon-zan-selected"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else>
                  <use xlink:href="#icon-zan"></use>
                </svg>
                点赞
              </div>
              <div class="collection" @click="onCollectionClick">
                <svg class="icon" aria-hidden="true" v-if="collectionSelected">
                  <use xlink:href="#icon-collection-selected"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else>
                  <use xlink:href="#icon-collection"></use>
                </svg>
                收藏
              </div>
              <div class="download" @click="download">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-huancun"></use>
                </svg>
                缓存
              </div>
            </div>
            <div class="operation-right" @click="follow">
              <div v-if="!isFollowed">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-add"></use>
                </svg>
                关注
              </div>
              <div v-else class="is-followed">已关注</div>
            </div>
          </div>
        </div>
      </van-collapse>
    </div>
    <div class="commnd-wrapper">
      <commend :commendData="commendData" :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Commend from "@/components/Commend";
export default {
  data() {
    return {
      videoData: undefined,
      activeNames: [],
      titleWrap: true,
      zanSelected: false,
      collectionSelected: false,
      commendData: undefined,
      userInfo: null,
      isFollowed: false,
    };
  },
  components: {
    NavBar,
    Commend,
  },
  methods: {
    isLogin() {
      if (!this.userInfo) {
        this.$toast.fail("请先登录");
        return false;
      }
      return true;
    },

    async initFollow() {
      console.log(this.videoData);
      const res = await this.$http.get(
        "/sub_scription/" + localStorage.getItem("id"),
        {
          params: {
            // 使用了data，要注意时机
            sub_id: this.videoData.userid,
          },
        }
      );
      console.log(res);
      if (res.data.success === false) {
        this.isFollowed = false;
      } else if (res.data.success === true) {
        this.isFollowed = true;
      }
    },
    async follow() {
      if (!this.isLogin()) {
        return;
      }
      this.isFollowed = !this.isFollowed;
      const res = await this.$http.post(
        "/sub_scription/" + localStorage.getItem("id"),
        {
          sub_id: this.videoData.userid,
        }
      );
      console.log(res);
      if (res.data.msg === "关注成功") {
        this.isFollowed = true;
      } else if (res.data.msg === "取消关注成功") {
        this.isFollowed = false;
      }
    },
    async initCollection() {
      const res = await this.$http.get(
        "/collection/" + localStorage.getItem("id"),
        {
          params: {
            article_id: this.$route.params.id,
          },
        }
      );
      if (res.data.success === false) {
        this.collectionSelected = false;
      } else if (res.data.success === true) {
        this.collectionSelected = true;
      }
    },
    async onCollectionClick() {
      if (!this.isLogin()) {
        return;
      }
      const res = await this.$http.post(
        "/collection/" + localStorage.getItem("id"),
        { article_id: this.$route.params.id }
      );
      if (res.data.msg === "收藏成功") {
        this.collectionSelected = true;
      } else if (res.data.msg === "取消收藏成功") {
        this.collectionSelected = false;
      }
    },
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.userInfo = res.data[0];
    },
    async getVideoData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.videoData = res.data[0];
      this.initFollow();
    },
    onChange() {
      this.titleWrap = !this.titleWrap;
    },
    download() {
      window.open(this.videoData.content);
    },
    async getRecommend() {
      const res = await this.$http.get("/commend");
      this.commendData = res.data;
    },
  },
  created() {
    this.getVideoData();
    this.getRecommend();
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
      this.initCollection();
    }
  },
  watch: {
    $route() {
      this.getVideoData();
      this.getRecommend();
      this.initCollection();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.css";
.page {
  background: white;
}
.video-wrapper {
  .video-player {
    // border: 1px solid green;
    width: 100vw;
    video {
      width: 100%;
    }
  }
  .videoinfo {
    margin-bottom: 10px;
    // border: 1px solid red;
    .video-title {
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
      font-size: 3.2vw;
      line-height: 4.8vw;
      color: #999;
      padding-top: 1.33333vw;
      white-space: pre-wrap;
    }
  }
  .video-operation {
    // border: 1px solid red;
    padding: 2.778vw 4.444vw;
    font-size: 3.5vw;
    display: flex;
    justify-content: space-between;
    .operation-left {
      // border: 1px solid red;
      display: flex;
      width: 60vw;
      justify-content: space-between;
      .icon {
        width: 20px;
        //   border: 1px solid red;
        height: 20px;
        vertical-align: middle;
        margin-top: -5px;
        color: red;
      }
    }
    .operation-right {
      // border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;

      color: #fb7299;
      .icon {
        margin-top: 1px;
        margin-right: 1px;
      }
      .is-followed {
        color: #999;
      }
    }
  }
}
</style>
