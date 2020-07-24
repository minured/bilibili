<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="相关推荐">内容 1</van-tab>
      <van-tab title="评论6645">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
        }
    }
};
</script>

<style></style>
