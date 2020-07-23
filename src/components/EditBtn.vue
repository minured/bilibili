<template>
  <div class="edit-button" :class="{border: hasBorder}" @click="$emit('btnClick')">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ["text", "hasBorder"],
};
</script>

<style lang="scss" scoped>
.edit-button {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.7vw 3.2vw;
  color: #505050;
  font-size: 4vw;
  &.border {
    border-bottom: 1px solid #eee;
  }
}
</style>
