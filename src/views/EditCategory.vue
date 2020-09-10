<template>
  <div class="page">
    <div class="navbar-wrapper">
      <NavBar :userInfo="userInfo" />
    </div>
    <div class="edit-category">
      <p class="title">自定义首页栏目</p>
      <van-divider>现有栏目</van-divider>
      <!-- TODO 事件委托 -->
      <div class="selected-list category-list">
        <span
          v-for="(item, i) in category"
          :key="i"
          @click="selectedItemClick(i)"
          >{{ item.title }}</span
        >
      </div>
      <van-divider>未选择栏目</van-divider>
      <div class="remove-list category-list">
        <span
          v-for="(item, i) in removedList"
          :key="i"
          @click="removedItemClick(i)"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="back-btn" @click="onBackClick">返回</div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";

export default {
  data() {
    return {
      category: [],
      removedList: [],
      userInfo: null,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    onBackClick(){
      console.log("back");
      this.$router.back()
    },
    removedItemClick(index) {
      const removed = this.removedList.splice(index, 1);
      this.category.push(...removed);
    },
    selectedItemClick(index) {
      if (this.category.length < 2) {
        this.$toast.fail("请至少保留一个栏目");
        return;
      }
      const removed = this.category.splice(index, 1);
      this.removedList.push(...removed);
    },
    async initCategory() {
      const res = await this.$http.get("/category");
      this.category = res.data;
    },
    getCategory() {
      if (
        localStorage.getItem("category") &&
        localStorage.getItem("removedList")
      ) {
        this.category = JSON.parse(localStorage.getItem("category"));
        this.removedList = JSON.parse(localStorage.getItem("removedList"));
        return;
      }
      this.initCategory();
    },
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.userInfo = res.data[0];
    },
  },
  created() {
    this.getCategory();
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      this.getUserInfo();
    }
  },
  watch: {
    category() {
      localStorage.setItem("category", JSON.stringify(this.category));
    },
    removedList() {
      localStorage.setItem("removedList", JSON.stringify(this.removedList));
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  // border: 1px solid red;
  height: 100vh;
}
.navbar-wrapper {
  margin-bottom: 2.778vw;
}
.edit-category {
  padding: 1.389vw 2.778vw;
  background: white;
  .title {
    color: #666;
    text-align: center;
    font-size: 4.444vw;
  }
  .category-list {
    display: flex;
    flex-wrap: wrap;

    span {
      // box-sizing: border-box;
      width: 20%;
      text-align: center;
      margin: 1.389vw 1.944vw;
      padding: 1.944vw 0vw;
    }
  }
  .selected-list {
    span {
      color: #1a73e8;
      border: 0.278vw solid #1a73e8;
    }
  }
  .remove-list {
    span {
      color: #ee0a24;
      border: 0.278vw solid #ee0a24;
    }
  }
}
.back-btn {
  
  border: 0.278vw solid rgb(251, 114, 153);
  box-shadow: 0 0 0.833vw rgba(0, 0, 0, 0.1);
  margin: 0vw 5.556vw;
  padding: 2.778vw 27.778vw;
  border-radius: 1.389vw;
  display: flex;
  line-height: 5.556vw;
  height: 5.556vw;
  position: relative;
  top: 27.778vw;
  bottom: 0;
  justify-content: center;
}
</style>
