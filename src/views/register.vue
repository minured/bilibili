<template>
  <div>
    <LoginTop topMiddle="注册bilibili" topRight="登录" toPage="/login">
      <span slot="right" @click="$router.push('/login')">登录</span>
    </LoginTop>
    <!-- 数据应该写在data 用v-for循环出来 -->
    <LoginText
      label="昵称"
      class="nickname login-field"
      placeholder="请输入昵称"
      type=""
      rule="^.{5,16}$"
      @onContentUpdate="(res) => (model.name = res)"
    />
    <LoginText
      label="账号"
      class="username login-field"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @onContentUpdate="(res) => (model.username = res)"
    />
    <LoginText
      label="密码"
      class="password login-field"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @onContentUpdate="(res) => (model.password = res)"
    />
    <LoginBtn @btnClick="onRegisterSubmit">注册</LoginBtn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";

export default {
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onRegisterSubmit() {
      if (this.model.name && this.model.username && this.model.password) {
        const res = await this.$http.post("/register", this.model);
        console.log(res);
        // TODO可能是已存在
        if (res.data.code === 200) {
          this.$toast.success(res.data.msg);

          // 存储账号信息
          window.localStorage.setItem("id", res.data.id);
          window.localStorage.setItem("token", res.data.objtoken);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1000);
        } else {
          this.$toast.success(res.data.msg);
        }
      } else {
        this.$toast.fail("格式错误,请重新输入");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nickname {
  margin: 2.778vw 0;
}
</style>
