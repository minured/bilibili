<template>
  <div class="page">
    <p class="title">热搜</p>
    <ul class="hotspot-list">
      <li class="hotspot-item" v-for="(item, i) in hotSpotData" :key="i" @click="$emit('hotSpotClick', item)">
        <span :class="{'bolder': i < 4, 'last': i===9}" class="num">{{ i + 1 }}</span>
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "hotSpot",
  data() {
    return {
      // 添加一个字段， 表示前面四个热点
      // 或者通过下标判断 前面四个热点
      hotSpotData: [
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
        "饿了么紧急官宣",
      ],
      isBolder: true
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

// 加重热点
.bolder {
    font-weight: bolder;
    color: #212121 !important;
}
// 最后一个热点-对齐
.last {
    color: red;
    margin-left: -4px;
    margin-right: 4px !important;
}
.page {
    padding: 0 10px;
}
.title {
  margin: 0;
  font-size: 14px;
  padding: 5px 5px 0 5px;
  font-weight: bolder;
}
ul.hotspot-list {
  font-size: 14px;
  padding: 5px 5px 5px 8px;
//   border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li.hotspot-item {
    // border: 1px solid red;
    width: 40vw;
    margin: 5px 0;
    span.num {
        margin-right: 8px; 
        font-weight: bold;
        color: #999;
    }
  }
}
</style>
