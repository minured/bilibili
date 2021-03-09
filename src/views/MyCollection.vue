<template>
  <div class="page">
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />
    <div class="head">
      <div class="left-image">
        <img src="@/assets/img/bannerTop.png" alt="cover" />
      </div>

      <div class="right-info">
        <div class="title">默认收藏夹</div>
        <div class="author">创建者： 真红骑士</div>
      </div>
    </div>
    <div class="count">52个内容</div>

    <div class="content">
      <CollectionItem />
    </div>
  </div>
</template>
<script>
import CollectionItem from "@/components/CollectionItem";

export default {
  name: "myCollection",
  data() {
    return {};
  },
  components: {
    CollectionItem,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  font-size: 14px;
  color: #212121;
}

div.head {
  padding: 10px 15px;
  //   background: rgba(0, 0, 0, 0.2);
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
  font-size: 12px;
  color: #aaa;
  padding: 0 15px 5px 15px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}
.content {
  padding: 0 15px;
}
</style>
