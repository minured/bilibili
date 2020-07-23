<template>
  <!-- 动态添加类，key是类名，value是判断点 -->
  <div class="edit-item" :class="{ border: hasBorder }" @click="$emit('itemClick')">
    <div class="left">{{ label }}</div>
    <div class="right">
      {{ rightText }}
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "hasBorder", "rightText"],
};
</script>

<style lang="scss" scoped>
.edit-item {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.7vw 3.2vw;
  color: #505050;
  font-size: 4vw;
  &.border {
    border-bottom: 1px solid #eee;
  }
  .left {
  }
  .right {
    img {
      width: 12.778vw;
      height: 12.778vw;
      border-radius: 50%;
    }
  }
}
</style>
