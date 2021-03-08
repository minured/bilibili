<template>
  <div class="userinfo">
    <NavBar :userInfo="model" />
    <div class="banner"></div>
    <UserDetail :userInfo="model" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import UserDetail from "@/components/UserDetail";
import { userInfo } from "@/../http";

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
}
</style>
