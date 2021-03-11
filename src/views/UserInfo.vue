<template>
  <div class="userinfo">
    <NavBar :userInfo="model" />
    <div class="banner"></div>
    <UserDetail :userInfo="model" />
    <div class="tools">
      <div class="tool-item" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lishijilu"></use>
        </svg>
        历史记录
      </div>
      <div class="tool-item" @click="$router.push('/collections')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        我的收藏
      </div>
      <div class="tool-item" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shaohouguankan"></use>
        </svg>
        稍后再看
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import UserDetail from "@/components/userDetail";
import { userInfo } from "@/../http";
import "@/assets/iconfont.js";

export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    UserDetail,
  },
  methods: {
    async userInfoData() {
      const res = await userInfo(localStorage.getItem("id"));

      this.model = res.data;
    },
  },
  created() {
    this.userInfoData();
  },
};
</script>

<style lang="scss" scoped>
.userinfo {
  .banner {
    height: 25vw;
    background: url(../assets/img/bannerTop.png);
    background-size: cover;
    background-position: 50%;
  }
  .tools {
    padding: 4.167vw 4.167vw;
    font-size: 3.333vw;
    // border: 1px solid red;
    margin-top: 8px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .tool-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 6.944vw;
        height: 6.944vw;
        margin-bottom: 0.556vw;
      }
      // border: 1px solid red;
    }
  }
}
</style>
