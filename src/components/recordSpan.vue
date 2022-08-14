//聊天面板组件
<template>
  <transition appear name="bigmove" appear-active-class="appear_active">
    <div v-if="moveIf" class="recordpan" key="one">
      <ul class="record_ul" ref="scrollBottom">
        <el-skeleton :loading="skeleton" animated :count="2" :throttle="10000">
          <template slot="template">
            <div class="recordli_left">
              <div class="everycord">
                <div class="left record_img">
                  <el-skeleton-item
                    variant="image"
                    style="width: 50px; height: 50px; border-radius: 10px"
                  />
                </div>
                <div class="record left">
                  <div class="recordname left">
                    <el-skeleton-item variant="h5" style="width: 50px" />
                  </div>
                  <div class="recordtext left">
                    <el-skeleton-item variant="h5" style="width: 200px" />
                  </div>
                </div>
              </div>
            </div>
            <div class="recordli_left">
              <div class="everycord">
                <div class="right record_img">
                  <el-skeleton-item
                    variant="image"
                    style="width: 50px; height: 50px; border-radius: 10px"
                  />
                </div>
                <div class="record right">
                  <div class="recordname right">
                    <el-skeleton-item variant="h5" style="width: 50px" />
                  </div>
                  <div class="recordtext right">
                    <el-skeleton-item
                      variant="div"
                      style="width: 200px; background-color: green"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template>
            <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
            >
              <!-- v-bind:data-index="item.direction"这个会传数据到动画钩子函数那里可以拿到每一条li的dirction -->
              <li
                name="limov"
                class="recordli_left"
                v-for="item in record"
                :key="item.id"
                v-bind:data-index="item.direction"
              >
                <div class="everycord">
                  <!-- 类名的数组写法，确定类的个数，但不确定名字时可以像我这样写 -->
                  <div :class="['record_img', item.direction]">
                    <!-- 类名的判别式，direction是否为left来决定显示哪张照片 -->
                    <img
                      :src="item.direction == 'left' ? anotherHeadImg : userInfo.headimg"
                      alt=""
                    />
                  </div>
                  <div :class="['record', item.direction]">
                    <div :class="['recordname', item.direction]">
                      {{ item.direction == "left" ? anotherName : userInfo.name }}
                    </div>
                    <!-- 类名的对象写法，不确定个数，也不确定有没有时可以这样写，[item.direction]是可计算属性，键是变量时要写成可计算属性，es6 -->
                    <div
                      :class="{
                        recordtext: true,
                        [item.direction]: true,
                        green: item.direction == 'right',
                      }"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                </div>
              </li>
              <!-- 这里key+100是为了避免与上面的key重复，但其实只要上面聊天记录大于100也会报错，但是因为连接后端后并不会有以下代码，所以不用管了 -->
              <li
                v-for="(item, index) in storag"
                :key="index + 1000"
                class="recordli_left"
                v-bind:data-index="item.direction"
              >
                <div class="everycord">
                  <!-- 类名的数组写法，确定类的个数，但不确定名字时可以像我这样写 -->
                  <div :class="['record_img', item.direction]">
                    <!-- 类名的判别式，direction是否为left来决定显示哪张照片 -->
                    <img
                      :src="item.direction == 'left' ? anotherHeadImg : userInfo.headimg"
                      alt=""
                    />
                  </div>
                  <div :class="['record', item.direction]">
                    <div :class="['recordname', item.direction]">
                      {{ item.direction == "left" ? anotherName : userInfo.name }}
                    </div>
                    <!-- 类名的对象写法，不确定个数，也不确定有没有时可以这样写，[item.direction]是可计算属性，键是变量时要写成可计算属性，es6 -->
                    <div
                      :class="{
                        recordtext: true,
                        [item.direction]: true,
                        green: item.direction == 'right',
                      }"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                </div>
              </li>
            </transition-group>
          </template>
        </el-skeleton>
      </ul>
    </div>
  </transition>
</template>

