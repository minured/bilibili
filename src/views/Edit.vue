<template>
  <div v-if="model">
    <div class="navbar-wrapper">
      <NavBar :userImg="model.user_img" />
    </div>
    <editItem label="头像" has-border="true">
      <img :src="model.user_img" alt="" slot="right" />
    </editItem>
    <editItem label="昵称" has-border="true" :rightText="model.name" />
    <editItem label="UID" has-border="true" :rightText="model.username" />
    <editItem label="性别" has-border="true" />
    <editItem label="个性签名" />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import EditItem from "@/components/editItem";

export default {
  components: {
    NavBar,
    EditItem,
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      console.log(res);
      this.model = res.data[0];
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.navbar-wrapper {
  margin-bottom: 10px;
}
</style>
