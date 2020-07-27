<template>
  <div>
    <div class="navbar-wrapper">
      <NavBar :userInfo="userInfo"/>
    </div>
    <div class="edit-category">
      <p class="title">自定义首页栏目</p>
      <van-divider>现有栏目</van-divider>
      <!-- TODO 事件委托 -->
      <div class="selected-list">
        <span
          v-for="(item, i) in category"
          :key="i"
          @click="selectedItemClick(i)"
          >{{ item.title }}</span
        >
      </div>
      <van-divider>未选择栏目</van-divider>
      <div class="remove-list">
        <span
          v-for="(item, i) in removedList"
          :key="i"
          @click="removedItemClick(i)"
          >{{ item.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";

export default {
  data() {
    return {
      category: [],
      removedList: [],
      userInfo: null
    };
  },
  components: {
    NavBar,
  },
  methods: {
    removedItemClick(index) {
      const removed = this.removedList.splice(index, 1);
      this.category.push(...removed);
    },
    selectedItemClick(index) {
        if (this.category.length < 2) {
            this.$toast.fail("请至少保留一个栏目")
            return
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
.navbar-wrapper {
  margin-bottom: 10px;
}
.edit-category {
  padding: 5px 10px;
  background: white;
  .title {
    color: #666;
    text-align: center;
    font-size: 14px;
  }
  .selected-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    span {
      border: 1px solid blue;
      margin-right: 10px;
      padding: 2px 10px;
      line-height: 25px;
      text-align: center;
      margin-bottom: 5px;
    }
  }
  .remove-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    span {
      border: 1px solid red;
      margin-right: 10px;
      padding: 2px 10px;
      line-height: 25px;
      text-align: center;
      margin-bottom: 5px;
    }
  }
}
</style>