<script>
// 相关数据获取操作封装到了仓库中，因为这里有两边的name和img，所以特别注意mixin时属性名千万不要相同
import currentRecordMixin from "@/store/mixin/currentRecordMixin";
import myselfMixin from "@/store/mixin/myselfMixin";
import localStroageMixin from "@/store/mixin/localStroageMixin";
import Velocity from "velocity-animate";
export default {
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },
  mixins: [currentRecordMixin, myselfMixin, localStroageMixin],
  updated() {
    if(this.$refs.scrollBottom)
        this.$refs.scrollBottom.scrollTop = this.$refs.scrollBottom.scrollHeight; //当你输入后滚动条一直在最下面
  },
  methods: {
    // 因为想要根据方向去判断语句出来的时间所以普通css做不到，必须拿到dataset进行操作,一定要给子类设置transition无论是css还是钩子
    //leave最好用库的，并且会造成leave的元素没有leave的问题，可以让他们displaynone但是不要设置时间就可以
    beforeEnter(el) {
      el.style.opacity = 0;
      if (el.dataset.index == "right")
        el.style.transform = "translate(50px, 0px)";
      else el.style.transform = "translate(-50px, 0px)";
      el.style.transition = "all 0.6s";
    },
    enter(el, done) {
      // el.offsetWidth;
      setTimeout(() => {
        el.style.opacity = 1;
        if (el.dataset.index == "right")
          el.style.transform = "translate(0px, 0px)";
        else el.style.transform = "translate(0px, 0px)";
        done();
      }, 400);
    },
    // beforeLeave(el){
    //   el.style.opacity = 1
    //   el.style.transform = "translate(0px, 0px)";
    // },
    leave(el, done) {
      // el.style.position="positive"
      el.style.transition = "all 1s";
      //不能写setTimeout和任何动画否则会出现难以详细的问题
      // el.style.opacity = 1
      // if(el.dataset.index=='right')
      //   el.style.transform = "translate(-30px, 0px)";
      // else
      //   el.style.transform = "translate(30px, 0px)";
      // done()

      if (el.dataset.index == "right") {
        Velocity(el, { opacity: 0 }, { duration: 100 });
        Velocity(el, { translateX: "5000px" }, { duration: 400 });
        Velocity(el, { display: "none" }, { complete: done });
      } else {
        Velocity(el, { opacity: 0 }, { duration: 100 }); //先透明
        Velocity(el, { translateX: "-5000px" }, { duration: 400 }); //再给我跑的远远的
        Velocity(el, { display: "none" }, { complete: done }); //最后给我消失
      }
    },
  },
  //写到了currentRecordMixin里了
  // computed:{
  //       //computed选项注册了currentRecord的name和record，调用位置为recordSpan.vue和recordName.vue
  //       ...mapState("currentRecord",["anotherName",'record','anotherHeadImg','id'])
  //   },

  //写到了localStroageMixin里了
  // computed:{
  //       storag(){
  //           console.log('storage'+storage.get(this.id))
  //           return this.$store.state.localStroage.newList
  //       }
  //   },
};
</script>

<style scoped>
.recordpan {
  background-color: rgb(245, 245, 245);
  height: 505px;
  width: 1110px;
  border-radius: 20px;
  margin: 5px;

  padding: 15px 0px 0px;
}
.record_ul {
  height: 95%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.record_ul::-webkit-scrollbar {
  width: 0px;
  height: 6px;
  background-color: rgb(129, 128, 127);
  border-radius: 50%;
}

.recordpan {
  background-color: rgb(245, 245, 245);
  height: 505px;
  width: 1110px;
  border-radius: 20px;
  margin: 5px;
}
.recordli_left {
  width: 100%;
  height: 80px;
  /* transition: all 1s; */
  content: "";
  display: table;
  clear: both;
}
.recordli_right {
  width: 100%;
  height: 80px;

  content: "";
  display: table;
  clear: both;
}
.everycord {
  width: 93%;
  margin: 20px auto;
}
.record_img {
  margin: 10px;
}
.record_img img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.record {
  padding-top: 10px;
}
.recordname {
  margin-bottom: 5px;
  font-size: 11px;
  content: "";
}
.recordtext {
  max-width: 400px;
  /* border: 1px solid rgb(235, 234, 240); */
  background-color: rgb(235, 234, 240);
  border-radius: 15px;
  padding: 10px;
  content: "";
  display: table;
  clear: both;
  word-break: break-all;
}
.left {
  float: left;
}
.right {
  float: right;
}
.green {
  background-color: rgb(17, 40, 53, 0.9);
  color: rgb(225, 228, 230);
}

/* 以下是动画部分 */
/* 大div部分 */
.bigmove-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
.bigmove-leave-active {
  transition: all 1.2s;
}
.bigmove-enter-active {
  animation: bounce-in 2s;
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
    transform: translateX(-18px);
  }
  100% {
    transform: translateY(0px);
  }
}
.appear_active {
  animation: bounce-in 3.6s;
}
/* 每一条聊天记录的动画 不过我写了钩子函数所以这个没有什么用了*/
/* .limove-enter {
  opacity: 0;
  transform: translateX(10px);
} */
/* 这个防止离开一开始就渲染 */
/* .limove-leave {
  opacity: 0;
  transform: translateY(50px);
}
.limove-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
//如果给子类设置了transition: all 1s;这里就不用设置，如果没有则要，因为这里开始和结束时间不一样所以要这样同时这个防止离开一开始就渲染
.limove-enter-active {
  transition: all 1.3s;
  position: absolute;
}
.limove-leave-active {
  opacity: 0;

  position: absolute; 
  transition: all 0s;
} */
/* 顺滑过渡一定要这个，但是因为都是尾插入所以根本不用考虑这个 */
/* .limove-move {
  transition: all 1s;
} */
</style>