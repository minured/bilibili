<template>
  <div class="video-operation">
    <div class="operation-left">
      <div class="zan" @click="onZanClick">
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
      <div class="download" @click="onDownload">
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
</template>
<script>
export default {
  props: ["zanSelected", "collectionSelected", "isFollowed"],
  methods: {
    onCollectionClick() {
      console.log("collect");
      this.$emit("collectionClick");
    },

    onDownload() {
      console.log("download");
      this.$emit("download");
    },
    follow() {
      console.log("follow");
      this.$emit("follow");
    },
    onZanClick() {
      console.log("zan");
      this.$emit("zanClick");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/iconStyle.scss";
.video-operation {
  // background: rgba(0, 0, 0, 0.2);
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
</style>
