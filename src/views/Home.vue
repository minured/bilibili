<template>
  <div class="page" v-if="category">
    <div class="navbar-wrapper">
      <NavBar :userInfo="model" />
    </div>
    <div class="video-wrapper">
      <div class="edit-category" @click="editCategory">
        <van-icon name="setting-o" size="5vw" color="#666" />
      </div>
      <van-tabs
        v-model="active"
        swipeable
        animated
        swipe-threshold="4"
        sticky
        :color="biliColor"
      >
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
import NavBar from "@/components/NavBar";
import VideoItem from "@/components/VideoItem";
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
      biliColor: "#fb7299",
    };
  },
  // 钩子函数，keep-alive时，更新数据
  activated() {
    this.getCategory();
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
    }
    this.getCategory();
  },
  methods: {
    loadMore() {
      const targetItem = this.category[this.active];
      setTimeout(() => {
        targetItem.page += 1;
        this.getContent();
        targetItem.loading = false;
        // 加载两遍是因为没有finished=true
      }, 1000);
    },
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async getCategory() {
      // 先获取本地数据
      if (localStorage.getItem("category")) {
        let localCategory = JSON.parse(localStorage.getItem("category"));
        console.log(localCategory);
        this.category = localCategory;
      } else {
        const res = await this.$http.get("/category");
        this.category = res.data;
      }

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
      if (!targetItem) {
        return;
      }
      const res = await this.$http.get("/detail/" + targetItem._id, {
        params: {
          page: targetItem.page,
          pagesize: targetItem.pagesize,
        },
      });
      //   新属性添加响应
      //   this.$set(targetItem, "content", res.data);
      console.log(targetItem);
      targetItem.content.push(...res.data); //可以复用
      if (res.data.length < targetItem.pagesize) {
        targetItem.finished = true;
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
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
    }
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
