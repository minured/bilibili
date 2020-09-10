<template>
  <div>
    <SearchInput :keyword="keyword"/>
    <!-- 通过$event 接收到传入的参数 -->
    <HotSpot @hotSpotClick="onHotSpotClick($event)"/>


    <hr />
    <p>搜索历史</p>
    
    <p>搜索发现</p>
    
  </div>
</template>

<script>
import SearchInput from "@/components/search/SearchInput";
import HotSpot from "@/components/search/HotSpot"

export default {
  name: "search",
  components: {
    SearchInput,
    HotSpot
  },
  data() {
      return {
          keyword: ""
      }
  },
  methods: {
      onHotSpotClick(item) {
          this.keyword = item
      }
  }
};
</script>

<style></style>
