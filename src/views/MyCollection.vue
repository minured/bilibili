<template>
  <div>
    <div class="page">
      <van-nav-bar
        title="我的收藏"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
      <!-- 有收藏 -->
      <div v-if="collections">
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
      </div>
      <!-- 没有收藏 -->
      <div v-else class="no-collection">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kong"></use>
        </svg>
        收藏夹空空如也
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
        if (res.data.result.length > 0) {
          this.collections = res.data.result;
        } else {
          // 删除最后一个重置
          this.collections = null;
        }
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
  font-size: 3.889vw;
  color: #333;
}
::v-deep .van-icon-arrow-left {
  color: #333;
}

div.head {
  margin-top: 13.889vw;
  padding: 2.778vw 4.167vw;
  background: white;
  //   border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.222vw;
  div.left-image {
    flex: 2;
    display: flex;
    height: 100%;
    img {
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 1.111vw;
      //   border: 1px solid red;
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
      font-weight: bold;
    }

    div.author {
      color: #aaa;
      font-size: 3.333vw;
    }
  }
}
div.count {
  background: white;
  font-size: 3.333vw;
  color: #aaa;
  padding: 0 4.167vw 2.778vw 4.167vw;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}
.content {
  padding: 0 4.167vw;
  margin-top: 2.778vw;
}

.no-collection {
  margin-top: 100px;
  //   border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3.889vw;
  color: #aaa;
  .icon {
    width: 13.889vw;
    height: 13.889vw;
    margin-bottom: 2.778vw;
  }
}
</style>
