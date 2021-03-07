<template>
  <div class="page">
    <div class="navbar-wrapper">
      <NavBar :userInfo="userInfo" />
    </div>
    <div class="video-wrapper" v-if="videoData">
      <VideoPlay :videoData="videoData.video" />
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

    <!-- 所有二级评论的弹出层 -->
    <van-popup
      v-model="$store.state.showAllChildren"
      lock-scroll
      position="bottom"
      :lazy-render="true"
      :close-on-popstate="true"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :style="{ height: '80%' }"
    >
      <!-- 标题 -->
      <div class="comment-head">
        <div class="title">
          评论详情
        </div>
        <div class="closeBtn" @click="$store.commit('loadPopStatus', false)">
          <van-icon name="cross" size="5vw" />
        </div>
      </div>
      <!-- 父评论 -->
      <div class="parent-comment">
        <CommentItem
          :currentComment="getCurrentComment()"
          :zanSelected="commentZan"
          @clickZan="onClickZan"
          :caiSelected="commentCai"
          @clickCai="onClickCai"
          @clickForward="onClickForward"
          @clickReply="onClickReply"
          :zanNum="commentZanNum"
        />
      </div>
      <!-- 递归子评论 -->
      <div class="blanking"></div>
      <div class="nested-comment-wrapper">
        <NestedComment :commentChildren="getCommentChildren()" />
      </div>
    </van-popup>

    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onShareSelect"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import VideoPlay from "@/components/VideoDetail/VideoPlay";
import VideoTitle from "@/components/VideoDetail/VideoTitle";
import VideoOperation from "@/components/VideoDetail/VideoOperation";
import Others from "@/components/VideoDetail/Others";
import NestedComment from "@/components/NestedComment";
import CommentItem from "@/components/CommentItem";
import {
  videoDetail,
  userInfo,
  initLike,
  likeVideo,
  videoCommend,
} from "@/../http";

export default {
  data() {
    return {
      // 分享面板
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],

      // 评论弹出层
      commentZan: false,
      commentCai: false,
      commentZanNum: 2233,
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
    NestedComment,
    CommentItem,
  },
  methods: {
    onShareSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    onClickZan() {
      console.log("click zan");
    },
    onClickCai() {
      console.log("click cai");
    },
    onClickForward() {
      console.log("click forward");
      this.showShare = true;
    },
    onClickReply() {
      console.log("click reply");
    },
    getCurrentComment() {
      const index = this.$store.state.currentCommentIndex;
      if (this.$store.state.commentList) {
        return this.$store.state.commentList[index];
      }
    },
    getCommentChildren() {
      const index = this.$store.state.currentCommentIndex;
      if (
        this.$store.state.commentList &&
        this.$store.state.commentList[index]
      ) {
        return this.$store.state.commentList[index].children;
      }
    },
    testStore() {
      this.$store.commit("increment", 8);
      // console.log(this.$store.state.count);
    },
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
    async follow() {
      if (!this.isLogin()) {
        return;
      }
      this.isFollowed = !this.isFollowed;
    },
    async initCollection() {
      const res = await initLike(this.$route.params.id);
      // console.log(res.data);
      this.collectionSelected = res.data.isLiked;
    },
    async onCollectionClick() {
      if (!this.isLogin()) {
        return;
      }
      console.log("like");
      const res = await likeVideo(this.$route.params.id);
      console.log(res.data);
      this.collectionSelected = res.data.isLiked;
    },
    // TODO
    async initZan() {
      // console.log("点赞状态初始化");
    },
    async onZanClick() {
      this.zanSelected = !this.zanSelected;
    },
    async getUserInfo() {
      const res = await userInfo(localStorage.getItem("username"));
      this.userInfo = res.data;
    },
    async getVideoData() {
      const res = await videoDetail(this.$route.params.id);
      this.videoData = res.data;
      // this.initFollow();
    },
    // van-collapse的折叠行为
    onChange() {
      this.titleWrap = !this.titleWrap;
    },
    download() {
      window.open(this.videoData.video.content);
    },
    async getCommend() {
      // console.log("commend");
      const res = await videoCommend();
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

// 嵌套评论弹出层
.comment-head {
  position: fixed;
  width: 95%;
  display: flex;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  line-height: 20px;
  align-items: center;

  .title {
    font-size: 14px;
    color: #212121;
  }
  .closeBtn {
    // border: 1px solid red;
    padding-top: 2px;
  }
}
.parent-comment {
  margin-top: 36px;
  // border: 1px solid red;
  padding: 10px 20px;
}
.blanking {
  background: #eee;
  height: 6px;
}
.nested-comment-wrapper {
  padding: 5px 30px;
}
</style>
