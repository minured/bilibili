<template>
  <div>
    <form action="" class="input-form">
      <van-icon name="search" color="#999" size="4.444vw" class="search-icon" />
      <input type="text" placeholder="刀剑神域" v-model="keyword"/>
      <span class="cancel" @click="$router.back()">取消</span>
    </form>
  </div>
</template>

<script>
export default {
  name: "searchInput",
  props: {
    keyword: String
  }
};
</script>

<style lang="scss" scoped>
.input-form {
  background: rgb(250, 114, 152);
  display: flex;
  justify-content: space-between;
  padding: 2.222vw 4.167vw;
  font-size: 3.889vw;

  .search-icon {
    position: absolute;
    top: 3.889vw;
    left: 6.944vw;
  }
  input {
    border: none;
    flex: 1;
    margin-right: 4.167vw;
    line-height: 6.667vw;
    border-radius: 3.333vw;
    padding-left: 11.111vw;
  }
  //   修改placeholder 颜色，各浏览器不同
  input::-webkit-input-placeholder {
    color: #999;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #999;
  }

  .cancel {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
