<template>
  <div class="page">
    <div class="navbar-wrapper">
      <NavBar :userImg="model.user_img" />
    </div>
    <div class="video-wrapper">
      <van-tabs v-model="active" swipeable sticky animated> 
        <van-tab v-for="(item, i) in category" :title="item.title" :key="i">
          <div class="video-item-wrapper">
            <video-item
              v-for="(video, i) in item.content"
              :videoInfo="video"
              :key="i"
              class="video-item"
              @videoClick='onVideoClick'
            ></video-item>
          </div>
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
      category: undefined,
      active: 0,
      content: "",
    };
  },
  methods: {
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      //   console.log(res);
    },
    async getCategory() {
      const res = await this.$http.get("/category");
      this.category = res.data;
      //   记录获取数量和起始
      this.category.map((item) => {
        item.page = 0;
        item.pagesize = 10;
      });
      console.log(this.category);
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
      this.$set(targetItem, "content", res.data);
    },
    onVideoClick() {
        console.log('click')
    }
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
.page {
    background: white;
}
.navbar-wrapper {
  margin-bottom: 2.778vw;
}
.video-wrapper {
    
  .video-item-wrapper {
      margin-top: 0.833vw;
      display: flex;
      flex-wrap: wrap;
  }
}
</style>
