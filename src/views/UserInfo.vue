<template>
  <div class="userinfo">
    <NavBar :userInfo="model" />
    <div class="banner"></div>
    <UserDetail :user-data="model" />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import UserDetail from "@/components/userDetail";
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
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      console.log(res);
      this.model = res.data[0];
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
