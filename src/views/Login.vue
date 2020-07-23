<template>
  <div>
    <LoginTop topMiddle="登录bilibili" topRight="注册" toPage="/register">
      <span slot="right" @click="$router.push('/register')">注册</span>
    </LoginTop>
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
    <LoginBtn @btnClick="onRegisterSubmit">登录</LoginBtn>
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
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onRegisterSubmit() {
      if (this.model.username && this.model.password) {
        const res = await this.$http.post("/login", this.model);
        console.log(res);
        if (res.data.code === 200) {
          this.$toast.success(res.data.msg);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1000);
        } else {
          this.$toast.fail(res.data.msg);
        }
      } else {
        this.$toast.fail("格式错误,请重新输入");
      }
    },
  },
};
</script>

<style>
.username {
  margin-top: 2.778vw;
}
</style>
