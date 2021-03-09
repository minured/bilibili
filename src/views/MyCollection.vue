<template>
  <div class="page" v-if="collections">
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" fixed />
    <div class="head">
      <div class="left-image">
        <img :src="collections[0].cover" alt="cover" />
      </div>

      <div class="right-info">
        <div class="title">默认收藏夹</div>
        <div class="author" v-if="nickname">创建者： {{ nickname }}</div>
      </div>
    </div>
    <div class="count">{{ collections.length }}个内容</div>

    <div class="content" v-for="item in collections" :key="item.videoId">
      <CollectionItem :video="item" @menuClick="onMenuClick" />
    </div>

    <!-- 取消面板 -->
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      @select="onRemoveVideo"
      close-on-click-action
      cancel-text="取消"
      :round="false"
    />
  </div>
</template>
<script>
import CollectionItem from "@/components/CollectionItem";
import { myCollections, userInfo, removeCollection } from "@/../http";

export default {
  name: "myCollection",
  data() {
    return {
      showActionSheet: false,
      nickname: undefined,
      collections: null,
      removeVideoId: undefined,
      actions: [{ name: "取消收藏" }],
    };
  },
  components: {
    CollectionItem,
  },
  methods: {
    async onRemoveVideo() {
      console.log(this.removeVideoId);
      const res = await removeCollection(this.removeVideoId);
      console.log(res.data);
      if (res.data.status === 200) {
        this.getCollections();
      }
    },
    onMenuClick(videoId) {
      this.showActionSheet = true;
      this.removeVideoId = videoId;
    },
    onClickLeft() {
      this.$router.back();
    },
    async getUserInfo() {
      const res = await userInfo(localStorage.getItem("username"));
      this.nickname = res.data.nickname;
    },
    async getCollections() {
      const res = await myCollections();
      console.log(res.data);
      if (res.data.status === 200) {
        this.collections = res.data.result;
      }
    },
  },
  created() {
    this.getUserInfo();
    this.getCollections();
  },
};
</script>
<style lang="scss" scoped>
.page {
  font-size: 14px;
  color: #212121;
}

div.head {
  margin-top: 50px;
  padding: 10px 15px;
  background: white;
  //   border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  div.left-image {
    flex: 2;
    display: flex;
    height: 100%;
    img {
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 4px;
      //   border: 1px solid red;
    }
    padding-right: 10px;
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
      font-weight: bold;
    }

    div.author {
      color: #aaa;
      font-size: 12px;
    }
  }
}
div.count {
  background: white;
  font-size: 12px;
  color: #aaa;
  padding: 0 15px 10px 15px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}
.content {
  padding: 0 15px;
  margin-top: 10px;
}
</style>
