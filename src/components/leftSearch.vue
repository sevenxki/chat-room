//搜索组件
<template>
  <transition appear name="bigmove" appear-active-class="appear_active">
    <div v-if="moveIfSear" class="left_search" key="one">
      <!-- 搜索框 -->
      <div class="search_outter">
        <!-- 搜索框本身 -->
        <div class="search_left">
          <div class="search_icon_left">
            <span class="icon iconfont icon-sousuo"></span>
          </div>
          <input
            class="sear_text"
            type="text"
            v-model="searname"
            placeholder="搜索"
            @keyup="
              debouncedsearch(searname);
              debouncedsearchFriend(searname);
            "
          />
        </div>
        <!-- 添加好友按钮 -->
        <div class="search_right">
          <div class="search_icon_right">
            <a href="javascript:;"
              ><span
                class="icon iconfont icon-jiahao"
                @click="dialogVisible = true"
              ></span
            ></a>
          </div>

          <!-- 以下部分为魔改element组件部分，add开头的类名都是新加的样式可以在本组件找到css，否则css在其他组件.vue的style部分基本实现了响应式-->
          <!-- 添加好友框 -->
          <el-dialog title="添加好友" :visible.sync="dialogVisible" width="50%">
            <!-- 不瞒你说，好友搜索部分搜索框直接拿过来改了样式 -->
            <div class="search_left addsearch_left">
              <div class="search_icon_left addsearch_icon_left">
                <span class="icon iconfont icon-sousuo"></span>
              </div>
              <input
                class="sear_text addsear_text"
                type="text"
                v-model="searall"
                placeholder="搜索用户名"
                @keyup="debouncedsearchAll(searall)"
              />
            </div>
            <div class="left_firendList addleft_firendList">
              <ul class="firend_ul addleft_firendList">
                <!-- 每个li都是一个区域 -->
                <el-skeleton :loading="skeleton" animated :throttle="500">
                  <template slot="template">
                    <div style="text-align: center">
                      <el-skeleton-item
                        variant="h5"
                        style="width: 200px; height: 3px; margin: 0 auto"
                      />{{ searchOrNO
                      }}<el-skeleton-item
                        variant="h5"
                        style="width: 200px; height: 3px; margin: 0 auto"
                      />
                    </div>
                  </template>
                  <template>
                    <transition-group name="limove">
                      <li
                        class="friend_li addfriend_li"
                        v-for="item in searchUser"
                        :key="item.id"
                      >
                        <a href="javascript:;">
                          <div
                            class="li_outter"
                            @click="addfri(item.id, item.name)"
                          >
                            <!-- 个人头像 -->
                            <div class="li_left">
                              <img :src="item.headimg" alt="" />
                            </div>
                            <div class="li_right">
                              <!-- 名字与最后的聊天记录 -->
                              <div class="li_text">
                                <div class="liname">{{ item.name }}</div>
                              </div>
                              <!-- 时间 -->
                              <div class="litime">
                                <div class="li_time addli_time">添加好友</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </transition-group>
                  </template>
                </el-skeleton>
              </ul>
            </div>
            <div class="recommed">———————————为你推荐以下好友———————————</div>
            <div class="change" @click="changeRecommed">
              <a href="javascript:;"
                ><span class="icon iconfont icon-jiazai_shuaxin"></span
                >换一换</a
              >
            </div>
            <div
              class="left_firendList addleft_firendList marginno"
              v-loading="loading"
              element-loading-color="black"
            >
              <ul class="firend_ul addleft_firendList">
                <!-- 每个li都是一个区域 -->
                <li
                  class="friend_li addfriend_li"
                  v-for="item in recommedList"
                  :key="item.key"
                >
                  <a href="javascript:;">
                    <div class="li_outter" @click="addfri(item.id, item.name)">
                      <!-- 个人头像 -->
                      <div class="li_left">
                        <img :src="item.headimg" alt="" />
                      </div>
                      <div class="li_right">
                        <!-- 名字与最后的聊天记录 -->
                        <div class="li_text">
                          <div class="liname">{{ item.name }}</div>
                          <div class="lirecord">{{ item.describe }}</div>
                        </div>
                        <!-- 时间 -->
                        <div class="litime">
                          <div class="li_time addli_time">添加好友</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- 好友验证消息框 -->
          <el-dialog
            title="验证信息"
            :visible.sync="innerdialogVisible"
            width="30%"
          >
            <div>请输入好友验证消息</div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="textwrite addtextwrite"
              v-model="whoIAm"
            ></textarea>
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerdialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  innerdialogVisible = false;
                  messag();
                "
                >确 定</el-button
              >
            </span>
            <div class="innermargin">设置朋友权限</div>
            <el-radio-group v-model="radio">
              <el-radio-button label="聊天，朋友圈"></el-radio-button>
              <el-radio-button label="仅聊天"></el-radio-button>
            </el-radio-group>
            <div class="innermargin" v-show="radio === '聊天，朋友圈'">
              更多权限细节
            </div>
            <div class="moreDetail" v-show="radio === '聊天，朋友圈'">
              <dir class="detail">
                <span class="detailspan">不让ta看</span>
                <el-switch
                  v-model="value"
                  active-color="rgb(17, 40, 53)"
                  inactive-color="rgb(230, 230, 230)"
                  active-value="100"
                  inactive-value="0"
                >
                </el-switch>
              </dir>
              <dir class="detail">
                <span class="detailspan">不看ta</span>
                <el-switch
                  v-model="value2"
                  active-color="rgb(17, 40, 53)"
                  inactive-color="rgb(230, 230, 230)"
                  active-value="100"
                  inactive-value="0"
                >
                </el-switch>
              </dir>
            </div>
          </el-dialog>
          <!-- 以上部分为魔改element组件部分，add开头的类名都是新加的样式可以在本组件找到css，否则css在其他组件.vue的style部分 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { GetAllUser, addFriend, friendAgree, recommed } from "@/api/index";
