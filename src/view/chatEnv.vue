<template>
  <transition name="bigmove" appear>
    <div v-if="moveIf" class="chatEnv" key="one">
      朋友圈功能还未完成，敬请期待
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },
};
</script>

<style scoped>
.chatEnv {
  font-size: 28px;
  margin: 12px auto;
  width: 1300px;
  height: 707px;
  text-align: center;
  line-height: 500px;
  border: 2px solid rgb(245, 245, 245);
  border-radius: 15px;
  font-family: "华文琥珀";
  background-color: rgb(245, 245, 245);
}

/* 以下为动画部分 */
.bigmove-leave-to {
  transform: translateX(600px);
  opacity: 0;
}
.bigmove-leave-active {
  transition: all 0.4s;
}
.bigmove-enter-active {
  animation: bounce-in 1.4s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(600px);
    opacity: 0;
  }
  50% {
    transform: translateX(-48px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
  }
}
</style>