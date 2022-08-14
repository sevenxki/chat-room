// 打字面板组件
<template>
  <transition appear name="bigmove" mode="out-in">
    <div v-if="moveIf" class="writepan" key="one">
      <!-- 图标层 -->
      <div class="icons">
        <!-- 左侧图标 -->
        <div class="icons_left">
          <a href="javascript:;"
            ><span class="icon iconfont icon-xiaolian"></span
          ></a>
          <a href="javascript:;"
            ><span class="icon iconfont icon-wenjianjia"></span
          ></a>
        </div>
        <!-- 右侧图标 -->
        <div class="icons_right">
          <a href="javascript:;"
            ><span class="icon iconfont icon-yuyin"></span
          ></a>
          <a href="javascript:;"
            ><span class="icon iconfont icon-shipinbofang"></span
          ></a>
        </div>
      </div>
      <!-- 真的写的面板 -->
      <div class="wirte">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="textwrite"
          v-model="input"
          @keyup.enter="send"
        ></textarea>
        <!-- 发送按钮 -->
        <a href="javascript:;">
          <div v-show="id != ''" class="btn" @click="send">发送</div>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import storage from "store";
import currentRecordMixin from "@/store/mixin/currentRecordMixin";
import localStroageMixin from "@/store/mixin/localStroageMixin";
export default {
  data() {
    return {
      input: "",
      i: 0, //语录是哪些
      yulu: ["你好", "我叫李宪栋", "我来自异时空"], //语录
    };
  },
  //写到localStroageMixin里了
  // methods: {
  //       send(){ //触发位置是writeSpan的回车时间或者发送按钮
  //         if(storage.get(this.id)!=null){        //当首页时没有点击好友时，避免输入，一般是在输入框按了回车键,这里可扩展功能与自己对话
  //           //重要的是存在storage里的是字符串数组，这样vue才可以列表渲染，concat是拼数组，强制打平
  //           storage.set(this.id,storage.get(this.id).concat([this.input]))
  //           console.log(storage.get(this.id))
  //           //把更新的本地储存存到store仓库里，这样聊天面板才会更新，本来是没必要这样的,
  //           //但是recordSpan里的computed属性没法检测到storage的变化，所以利用仓库对于recordSpan的计算属性来实现实时更新
  //           this.$store.commit('localStroage/SETNEWLIST',storage.get(this.id))
  //           console.log(this.id)
  //           this.input=""
  //         }
  //         else
  //           storage.set(this.id,[this.input])
  //           this.$store.commit('localStroage/SETNEWLIST',storage.get(this.id))
  //       }
  //     },

  // 本来是想写在localStroageMixin里的，但是updated会同时触发两边的组件更新，在那边的话会更新以后再调用更新，就会自循环了
  //因此建议生命周期操作不要写在Mixin里
  updated() {
    //挂载前都还没有this.id和本地储存,所以要update，在初次加载时即到本地储存里看看有没有数据可以放到store里
    console.log("我执行了");
    this.$store.commit("localStroage/SETNEWLIST", storage.get(this.id));
  },
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },
  mixins: [currentRecordMixin, localStroageMixin],
};
</script>

<style scoped>
/* 书写的方框 */
.writepan {
  height: 103px;
  width: 1100px;
  border-radius: 20px;
  border: 3px solid rgb(245, 245, 245);
  border-right: none;
  border-bottom: none;

  margin: 5px;
}
.icons {
  width: 95%;
  margin: 5px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.icons_left,
.icons_right {
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* textarea */
.textwrite {
  width: 95%;
  height: 53px;
  border: none;
  resize: none;
  cursor: pointer;
  padding-left: 30px;
  padding-top: 5px;
  font-size: 16px;
  scrollbar-width: none;
  word-break: break-all;
}
.textwrite:focus {
  border: none;
  resize: none;
  cursor: pointer;
  outline: none;
  font-size: 16px;
}
/* 发送按钮 */
.btn {
  float: right;
  border: 1px solid rgb(245, 245, 245);
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  font-size: 16px;
  height: 25px;
  width: 50px;
  text-align: center;
}
.btn:hover {
  background-color: rgb(221, 219, 219);
}

/* 以下是动画部分 */
/* 大div部分 */
.bigmove-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
.bigmove-leave-active {
  transition: all 1s;
}
.bigmove-enter-active {
  animation: bounce-in 8s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(120px);
    opacity: 0;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
  }
}
</style>