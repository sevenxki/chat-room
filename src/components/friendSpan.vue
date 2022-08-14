<template>
  <!-- 这里的div是与layrigRight根节点相同的 -->
  <transition appear name="bigmove">
    <div v-if="moveIf" class="layrig_right_friend" key="one">
      <div class="friend_span">
        <div v-if="name != ''" class="friSpan">
          <transition appear name="move" mode="out-in">
            <div v-if="move == true" key="one">
              <div class="friSpan_img">
                <img :src="headimg" alt="" />
              </div>
              <div class="friSpan_name">
                {{ name }} <span :class="whatsex"></span>
              </div>
              <div class="friSpan_more">
                <div class="nickname">
                  <span class="nick">备注:</span
                  ><input type="text" class="nick_name" />
                </div>
                <div class="phone">
                  <span class="phoneNu">手机号:</span
                  ><span class="phoneNumber">15876705385</span>
                </div>
              </div>
              <a
                href="javascript:;"
                class="enterA"
                @click="changeRecordSpanFirst(id, name)"
                >进入聊天</a
              >
            </div>
            <div v-else key="two">
              <div class="friSpan_img">
                <img :src="headimg" alt="" />
              </div>
              <div class="friSpan_name">
                {{ name }} <span :class="whatsex"></span>
              </div>
              <div class="friSpan_more">
                <div class="nickname">
                  <span class="nick">备注:</span
                  ><input type="text" class="nick_name" />
                </div>
                <div class="phone">
                  <span class="phoneNu">手机号:</span
                  ><span class="phoneNumber">15876705385</span>
                </div>
              </div>
              <a
                href="javascript:;"
                class="enterA"
                @click="changeRecordSpanFirst(id, name)"
                >进入聊天</a
              >
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- <div v-else  key="two"></div> -->
  </transition>
</template>

<script>
import { mapState } from "vuex";
import currentRecordMixin from "@/store/mixin/currentRecordMixin";
import { list } from "@/mock/services/userList"; //把mock数据的好友列表的list拿出来临时增加好友
export default {
  computed: {
    //从currentFriendSpan里拿数据，渲染当前好友信息面板
    ...mapState("currentFriendSpan", ["name", "headimg", "id", "sex", "move"]),
    //根据性别去判别到底是用男性图标还是女性图标
    whatsex() {
      return this.sex == "man"
        ? "icon iconfont icon-nanxing"
        : "icon iconfont icon-nvxing";
    },
    moveIf() {
      return this.$store.state.moveIf.listmove;
    },
  },

  // 给下面的方法去调用
  mixins: [currentRecordMixin],
  methods: {
    //当你点击进入聊天后，把这个人的id传到changeRecordSpan聊天面板仓库更新成这个人的聊天数据
    //然后用编程时路由导航把路径换掉，进入聊天界面的路由页面
    changeRecordSpanFirst(id, name) {
      this.changeRecordSpan({ id: id, name: name });

      let a = list.some((item) => {
        console.log("bb" + item.id);
        console.log("bb" + id);
        console.log(item.id == id);
        return item.id == id;
      });
      console.log("nimaaaa" + a);
      // 如果所有好友列表有这个人但聊天好友没这个人加一下
      if (!a) {
        //不能把语句写在这里面，我吐了
        list.some((item) => {
          console.log("aa" + item.id);
          console.log("aa" + id);
          console.log(item.id == id);
        });

        //

        // console.log("nimabi")
        list.push({
          id: this.id,
          headimg: this.headimg,
          name: this.name,
          lastcord: "我是新好友",
          time: "9:05",
        });
        // 模拟websocket重新更新好友列表
        setTimeout(() => {
          this.$store.dispatch("userList/GetUserList");
        }, 1000);
      }
      // 详见components的methods方法,这里没有去动朋友圈，也就是搜索框会留在那里
      this.$store.commit("moveIf/SETLISTMOVE", false);
      setTimeout(() => {
        this.$router.push({
          name: "chat",
        });
        setTimeout(() => {
          this.$store.commit("moveIf/SETLISTMOVE", true);
        }, 100);
      }, 500);
    },
  },
};
</script>

<style scoped>
.layrig_right_friend {
  width: 1111px;
  height: 745px;
  margin-top: 3px;
  padding-left: 5px;
}
/* 新的好友详细信息面板 */
.friend_span {
  width: 1110px;
  height: 715px;
  background-color: rgb(245, 245, 245);
  margin: 0px auto 0px;
  border-radius: 20px;
  content: "";
  clear: both;
  display: table;
}
.friSpan {
  width: 70%;
  margin: 150px auto 0px;
}
.friSpan_img {
  text-align: center;
}
.friSpan_name {
  text-align: center;
  font-size: 24px;
  padding-left: 30px;
  /* font-family: "华文琥珀"; */
}
.friSpan_more {
  width: 35%;
  margin: 50px auto 0px;
  font-size: 18px;
  padding-left: 65px;
}
.friSpan_img img {
  width: 130px;
  height: 130px;
  border-radius: 20px;
}
.nick {
  padding-left: 18px;
  display: inline-block;
  margin-right: 5px;
}
.phone {
  margin-top: 15px;
}
.phoneNu {
  display: inline-block;
  margin-right: 5px;
}
.nick_name {
  font-size: 18px;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgb(219, 218, 218);
  border-radius: 8px;
  width: 115px;
}
.nick_name:focus {
  outline: none;
  border: 1px solid #fff;
  background-color: rgb(248, 248, 248);
}
.enterA {
  display: block;
  width: 150px;
  line-height: 60px;
  margin: 150px auto 0px;
  border-radius: 20px;
  background-color: rgb(17, 40, 53);
  border: 1px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  transition: all 0.3s;
}
/* 给按钮加动画 */
.enterA:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.word {
  width: 60%;
  margin: 300px 0px 0px 200px;
  font-size: 28px;
  font-family: "华文琥珀";
}

/* 以下是动画区 */
/* 大div区 */
.bigmove-enter-active {
  animation: bounce-in 3s;
}
@keyframes bounce-in {
  0% {
    transform: translateX(600px);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  50% {
    transform: translateX(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}
.bigmove-leave-to {
  transform: translateX(600px);
  opacity: 0;
}
/* 如果leave的不够快的话就会导致切换路由时同时在框 */
.bigmove-leave-active {
  transition: all 0.45s;
}
/* 面板里面的动画不要搞错了 */
.move-enter {
  transform: translateX(200px);
  opacity: 0;
  position: relative;
}

.move-leave-to {
  transform: translateX(200px);
  opacity: 0;
  position: relative;
}
.move-enter-active {
  transition: all 0.8s;
}
.move-leave-active {
  transition: all 0.7s;
}
</style>