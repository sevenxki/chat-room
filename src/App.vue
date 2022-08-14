<template>
<!-- 这里加的过渡在index/chat/record下刷新会效果不好哦 -->
  <div id="app">
    <!-- 缓存路由 -->
    <!-- 是否keep-alive决定了退出登录再进入时是否有动画 -->
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  
}
</script>


<style>
</style>