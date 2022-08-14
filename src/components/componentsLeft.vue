<template>
  <transition appear name="move">
    <div class="layout_left">
      <!-- 左侧栏上部 -->
      <div class="layleft_top">
        <el-popover
          placement="right"
          width="280"
          trigger="click"
          popper-class="selfheadimg_popover"
        >
          <div class="selfheadimg">
            <div class="selfheadimg_top">
              <div class="self_top_left">
                <div class="name">{{ userInfo.name }}</div>
                <div class="id">帐号：{{ userInfo.userName }}</div>
              </div>
              <div class="self_top_right">
                <img class="headimg" :src="userInfo.headimg" alt="头像" />
              </div>
            </div>
            <el-divider></el-divider>
            <!-- <div class="selfheadimg_mid">备 注：{{ remarks }}</div> -->
            <!-- <div class="selfheadimg_mid">地 区：{{ userInfo.region }}</div> -->
            <div class="selfheadimg_bottom">
              <el-tooltip
                content="编辑个人资料"
                placement="bottom"
                effect="light"
              >
                <el-button
                  icon="el-icon-edit-outline"
                  circle
                  @click="profileVisible = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="发送名片" placement="bottom" effect="light">
                <el-button icon="el-icon-share" circle></el-button>
              </el-tooltip>
              <el-tooltip content="发消息" placement="bottom" effect="light">
                <el-button icon="el-icon-chat-round" circle></el-button>
              </el-tooltip>

              <!-- <button class="zhuanfa">转发</button>
            <button class="liaotian">聊天</button> -->
              <!-- <a href="javascript:;"
            ><span class="icon iconfont icon-zhuanfa"></span
            ></a>
            <a href="javascript:;"
              ><span class="icon iconfont icon-liaotian"></span
            ></a> -->
            </div>
          </div>
          <a slot="reference" href="javascript:;"
            ><img
              slot="reference"
              class="headimg"
              :src="userInfo.headimg"
              alt="头像"
          /></a>
        </el-popover>
        <!-- 修改个人资料 -->
        <el-dialog
          title="编辑个人资料"
          :visible.sync="profileVisible"
          width="600px"
          center
          @open="openDialog()"
        >
          <el-form
            :model="profileForm"
            ref="profileForm"
            :rules="rules"
            label-position="left"
            @keyup.enter.native="profile('profileForm')"
          >
            <el-form-item prop="avatar">
              <el-upload
                class="avatar-uploader"
                :class="{ disabled: uploadDisabled }"
                action="#"
                :auto-upload="false"
                :on-change="avatarChange"
                :show-file-list="false"
                accept="image/png,image/jpg,image/jpeg"
              >
                <img :src="avatarUrl" class="avatar" />
              </el-upload>
            </el-form-item>
            <el-form-item prop="userName" label="帐 号">
              <el-input
                type="text"
                v-model="profileForm.userName"
                class="input"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item prop="name" label="昵 称">
              <el-input
                type="text"
                v-model="profileForm.name"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phonenumber" label="电 话">
              <el-input
                type="text"
                v-model="profileForm.phonenumber"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮 箱">
              <el-input
                type="text"
                v-model="profileForm.email"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性 别">
              <el-radio-group
                v-model="profileForm.sex"
                style="margin-left: -140px"
              >
                <el-radio label="man">男</el-radio>
                <el-radio label="woman">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="grade" label="年 级">
              <el-select
                v-model="profileForm.grade"
                @change="gradeChange"
                clearable
              >
                <el-option
                  v-for="item in grades"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="institute" label="学 院">
              <el-select v-model="profileForm.institute" clearable>
                <el-option
                  v-for="item in institutes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="region" label="地 区">
              <el-cascader
                size="large"
                :options="regions"
                v-model="profileForm.region"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item
              prop="hobby"
              label="爱 好"
              label-width="80px"
              style="text-align: left"
            >
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="hobbyClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="hobbyInputConfirm"
                @blur="hobbyInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInputHobby"
                >+ 爱好标签</el-button
              >
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="profileVisible = false">取 消</el-button>
            <el-button type="primary" @click="profile('profileForm')"
              >保 存</el-button
            >
          </span>
        </el-dialog>
        <a href="javascript:;" @click="changeroute('record')"
          ><span class="icon iconfont icon-liaotian"></span
        ></a>
        <!-- </el-badge> -->
        <a href="javascript:;" @click="changeroute('friendList')"
          ><span class="icon iconfont icon-yonghu"></span
        ></a>
        <a href="javascript:;" @click="changeroute('chatenv')"
          ><span class="icon iconfont icon-pengyouquan"></span
        ></a>
      </div>
      <!-- 左侧栏下部 -->
      <div class="layleft_bottom">
        <a href="javascript:;" slot="reference" @click="logout" class="logout"
          ><span class="icon iconfont icon-tuichu"></span
        ></a>
        <a href="javascript:;" slot="reference"
          ><span class="icon iconfont icon-shezhi"></span
        ></a>
      </div>
    </div>
  </transition>
