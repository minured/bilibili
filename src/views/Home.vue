<template>
  <div class="page" v-if="category">
    <div class="navbar-wrapper">
      <NavBar :userInfo="model" />
    </div>
    <!-- 视频列表 -->
    <div class="video-wrapper">
      <!-- 编辑按钮 -->
      <div class="edit-category" @click="editCategory">
        <van-icon name="setting-o" size="5vw" color="#666" />
      </div>

      <!-- 滑动切换 -->
      <van-tabs
        v-model="active"
        swipeable
        animated
        swipe-threshold="4"
        sticky
        :color="biliColor"
      >
        <van-tab v-for="(item, i) in category" :title="item.name" :key="i">
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="loadMore"
            :immediate-check="false"
            offset="10"
          >
            <!-- 单个视频项 -->
            <div class="video-item-wrapper">
              <video-item
                v-for="(video, index) in item.content"
                :videoInfo="video"
                :key="index"
                class="video-item"
                @videoClick="onVideoClick"
              ></video-item>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import VideoItem from "@/components/VideoItem";
import { userInfo, category, videoList } from "@/../http";
export default {
  components: {
    NavBar,
    VideoItem,
  },
  data() {
    return {
      model: null,
      category: [],
      active: 0,
      loading: false,
      biliColor: "#fb7299",
    };
  },
  // 钩子函数，keep-alive时，更新数据
  activated() {
    this.getCategory();
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      this.getUserInfo();
    }
  },
  methods: {
    // 下滑加载
    loadMore() {

      // 多列表自定义的loading 和 vant 内置的全局loading不一样
      const targetItem = this.category[this.active];
      // 模拟加载
      setTimeout(() => {
        targetItem.sliceIndex += 10;
        if (targetItem.sliceIndex > targetItem.contentLength) {
          targetItem.sliceIndex = targetItem.contentLength;
          targetItem.finished = true;
        }
        targetItem.content = targetItem.allContent.slice(
          0,
          targetItem.sliceIndex
        );
        this.loading = false;
      }, 1000);
    },
    // 用户信息，navbar使用
    async getUserInfo() {
      const res = await userInfo(localStorage.getItem("username"));
      this.model = res.data;
    },
    async getCategory() {
      // 先获取本地数据
      if (localStorage.getItem("category")) {
        let localCategory = JSON.parse(localStorage.getItem("category"));
        this.category = localCategory;
      } else {
        const res = await category();
        this.category = res.data.category;
      }

      // 给每个分类添加记录视频内容的字段 content
      this.category.forEach((item) => {
        this.$set(item, "content", []),
          this.$set(item, "allContent", []),
          this.$set(item, "sliceIndex", 10),
          this.$set(item, "finished", false),
          this.$set(item, "loading", false),
          this.$set(item, "contentLength", undefined);
        this.$set(item, "allContentDone", false);
      });

      // 首次加载获取首页
      this.getContent();
    },

    async getContent() {
      const targetItem = this.category[this.active];
      if (!targetItem) {
        return;
      }
      // 加载完后不再加载
      if (targetItem.finished) {
        return;
      }

      if (targetItem.allContentDone) {
        return;
      }

      const res = await videoList(targetItem.id);
      targetItem.content.push(
        ...res.data.videos.slice(0, targetItem.sliceIndex)
      );
      targetItem.allContent.push(...res.data.videos);
      targetItem.contentLength = res.data.videos.length;

      // 当前分类下内容已全部加载并放入allContent，后续不需要请求
      if (res.data.status === 200) {
        targetItem.allContentDone = true;
      }
    },
    onVideoClick(videoId) {
      this.$router.push("/videoDetail/" + videoId);
    },
    editCategory() {
      this.$router.push("/editcategory");
    },
  },
  mounted() {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      this.getUserInfo();
    }
    this.getCategory();
  },
  watch: {
    // 监听当前展示的tab
    active() {
      this.getContent();
    },
  },
};
</script>

<style lang="scss" scoped>
.item-status {
  position: fixed;
  border: 1px solid red;
  left: 0;
  top: 0;
  z-index: 8;
}
.page {
  background: white;
}
.navbar-wrapper {
}
.video-wrapper {
  position: relative;
  .video-item-wrapper {
    margin-top: 0.833vw;
    display: flex;
    flex-wrap: wrap;
  }
  .edit-category {
    // border: 1px solid red;
    width: 9.722vw;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
  }
}
</style>
