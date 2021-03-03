<template>
  <div class="page">
    <div class="navbar-wrapper">
      <NavBar :userInfo="userInfo" />
    </div>
    <button @click="pop">弹出</button>
    <div class="video-wrapper" v-if="videoData">
      <VideoPlay :videoData="videoData" />
      <VideoTitle :videoData="videoData" @onChange="onChange" />
      <VideoOperation
        :zanSelected="zanSelected"
        @collectionClick="onCollectionClick"
        :collectionSelected="collectionSelected"
        :isFollowed="isFollowed"
        @download="download"
        @follow="follow"
        @zanClick="onZanClick"
      />
    </div>

    <!-- 推荐和评论 -->
    <Others :commendData="commendData" :userInfo="userInfo" />
    <van-popup
      v-model="showAllChildren"
      lock-scroll
      position="bottom"
      lazy-render
      :close-on-popstate="true"
      :closeable="true"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0)' }"
    >
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
      <p>wdadwd</p>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import VideoPlay from "@/components/VideoDetail/VideoPlay";
import VideoTitle from "@/components/VideoDetail/VideoTitle";
import VideoOperation from "@/components/VideoDetail/VideoOperation";
import Others from "@/components/VideoDetail/Others";
export default {
  data() {
    return {
      showAllChildren: false,
      videoData: null,
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
    VideoPlay,
    VideoTitle,
    VideoOperation,
    Others,
  },
  methods: {
    pop() {
      this.showAllChildren = true;
    },
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
    // TODO
    async initZan() {
      console.log("点赞状态初始化");
    },
    async onZanClick() {
      this.zanSelected = !this.zanSelected;
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

    // van-collapse的折叠行为
    onChange() {
      this.titleWrap = !this.titleWrap;
    },
    download() {
      window.open(this.videoData.content);
    },
    async getCommend() {
      const res = await this.$http.get("/commend");
      this.commendData = res.data;
    },
  },
  created() {
    this.getVideoData();
    this.getCommend();
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
      this.initCollection();
    }
  },
  watch: {
    $route() {
      this.getVideoData();
      this.getCommend();
      this.initCollection();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: white;
}
.video-wrapper {
  // background: rgba($color: #000000, $alpha: 0.2);
}
</style>