</template>

<script>
//相关自己的头像操作已经封装到了仓库里
import myselfMixin from "@/store/mixin/myselfMixin";
import { regionData } from "element-china-area-data";
import { updateLoginUserInfo } from "@/api/index";
import { newUser } from "@/mock/services/login";
import headimg from "@/assets/img/headimg5.jpg";
export default {
  mixins: [myselfMixin],

  //在myselfMixin里调用了
  // computed:{
  //       //调用位置为componentsLeft.vue和recordSpan.vue
  //       ...mapState('myself',['headImg','name'])
  //   },

  // beforeCreate() {
  //   // mapActions('myself',['getMyself']) //这个语法糖是对象写法不能写到script里
  //   //触发的地方是左边个人栏componentsLfet.vue加载时，去后端获取到数据放到仓库里
  //   this.$store.dispatch("myself/getMyself");
  // },

  data() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    return {
      // 修改个人资料对话框
      profileVisible: false,
      profileForm: {
        userName: "",
        name: "",
        phonenumber: "",
        email: "",
        sex: "",
        region: "",
        grade: "",
        hobby: [],
        institute: "",
      },
      // 头像
      fileList: [],
      // 头像地址
      avatarUrl: userInfo.headimg,
      grades: [],
      regions: regionData,
      dynamicTags: userInfo.hobby,
      inputVisible: false,
      inputValue: "",
      institutes: [
        {
          value: "1",
          label: "农学院",
        },
        {
          value: "2",
          label: "园艺学院",
        },
        {
          value: "3",
          label: "动物科学学院",
        },
        {
          value: "4",
          label: "林学与风景园林学院",
        },
        {
          value: "5",
          label: "工程学院",
        },
        {
          value: "6",
          label: "食品学院",
        },
        {
          value: "7",
          label: "电子工程学院",
        },
        {
          value: "8",
          label: "经济管理学院",
        },
        {
          value: "9",
          label: "艺术学院",
        },
        {
          value: "10",
          label: "外国语学院",
        },
        {
          value: "11",
          label: "马克思主义学院",
        },
        {
          value: "12",
          label: "国际教育学院",
        },
        {
          value: "13",
          label: "兽医学院",
        },
        {
          value: "14",
          label: "海洋学院",
        },
        {
          value: "15",
          label: "生命科学学院",
        },
        {
          value: "16",
          label: "资源环境学院",
        },
        {
          value: "17",
          label: "数学与信息学院（软件学院）",
        },
        {
          value: "18",
          label: "水利与土木工程学院",
        },
        {
          value: "19",
          label: "材料与能源学院",
        },
        {
          value: "20",
          label: "公共管理学院",
        },
        {
          value: "21",
          label: "人文与法学学院",
        },
      ],
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getSelectGrade();
  },
  computed: {
    // 限制头像
    uploadDisabled: function () {
      return this.fileList.length > 0;
    },
  },
  methods: {
    // 修改个人信息
    // 监听打开事件,每次重新赋值
    changeroute(name) {
      let firstClock;
      // 去朋友圈时更长的退出动画时间
      if (name == "chatenv") {
        firstClock = 900;
      } else {
        firstClock = 500;
      }
      this.$store.commit("moveIf/SETSEARCHMOVE", false);
      this.$store.commit("moveIf/SETLISTMOVE", false);
      setTimeout(() => {
        this.$router.push({
          name: name,
        });
        setTimeout(() => {
          this.$store.commit("moveIf/SETSEARCHMOVE", true);
          this.$store.commit("moveIf/SETLISTMOVE", true);
        }, 100);
      }, firstClock);
    },
    openDialog() {
      // 这样才能用userInfo
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // 修改个人资料对话框
      this.profileForm.userName = userInfo.userName;
      this.profileForm.name = userInfo.name;
      this.profileForm.phonenumber = userInfo.phonenumber;
      this.profileForm.email = userInfo.email;
      this.profileForm.sex = userInfo.sex;
      this.profileForm.region = userInfo.region;
      this.profileForm.grade = userInfo.grade;
      this.profileForm.hobby = userInfo.hobby;
      this.profileForm.institute = userInfo.institute;
      this.avatarUrl = userInfo.headimg;
      this.dynamicTags = userInfo.hobby;
    },
    // 头像修改
    avatarChange(file, fileList) {
      this.fileList = fileList;
      this.avatarUrl = URL.createObjectURL(file.raw);
    },
    // 处理年级
    getSelectGrade() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //获取当前年
      for (let i = 0; i < 50; i++) {
        // 可选其他年级
        this.grades.push({ value: year - i, label: year - i });
      }
    },
    gradeChange(value) {
      this.profileForm.grade = value;
    },
    // 处理爱好标签
    hobbyClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInputHobby() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    hobbyInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.profileForm.hobby = this.dynamicTags;
    },
    // 保存
    profile(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改对话框的可视
          this.profileVisible = false;
          // 模拟修改信息
          const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          let user = {
            userName: this.profileForm.userName,
            password: userInfo.password,
            name: this.profileForm.name,
            headimg: headimg, //暂用
            phonenumber: this.profileForm.phonenumber,
            email: this.profileForm.email,
            sex: this.profileForm.sex,
            region: this.profileForm.region,
            grade: this.profileForm.grade,
            hobby: this.profileForm.hobby,
            institute: this.profileForm.institute,
          };
          newUser.some((val) => {
            if (val.userName == user.userName) {
              val = user;
              return true;
            }
          });
          // namespaced: true 调用action要加空间名
          this.$store
            .dispatch("myself/Update", user)
            .catch((error) => {
              console.log(error.response);
              return false;
            });
          updateLoginUserInfo(this.profileForm).then((response) => {
            let message = response.data.result;
            this.$message.success(message);
          });
        } else {
          this.$message.warning("请填写正确的信息");
          return false;
        }
      });
    },

    // 退出登录
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // namespaced: true 调用action要加空间名
          this.$store.dispatch("myself/Logout").then(() => {
            //跳转到登录页面
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
  },
};
</script>

