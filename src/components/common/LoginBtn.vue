<template>
  <div>
    <div class="btn-wrapper" @click="btnClick">
      <div class="login-btn">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    btnClick() {
      console.log("click");
      this.$emit("btnClick");
    },
  },
};
</script>

<style lang="scss">
.btn-wrapper {
  padding: 4.167vw 2.778vw;
  .login-btn {
    height: 12.5vw;
    background: #ff9db5;
    color: white;
    text-align: center;
    line-height: 12.5vw;
    border-radius: 6.25vw;
    font-size: 4.444vw;
  }
}
</style>
