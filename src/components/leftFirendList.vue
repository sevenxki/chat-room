//朋友列表
<template>
  <transition appear name="bigmove">
    <div v-if="moveIf" class="left_firendList" key="one">
      <ul class="firend_ul">
        <!-- 每个li都是一个区域 -->
        <!-- v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave" -->
        <!-- 真正要渲染的div -->
        <transition-group name="list-complete" tag="p">
          <li
            class="friend_li"
            v-for="item in userList"
            :key="item.id"
            @click="changeRecordSpan({ id: item.id, name: item.name })"
            style="transition: all 2s"
            @click.right.prevent="friendList_rightClick($event)"
          >
            <a href="javascript:;">
              <div class="li_outter">
                <!-- 个人头像 -->
                <div class="li_left">
                  <img :src="item.headimg" alt="" />
                </div>
                <div class="li_right">
                  <!-- 名字与最后的聊天记录 -->
                  <div class="li_text">
                    <div class="liname">{{ item.name }}</div>
                    <div class="lirecord">{{ item.lastcord }}</div>
                  </div>
                  <!-- 时间 -->
                  <div class="litime">
                    <div class="li_time">{{ item.time }}</div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </transition-group>
      </ul>
      <div v-if="isShow_rightClick" class="fl_rightClick" :style="{'left':mouse.left+'px','top':mouse.top+'px'}">
      <div @click="rightClick_dingZhi">置顶</div>
      <div @click="rightClick_laHei">拉黑好友</div>
      <div @click="rightClick_deleteFriend">删除好友</div>
      <div @click="rightClick_deleteRecord">删除聊天记录</div>
    </div>
    </div>
  </transition>
</template>

<script>
//相关显示用户列表和click封装到了仓库中
import userListMixin from "@/store/mixin/userListMixin";
import currentRecordMixin from "@/store/mixin/currentRecordMixin";
import Velocity from "velocity-animate";

export default {
  data(){
    return{
      isShow_rightClick: false, //弹出选择菜单
      mouse: {
        left: 0,
        top: 0
      },
    }
  },
  mixins: [userListMixin, currentRecordMixin],
  //在开始时就调用获取所有用户列表，调用位置为leftFriendList.vue
  beforeCreate() {
    this.$store.dispatch("userList/GetUserList");
  },
  computed: {
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },
  // 写的一些钩子函数现在没用了
  // methods: {
  //   beforeEnter: function (el) {

  //   },
  //   enter: function (el, done) {
  //     Velocity(
  //         el,
  //         { opacity: 1, translateX:'70px' },
  //         { duration: 2000 },
  //         { easing: "easeInSine" }
  //     );

  //     Velocity(
  //         el,
  //         { opacity: 1, translateX:'0px' },

  //         { duration: 2000 },
  //         { complete: done }
  //       )
  methods:{
    //获取鼠标右击位置
    friendList_rightClick(e) {
      this.mouse.left = e.pageX;
      this.mouse.top = e.pageY;
      this.isShow_rightClick = true;
      document.addEventListener("click", () => {
        this.isShow_rightClick = false;
      });
    },
    rightClick_deleteRecord(){

    },
    rightClick_deleteFriend(){

    },
    rightClick_laHei(){

    },
    rightClick_dingZhi(){

    },
  }

  //   },
  //   leave: function (el, done) {

  //   }
  // }
  // 在currentRecordMixin里调用了
  //  methods:{
  //       // changeRecordSpan(id){
  //       //   this.$store.dispatch("currentRecord/SetRecordSpan",id);
  //       // }
  //       //点击不同人物跳转到不同聊天窗口，调用位置为leftFirendList.vue的click事件
  //       ...mapActions('currentRecord',{changeRecordSpan:'SetRecordSpan'})
  //   }

  //在userListMixin里调用了
  // computed: {
  //         ...mapGetters('userList',['userList']),//调用位置为leftFriendList.vue的列表渲染
  //         // userList:{
  //         //   this.$store.getters['userList/userList']
  //         // }

  //       },
};
</script>

<style scoped>
@import "$/assets/iconfont/iconfont.css";
/* ---朋友列表栏列表开始--- */
/* 朋友列表 */
.left_firendList {
  overflow: auto;
  height: 650px;
  scrollbar-width: none;
}
/* 每个li方块 */
.friend_li {
  height: 60px;
  width: 255px;
  background-color: rgb(235, 234, 240);
  content: "";
  display: table;
  clear: both;
  border-radius: 18px;
  margin: 4px auto 0px;
}
/* li方框被悬浮时 */
.friend_li:hover {
  background-color: rgb(220, 219, 224);
}
/* 让a标签撑满 */
.friend_li a {
  width: 100%;
  height: 60px;
  display: block;
}
/* 方框里面再弄个方框为了flex布局 */
.li_outter {
  height: 100%;
  width: 90%;
  margin: 8px auto 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
/* 方框里的方框左边即头像 */
.li_left {
  height: 45px;
  width: 45px;

  background-size: 45px;
  border-radius: 13px;
}
.li_left img {
  height: 45px;
  width: 45px;
  border-radius: 13px;
}
/* 右边 */
.li_right {
  display: flex;
  flex-direction: row;
  margin-left: 8px;
  width: 80%;
  align-items: center;
  justify-content: space-between;
}
/* 名字 */
.liname {
  font-size: 19px;
  font-weight: 400;
  color: black;
}
/* 最后一条聊天记录 */
.lirecord {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 130px;
  font-size: 12px;
}
/* 最后一条发送时间 */
.li_time {
  font-size: 15px;
}
/* ---朋友列表栏列表结束--- */

/* 朋友列表右键弹窗 */
.fl_rightClick {
  position: absolute;
  background: white;
  box-shadow: 1px 1px 4px #888;
  font-size: 15px;
  border-radius: 8px;
  z-index: 999;
}
.fl_rightClick > div {
  padding: 15px 20px;
  cursor: pointer;
}
.fl_rightClick > div:hover {
  background-color: rgb(236, 236, 236);
}
/* ----右侧朋友列表全部结束---- */
/* 大div动画部分 */
.bigmove-enter {
  transform: translateY(320px);
  opacity: 0;
}
.bigmove-leave-to {
  transform: translateY(320px);
  opacity: 0;
}
.bigmove-enter-active {
  animation: bounce-in 1.5s;
}
.bigmove-leave-active {
  transition: all 0.6s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(320px);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}
/* 以下是列表部分 */
.list-complete-enter {
  opacity: 0;
  transform: translateX(-120px);
}
.list-complete-leave-to {
  opacity: 0;
  transform: translate(10px, -3px);
}
/* //写了下面两个就一定会折叠无解的 */
.list-complete-leave-active {
  position: absolute;
}

.list-complete-move {
  transition: transform 1s;
}
/* 虽然我也不知道为什么要写在li上效果会比较好 */
</style>


