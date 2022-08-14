//右边界面区，分为了左边搜索框和右边聊天区
<template>
  <div class="layout_right">
    <div class="layrig_left">
      <leftSearch></leftSearch>
      <router-view name="friendList"></router-view>
    </div>
    <router-view name="layRighRight"></router-view>
  </div>
</template>

<script>
import leftSearch from "@/components/leftSearch";
export default {
  components: {
    leftSearch,
  },
};
</script>

<style scoped>
.layout_right {
  min-width: 500px;
  height: 90%;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
}
.layrig_left {
  width: 280px;
  min-width: 150px;
}
</style>