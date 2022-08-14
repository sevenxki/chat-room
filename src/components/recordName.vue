// 聊天区顶部名字组件，其实没什么用，但是...可以扩展
<template>
  <transition appear name="bigmove" appear-active-class="appear_active">
    <div v-if="moveIf" class="right_name" key="one">
      <!-- 名字的切换 -->
      <transition name="move">
        <div v-if="move" class="name" key="one">{{ anotherName }}</div>
        <div v-else class="name" key="another">{{ anotherName }}</div>
      </transition>
      <!-- 更多 -->
    <a href="javascript:;"><div class="more" @click="more" id="moreId">...</div></a>
    <div v-show="isMore" class="more_inner" id="moreInnerId">
      <div class="more_top">
        <div class="more_top_head">
          <button>+</button>
          <span>添加</span>
        </div>
        <div class="more_top_head">
          <a href="javascript:;"
          ><img
            class="headimg"
            :src="anotherHeadImg"
            alt="头像"
          /></a>
          <span style="margin-top:5px;">{{ anotherName }}</span>
        </div>
      </div>
      <div class="more_mid">
        <div class="more_mid_item">
          <span>消息免打扰</span>
          <el-switch
            v-model="value"
            active-color="rgb(17, 40, 53)"
            inactive-color="rgb(230, 230, 230)"
            active-value="100"
            inactive-value="0"
          >
          </el-switch>
        </div>
        <div class="more_mid_item">
          <span>置顶聊天</span>
          <el-switch
            v-model="value2"
            active-color="rgb(17, 40, 53)"
            inactive-color="rgb(230, 230, 230)"
            active-value="100"
            inactive-value="0"
          >
          </el-switch>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
//相关名字显示封装到了仓库中
import currentRecordMixin from "@/store/mixin/currentRecordMixin";
export default {
  data(){
    return{
      isMore:false,
      value:false,
      value2:false
    }
  },
  mixins: [currentRecordMixin],
  methods:{
    more(){
      this.isMore=!this.isMore;
      // document.addEventListener("click", () => {
      //   this.isMore = false
      // });
      let that = this;//保留this执行在函数里面用
      let myfunction = function handle(event) {
        if (
          // 如果遍历每一个item，它的id是undefined或者不含有el-popover字符的话那么返回true，只有所有item都为true才会返回true
          //即只有点击方框外的东西时才会满足下面的条件，才会执行visible = false让方框消失
          //event.composedPath()是点击的冒泡路径
          event.composedPath().every((item) => {
            if (item.id == undefined || (item.id.indexOf("moreInnerId") == -1 && item.id.indexOf("moreId") == -1))
              return true;
            else return false;
          })
        ) {
          that.isMore = false;
          document.body.removeEventListener("click", myfunction);//如果方框消失了就解绑
        }
      };
      document.body.addEventListener("click", myfunction);
    }
  },
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  }
};
</script>

<style scoped>
.right_name {
  background-color: rgb(245, 245, 245);
  border: 1px solid rgb(231, 231, 231);
  border-right: 0px;
  height: 20px;
  display: flex;
  flex-direction: row;
  width: 1030px;
  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
  border-radius: 18px;
  margin-left: 5px;
}
.name {
  font-size: 24px;
  font-weight: normal;
}
.more {
  font-size: 24px;
  font-weight: normal;
  padding-bottom: 10px;
}
.more_inner{
  width: 300px;
  height: 685px;
  position: relative;
  top: 312px;
  right: -39px;
  border-radius: 15px;
  box-shadow: 1px 1px 4px #888;
  z-index: 999;
  background-color: white;
}
.more_top{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 25px 20px;
}
.more_top_head{
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  cursor: pointer;
}
.more_top_head button{
  width: 48px;
  height: 48px;
  font-size:40px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
}
.more_top_head button:active{
  background-color: rgb(221, 221, 221)  ;
}
.more_top_head span{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.more_mid{
  border-top: 2px solid rgb(228, 228, 228);
  margin-top: 20px;
}
.more_mid_item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 15px;
  font-size: 18px;
}
.headimg{
  width: 48px;
  overflow: hidden;
  height: 48px;
  border-radius: 13px;
}
/* 以下是动画部分 */
/* 大div动画 */
.bigmove-enter-active {
  animation: bounce-in 1.8s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(600px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
.bigmove-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
.bigmove-leave-active {
  transition: all 1s;
}
/* 里面的名字切换动画 */
.move-enter {
  transform: translateX(40px);
  opacity: 0;
  position: absolute;
}
.move-leave-to {
  transform: translateX(-40px);
  opacity: 0;
  position: absolute;
}
.move-enter-active,
.move-leave-active {
  transition: all 1.5s;
}
/* 初次加载慢一点 */
.appear_active {
  animation: bounce-in 3s;
}
</style>