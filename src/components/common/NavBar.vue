<template>
  <div class="navbar">
    <div class="left">
      <img src="@/assets/logo.png" alt=""/>
    </div>
    <div class="middle">
      <van-icon name="search" color="#999" size="4.444vw" />
      <span>刀剑神域</span>
    </div>
    <div class="right">
      <img :src="userImg" alt="" v-if="userImg"/>
      <img src="@/assets/img/userAvatar.jpg" alt="" v-else/>
      <span>下载 App</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['userImg']
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 12.778vw;
  background: white;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      //   border: 1px solid green;
      height: 11.73333vw;
    }
  }
  .middle {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 1.389vw;
    background: #f4f4f4;
    margin: 0 2.778vw;
    height: 5.556vw;
    border-radius: 2.778vw;
    // border: 1px solid red;
    justify-content: flex-start;
    span {
      width: 70%;
      color: #999;
      line-height: 5.556vw;
      font-size: 3.333vw;
      padding-left: 1.389vw;
      //   有待优化
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 6.667vw;
      height: 6.667vw;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      background: #fb7299;
      color: white;
      font-size: 3.333vw;
      line-height: 6.4vw;
      height: 6.4vw;
      padding: 0 2.778vw;
      border-radius: 0.833vw;
      margin: 0 2.778vw;
    }
  }
}
</style>