<style scoped>
@import "../assets/iconfont/iconfont.css";
/* ----左侧个人头像，设置等栏开始---- */
.layout_left {
  width: 88px;
  background-color: rgb(17, 40, 53);
  height: 95.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 10px;
}
/* 左侧栏上部 */
.layleft_top {
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-between;
  align-items: center;
}

/* 头像设置 */
.headimg {
  width: 48px;
  overflow: hidden;
  height: 48px;
  border-radius: 13px;
}
.layleft_top {
  font-size: 24px;
  margin-top: 20px;
}
.layleft_bottom {
  padding-top: 220px;
  display: flex;
  flex-direction: inherit;
  height: 100px;
  justify-content: space-between;
  align-items: center;
}
.logout {
  padding-left: 5px;
}
/* ----左侧个人头像，设置等栏结束---- */

/* ----个人头像点击弹窗，设置等栏开始---- */

/* .el-popover.selfheadimg_popover{
  height: 240px;
  background-color:rgb(238, 22, 22);
  border-radius: 18px;
  border:1px solid rgb(218, 159, 159)
} */
.selfheadimg {
  width: 90%;
  margin: 8px auto 0px;
  display: flex;
  flex-direction: column;
}
.selfheadimg_top {
  display: flex;
  flex-direction: row;
}
.self_top_left {
  margin-top: 5px;
  width: 70%;
  display: flex;
  flex-direction: column;
}
.self_top_left .name {
  font-size: 22px;
  font-weight: bold;
}
.self_top_left .id {
  margin-top: 5px;
  font-size: 15px;
}
.self_top_right img {
  width: 30%;
  width: 80px;
  height: auto;
}
.selfheadimg_mid {
  margin-top: 16px;
  font-size: 16px;
}
.selfheadimg_bottom {
  margin: 20px 0px 0px auto;
}
.zhuanfa,
.liaotian {
  margin-left: 10px;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  font-size: 14px;
}
.el-popover .selfheadimg_popover {
  height: 230px;
  background-color: rgb(241, 217, 217);
  border-radius: 18px;
  border: 1px solid rgb(218, 159, 159);
}
/* ----个人头像点击弹窗，设置等栏结束---- */
.move-enter,
.move-leave-to {
  transform: translateX(-120px);
  opacity: 0;
}
.move-enter-active {
  transition: all 2s;
}