import { list } from "@/mock/services/userList"; //把mock数据的好友列表的list拿出来临时增加好友
import { allfriendList } from "@/mock/services/allFriend"; ////把mock数据的所有好友列表的list拿出来临时增加好友
//相关搜索操作封装到了仓库中
import userListMixin from "@/store/mixin/userListMixin";
import myselfMixin from "@/store/mixin/myselfMixin";
import allFriendMixin from "@/store/mixin/allFriendMixin";
import headimg from "@/assets/img/headimg.jpg";
// import Velocity from 'velocity-animate'
// import lodash from "lodash";

export default {
  data() {
    return {
      searname: "", //搜索好友，暂时存取searname用v-model
      searall: "", //搜索所有用户
      dialogVisible: false, //添加好友对话框
      innerdialogVisible: false, //好友验证消息对话框
      radio: "聊天，朋友圈", //好友权限单选框
      value: false, //不让他看选项
      value2: false, //不看他选项
      searchUser: [], //搜索到的返回用户列表
      wantAddId: 0, //点击添加好友后把想添加好友的id暂存等会验证消息框可以用
      wantAddName: "", //点击添加好友后把想添加好友的名字暂存等会验证消息框可以用
      whoIAm: "", //验证消息
      jurisdiction: "", //权限
      recommedList: "", //推荐好友列表
      loading: false,
      skeleton: false,
      searchOrNO: "查询中",
      recommedList:'',//推荐好友列表
      loading:false,
      token:localStorage.getItem('token')
    };
  },
  // 加入防抖，防止高频次的进行查询操作
  created() {
    this.debouncedsearchAll = _.debounce(this.searchAll, 500);
    this.debouncedsearch = _.debounce(this.search, 500);
    this.debouncedsearchFriend = _.debounce(this.searchFriend, 500);
  },
  computed: {
    moveIfSear() {
      return this.$store.state.moveIf.searchmove;
    },
  },
  methods: {
    // beforeEnter(el){
    //   el.style.opacity=0

    // },
    // enter(el,done){

    // },
    // leave(el,done){

    // },
    //点击换一换推荐
    changeRecommed() {
      this.loading = true;
      setTimeout(() => {
        this.recommedList = [
          { id: 5, headimg: headimg, name: "hn", describe: "跟ta同学院" },
          { id: 6, headimg: headimg, name: "n", describe: "跟ta同学院" },
          { id: 7, headimg: headimg, name: "牛nh", describe: "跟ta同学院" },
          { id: 8, headimg: headimg, name: "不h", describe: "跟ta同学院" },
        ];
        this.loading = false;
      }, 1000);
    },

    addfri(id, name) {
      // 好友权限框弹出
      this.innerdialogVisible = true;
      this.wantAddId = id; //点击添加好友后把想添加好友的id暂存等会验证消息框可以用
      this.wantAddName = name; //点击添加好友后把想添加好友的名字暂存等会验证消息框可以用
    },

    //——————————当你点击好友申请发送后
    messag() {
      //点击申请后首先要处理的是权限到底是数据库四种情况的哪一种
      if (this.radio == "聊天，朋友圈") {
        if (this.value == true && this.value2 == false) {
          this.jurisdiction = "notLetWatch";
        } else if (this.value2 == true && this.value == false) {
          this.jurisdiction = "notWatch";
        } else if (this.value2 == true && this.value == true) {
          this.jurisdiction = "chatOnly";
        } else {
          this.jurisdiction = "fully";
        }
      } else {
        this.jurisdiction = "chatOnly";
      }

      // 向服务器发送我要加哪个好友

      //好友申请通过后(模拟websocket通知，一般是应该在钩子函数里注册，有好友通过应该是实时通知),用定时器营造效果
      //两个定时器，一个是好友申请通过弹窗定时器，还有一个定时器是弹窗后一秒再更新列表
      return new Promise((resolve, reject) => {
        //刚开始没有放到同一个return 导致那个return 回去了
        addFriend({
          myToken: this.token,
          friendId: this.wantAddId,
          message: this.whoIAm,
          jurisdiction: this.jurisdiction,
        })
          .then((response) => {
            this.$message({
              //若成功会返回申请好友成功
              message: response.data.result,
            });
          })
          .catch((error) => {
            console.log(error);
          });

        friendAgree({
          myToken: this.token,
          friendId: this.wantAddId,
          friendName: this.wantAddName,
        })
          .then((response) => {
            const h = this.$createElement;
            const result = response.data.result;
            console.log("好友申请" + result);
            // 好友通过通知
            setTimeout(() => {
              this.$notify({
                title: "好友通过",
                message: h(
                  "i",
                  { style: "color: teal" },
                  `${result.name} 同意好友申请了，快去看看吧！`
                ),
                type: "success",
                // position: 'top-left'
              });
              //模拟数据库朋友列表添加该位好友
              list.push({
                id: result.id,
                headimg: headimg,
                name: result.name,
                lastcord: "我是新好友",
                time: "9:05",
              });
              // 模拟websocket重新更新好友列表
              setTimeout(() => {
                this.$store.dispatch("userList/GetUserList");
              }, 1000);
              //这个是好友列表的
              allfriendList.push({
                id: result.id,
                img: headimg,
                text: result.name,
                texttype: "friend",
                sex: "man",
              });
              // 模拟websocket重新更新好友列表
              setTimeout(() => {
                this.$store.dispatch("allFriend/getAllFriend");
              }, 1000);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    //与其他组件通过store的action方法去调用api不同，在这里我没有设立另外的仓库，你会发现其实可以很直接地从api拿数据
    //查找好友向数据库
    searchAll(search) {
      if (search != "") {
        this.searchOrNO = "查询中";
        this.searchUser = "";
        this.skeleton = true;
        setTimeout(() => {
          return new Promise((resolve, reject) => {
            GetAllUser({ parem: search })
              .then((response) => {
                const result = response.data.result;
                console.log(result.length);
                this.skeleton = false; //详情查看currentRecord.js仓库的注释
                // 拿到要的用户列表以后直接放到这里的data就可以用了
                setTimeout(() => {
                  if (result.length == 0) {
                    //如果返回0，则利用骨架去渲染，把骨架再次用起来
                    this.searchOrNO = "查无此人,请输入正确的昵称";
                    console.log(result.length);
                    this.skeleton = true;
                  } else {
                    this.searchUser = result;
                  }
                  resolve();
                }, 300);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }, 0);
      }
    },
  },
  mixins: [userListMixin, myselfMixin, allFriendMixin],
  beforeMount() {
    this.loading = true;
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        recommed()
          .then((response) => {
            const result = response.data.result;
            this.recommedList = result;
          })
          .catch((error) => {
            console.log(error);
          });
        this.loading = false;
      });
    }, 2000);
  },

  //在userListMixin里调用了
  // methods:{
  //         // search(searname){
  //         //   this.$store.commit('userList/SETSEARNAME',searname)
  //         // }
  //         //调用位置为leftSearch.vue的keyUp事件
  //         ...mapMutations('userList',{search:'SETSEARNAME'})
  //       },

  //在allFriendMixin里调用了
  //   methods:{
  //         //调用位置为leftSearch.vue的keyUp事件
  //         ...mapMutations('allFriend',{searchFriend:'SETSEARNAME'})
  //     },
};
</script>

<style scoped>
@import "$/assets/iconfont/iconfont.css";

/* ---朋友列表栏列表开始--- */
.recommed {
  margin: 50px auto 10px;
  width: 95%;
  text-align: center;
}
.change {
  margin: 3px auto 0px;
  width: 70%;
  text-align: right;
}
.change a {
  font-size: 12px;
}
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
  width: 120%;
  font-size: 12px;
  color: rgb(165, 155, 184);
}
/* 最后一条发送时间 */
.li_time {
  font-size: 15px;
}
/* ---朋友列表栏列表结束--- */
/* ----右侧朋友列表全部结束---- */

/* --朋友列表栏搜索框开始-- */
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
.left_search {
  width: 270px;
  height: 60px;
  background-color: rgb(220, 219, 224);
  border-radius: 15px;
  margin: 3px 0px 3px 3px;
  content: "";
  display: table;
  clear: both;
}
/* 搜索框 */
.search_outter {
  margin: 15px auto 0px;
  width: 215px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
/* 搜索框本身 */
.search_left {
  display: flex;
  align-items: center;
  position: relative;
}
/* 搜索图标 */
.search_icon_left {
  position: absolute;
  left: 5px;
}
/* 搜索框 */
.sear_text {
  background-color: rgb(220, 219, 224);
  border: 1px solid rgb(219, 218, 218);
  border-radius: 8px;
  width: 145px;
  padding-left: 32px;
  height: 25px;
  font-size: 14px;
}
/* 搜索框被聚焦时 */
input:focus {
  outline: none;
  border: 1px solid #fff;
  background-color: rgb(248, 248, 248);
}
/* ---朋友列表栏搜索框结束--- */

/* ----------以下为element部分组件样式,add开头样式是原生自己写到,el开头都是element样式--------- */
/* 无法修改记得用穿透,再不行就用!important,或者看看能不能自己增加类 */
.search_right >>> .el-dialog {
  border-radius: 20px;
  transition: all 2s !important;
  margin-top: 3vh !important;
  /* 因为有个最大的element.style压着所以这里只能!important */
}
/* 搜索部分 */
.addsearch_icon_left {
  left: 8px;
  top: -10px;
}
.addsear_text {
  width: 100%;
  margin: 0px auto;
  margin-top: -15px;
}
.addsear_text:focus {
  background-color: rgb(237, 236, 241);
}
.addsearch_left {
  width: 55%;
  margin: 0px auto;
  transition: all 2s;
}

/* 所有用户列表展示 */
.addli_time {
  color: rgb(53, 47, 47);
  font-family: "华文琥珀";
  font-weight: 100;
  transition: all 1s;
}
.addleft_firendList {
  width: 93%;
  height: auto;
  margin: 20px auto;
  max-height: 370px;
  transition: all 1s;
  min-height: 23px;
}
.addfriend_li {
  float: left;
  clear: none;
  margin: 30px 25px 0px 25px;
}

/* 验证消息框 */
.addtextwrite {
  border: 1px solid rgb(190, 189, 189);
  background-color: rgb(250, 250, 250);
  margin-top: 5px;
  border-radius: 10px;
  padding-left: 5px;
}
.addtextwrite:focus {
  border: 1px solid rgb(216, 216, 216);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

/* 单选框样式element */
.is-active {
  width: 100%;
}
.el-radio-button__inner,
.el-radio-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 4px 4px 0;
  width: 100%;
}
.el-radio-button {
  width: 40%;
}
.el-radio-button >>> .el-radio-button__inner {
  width: 100%;
  border-radius: 20px !important;
  border: 1px solid rgb(190, 189, 189) !important;
}
.el-radio-button
  >>> .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  color: #fff;
  background-color: rgb(17, 40, 53) !important;
  border-color: rgb(17, 40, 53) !important;
  box-shadow: none !important;
}
/* 为了实现响应式 */
.el-radio-button >>> .el-radio-button__inner {
  white-space: normal;
}
.el-radio-button >>> .el-radio-button__inner:hover {
  color: rgb(17, 40, 53);
}

/* 所有部分都加个margin-top */
.innermargin {
  margin-top: 40px;
}

/* 按钮样式 */
.el-button--primary {
  background-color: rgb(22, 44, 56);
  border: rgb(23, 46, 59);
}
.el-button >>> .el-button--primary:focus,
.el-button--primary:hover {
  background-color: rgb(17, 40, 53) !important;
}

.el-button:focus,
.el-button:hover {
  color: rgb(255, 255, 255);
  border-color: rgb(105, 112, 116);
  background-color: rgb(122, 124, 124);
}

/* 更多权限部分 */
.moreDetail {
  margin: 10px auto;
  width: 78%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.detail {
  width: 32%;
  padding-left: 0px;
}
.detailspan {
  margin-right: 5px;
}
.marginno {
  margin-top: 0px;
  height: 240px;
}
/* .search_right>>>.el-dialog .el-dialog__body {
    max-height: 500px !important;
    overflow: auto !important;
} */

/* 以下是动画部分 */
/* 大div动画 */
.bigmove-enter {
  transform: translateY(-120px);
  opacity: 0;
}
.bigmove-leave-to {
  opacity: 0;
  transform: translateY(-120px);
}
.bigmove-enter-active,
.bigmove-leave-active {
  transition: all 0.8s;
}
/* 里面的搜索好友列表动画 */
.limove-enter,
.limove-leave-to {
  transform: translateX(-120px);
  opacity: 0;
}
/* 太慢了不行会出现跳动太快了也不行现在刚刚好 */
.limove-enter-active {
  transition: all 0.8s;
}
.limove-leave-active {
  transition: all 0.4s;
}
/* 初次appear有优先级，初次刷新搞慢点 */
.appear_active {
  transition: all 1.5s;
}
</style>


<style>
/* 你还可以再写一个style没有scoped的以实现样式修改但是会造成全局污染最好别用这招 */
/* .el-message-box{
  
} */
/* .message-logout {
  border-radius: 15px !important;
} */
</style>


