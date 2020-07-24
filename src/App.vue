<template>
  <div id="app">
    <!-- 判断路由meta得自定义keepalive，只在需要得页面keepalive -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #f4f4f4;
}
</style>