/* .el-popover.selfheadimg_popover{
  height: 240px;
  background-color:rgb(238, 22, 22);
  border-radius: 18px;
  border:1px solid rgb(218, 159, 159)
} */
.selfheadimg {
  width: 90%;
  margin: 8px auto 0px;
  display: flex;
  flex-direction: column;
}
.selfheadimg_top {
  display: flex;
  flex-direction: row;
}
.self_top_left {
  margin-top: 5px;
  width: 70%;
  display: flex;
  flex-direction: column;
}
.self_top_left .name {
  font-size: 22px;
  font-weight: bold;
}
.self_top_left .id {
  margin-top: 5px;
  font-size: 15px;
}
.self_top_right img {
  width: 30%;
  width: 80px;
  height: auto;
}
.selfheadimg_mid {
  margin-top: 16px;
  font-size: 16px;
}
.selfheadimg_bottom {
  margin: 20px 0px 0px auto;
}
.el-popper .popper__arrow::after {
  display: none;
}

/* .zhuanfa,
.liaotian {
  margin-left: 10px;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  font-size: 14px;
} */

/* ----个人资料修改---- */
.el-form {
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
.el-form >>> .el-form-item__label {
  font-size: 14px;
  font-weight: bold;
}

.el-form >>> .el-form-item__error {
  left: 80px;
}

.avatar-uploader {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 20px;
}
.input,
.el-select,
.el-cascader {
  display: block;
  width: 60%;
  padding-bottom: 0px;
  font-size: 15px;
  margin: 0 auto;
  text-align: center;
}

/* .input >>> .el-input__inner {
  border: 0;
} */

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-dialog__wrapper >>> .el-dialog {
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
}

.el-dialog__wrapper >>> .el-dialog .el-dialog__body {
  overflow: auto;
}
</style>
/* ----个人资料修改，设置等栏结束---- */
<style>
.el-popover.selfheadimg_popover {
  height: 210px;
  /* background-color: rgb(241, 217, 217); */
  border-radius: 18px;
  /* border: 1px solid rgb(218, 159, 159); */
}
/* ----个人头像点击弹窗，设置等栏结束---- */
</style>
