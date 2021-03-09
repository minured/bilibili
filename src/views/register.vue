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
      inputType="nickname"
      rule="^.{2,10}$"
      @onContentUpdate="(res) => (model.nickname = res)"
    />
    <LoginText
      label="账号"
      class="username login-field"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      inputType ="username"
      type="number"
      @onContentUpdate="(res) => (model.username = res)"
    />
    <LoginText
      label="密码"
      class="password login-field"
      placeholder="请输入密码"
      type="password"
      inputType="password"
      rule="^.{6,16}$"
      @onContentUpdate="(res) => (model.password = res)"
    />
    <LoginBtn @btnClick="onRegisterSubmit">注册</LoginBtn>
  </div>
</template>

<script>
import LoginTop from "@/components/login/LoginTop";
import LoginText from "@/components/login/LoginText";
import LoginBtn from "@/components/login/LoginBtn";
import { register } from "@/../http";

export default {
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  data() {
    return {
      model: {
        nickname: undefined,
        username: undefined,
        password: undefined,
        inputTips: undefined,
      },
    };
  },
  methods: {
    async onRegisterSubmit() {
      if (this.model.nickname && this.model.username && this.model.password) {
        const res = await register(this.model);
        if (res.data.status === 200) {
          this.$toast.success(res.data.message);
          // 存储账号信息
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 800);
        } else {
          this.$toast.fail(res.data.message);
        }
      } else {
        console.log(this.$store.state.inputTips);
        if (this.$store.state.inputTips) {
          this.$toast.fail(this.$store.state.inputTips);
        } else {
          this.$toast.fail("输入错误");
        }
      }
    },
  },

  mounted() {
    // console.log("mounted");
  },
};
</script>

<style scoped lang="scss">
.nickname {
  margin: 2.778vw 0;
}
</style>
