<template>
  <div class="layrig_right">
    <recordName></recordName>
    <recordSpan></recordSpan>
    <writeSpan></writeSpan>
  </div>
</template>

<script>
import recordName from "../components/recordName";
import recordSpan from "../components/recordSpan";
import writeSpan from "../components/writeSpan";
export default {
  components: {
    recordName,
    recordSpan,
    writeSpan,
  },
};
</script>

<style scoped>
.layrig_right {
  width: 1111px;
  height: 745px;
  margin-top: 3px;
}
</style>