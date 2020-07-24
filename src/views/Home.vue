<template>
  <div class="page">
    <div class="navbar-wrapper">
      <NavBar :userImg="model.user_img" />
    </div>
    <div class="video-wrapper">
      <van-tabs v-model="active" swipeable animated swipe-threshold="5" sticky>
        <van-tab v-for="(item, i) in category" :title="item.title" :key="i">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="loadMore"
            :immediate-check="false"
            offset="50"
          >
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
import NavBar from "@/components/common/NavBar";
import VideoItem from "@/components/VideoItem";
export default {
  components: {
    NavBar,
    VideoItem,
  },
  data() {
    return {
      model: {},
      category: [],
      active: 0,
    };
  },
  methods: {
    loadMore() {
      const targetItem = this.category[this.active];
      setTimeout(() => {
        targetItem.page += 1;
        this.getContent();
        targetItem.loading = false
      }, 1000);
    },
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async getCategory() {
      const res = await this.$http.get("/category");
      this.category = res.data;
      //   记录获取数量和起始
      this.category.map((item) => {
        this.$set(item, "content", []);
        this.$set(item, "page", 0);
        this.$set(item, "pagesize", 10);
        this.$set(item, "loading", false);
        this.$set(item, "finished", false);
        
      });
      //   获取首页内容
      this.getContent();
    },

    async getContent() {
      const targetItem = this.category[this.active];

      const res = await this.$http.get("/detail/" + targetItem._id, {
        params: {
          page: targetItem.page,
          pagesize: targetItem.pagesize,
        },
      });
      //   新属性添加响应
      //   this.$set(targetItem, "content", res.data);
      targetItem.content.push(...res.data); //可以复用
      if (res.data.length < targetItem.pagesize) {
        targetItem.finished = true;
      }
    },
    onVideoClick(videoId) {
      this.$router.push('/videoDetail/' + videoId)
    },
  },
  mounted() {
    this.getUserInfo();
    this.getCategory();
  },
  watch: {
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
  .video-item-wrapper {
    margin-top: 0.833vw;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
