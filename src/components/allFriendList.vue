//这个面板是新加的所有好友面板
<template>
  <transition appear name="bigmove">
    <div v-if="moveIf" class="left_firendList_friend" key="one">
      <ul class="firend_ul_friend">
        <!-- 每个li都是一个区域，逻辑处理部分可以参考recordSpan组件，把仓库的数据拿过来渲染罢了 -->
        <transition-group
          name="list-complete"
          tag="p"
          enter-active-class=" animate__animated animate__fadeInUp"
          leave-active-class=" animate__animated animate__fadeOut"
        >
          <li
            :class="{ friend_li_friend: true, zimu: item.texttype == 'zimu' }"
            v-for="(item, index) in friendList"
            :key="index"
          >
            <!-- 本来是想用vue的动态参数的，但不知道为啥用不了，只能现在很不优雅的只是为了经过字母的气泡时不会改变鼠标样式 -->
            <a v-if="item.texttype == 'zimu'">
              <div class="li_outter_friend">
                <div v-if="item.texttype != 'zimu'" class="li_left_friend">
                  <img :src="item.img" alt="" />
                </div>
                <div class="li_right_friend">
                  <div class="li_text_friend">
                    <div class="liname_friend">{{ item.text }}</div>
                  </div>
                </div>
              </div>
            </a>
            <!-- 点击不同的好友跳到对应好友详细面板 -->
            <a v-else href="javascript:;" @click="changeFriendSpan(item)">
              <div class="li_outter_friend">
                <div v-if="item.texttype != 'zimu'" class="li_left_friend">
                  <img :src="item.img" alt="" />
                </div>
                <div class="li_right_friend">
                  <div class="li_text_friend">
                    <div class="liname_friend">{{ item.text }}</div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </transition-group>
      </ul>
    </div>
    <!-- <div v-else class="left_firendList_friend" key="two"></div> 初代写法，当时想法不够成熟，这样会导致动画速度慢很多-->
  </transition>
</template>

<script>
import allFriendMixin from "@/store/mixin/allFriendMixin";
import { mapMutations } from "vuex";
export default {
  mixins: [allFriendMixin],
  // 第一次挂载时去把所有好友信息拿到
  beforeMount() {
    this.$store.dispatch("allFriend/getAllFriend");
  },
  methods: {
    // <!-- 点击不同的好友跳到对应好友详细面板 -->，提交方法写到了currentFriendSpan方法里，因为没写mixin文件所以直接用了
    ...mapMutations("currentFriendSpan", { changeFriendSpan: "SETFRIEND" }),
  },
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },
  //拿到所有好友信息，在allFriendMixin.js里
  // computed:{
  //     ...mapGetters("allFriend",["friendList"])
  // },
};
</script>

<style scoped>
.left_firendList_friend {
  overflow: auto;
  height: 650px;
  scrollbar-width: none;
}
/* 每个li方块 */
.friend_li_friend {
  height: 50px;
  width: 255px;
  background-color: rgb(235, 234, 240);
  content: "";
  display: table;
  clear: both;
  border-radius: 18px;
  margin: 4px auto 0px;
  padding-top: 10px;
}
/* li方框被悬浮时 */
.friend_li_friend:hover {
  background-color: rgb(220, 219, 224);
}
/* 让a标签撑满 */
.friend_li_friend a {
  width: 100%;
  height: 80%;
  display: block;
}
.li_left_friend img {
  height: 50px;
  width: 50px;
}
/* 方框里面再弄个方框为了flex布局 */
.li_outter_friend {
  height: 100%;
  width: 90%;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}
/* 方框里的方框左边即头像 */
.li_left_friend {
  height: 45px;
  width: 45px;

  background-size: 45px;
  border-radius: 13px;
}
.li_left_friend img {
  height: 45px;
  width: 45px;
  border-radius: 13px;
}
/* 右边 */
.li_right_friend {
  display: flex;
  flex-direction: row;
  margin-left: 8px;
  width: 80%;
  align-items: center;
  justify-content: space-between;
}
/* 名字 */
.liname_friend {
  font-size: 19px;
  font-weight: 500;
  color: black;
}
.zimu {
  font-size: 10px;
  height: 15px !important;
  border-radius: 15px;
  padding-top: 0px;
}
.zimu:hover {
  background-color: rgb(235, 234, 240);
}

/* //写了下面两个就一定会折叠无解的 */

/* 下面是动画部分 */
/* 大div动画 */
.bigmove-leave-to {
  transform: translateY(520px);
  opacity: 0;
}
.bigmove-enter-active {
  animation: bounce-in 1.5s;
}
.bigmove-leave-active {
  transition: all 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(320px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  55% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}
/* 下面是列表渲染部分，主要是为了查询时的动画，进场动画已经给大div渲染了,但是move经常会使得动画不可控要注意，好处是有变化时动画挺好看 */
/* 还用了animate.css的动画 */
.list-complete-leave-active {
  position: absolute;
}
.list-complete-move {
  transition: transform 1s;
}
</style>