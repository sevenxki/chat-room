<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="top">注 册</div>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        @keyup.enter.native="register('registerForm')"
      >
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="填写帐号信息"></el-step>
          <el-step title="完善个人信息"></el-step>
        </el-steps>
        <div v-show="show">
          <el-form-item prop="avatar">
            <!-- action为默认请求地址，必须写 -->
            <!-- :limit="1" 每次上传只能是第一张 不好 -->
            <!-- uploadDisable控制在检测到上传列表中已经有一张图片时就隐藏上传组件。uploadDiseabled 会根据上传列表的长度动态的给upload的组件添加样式，进而将达到只上传一张的效果。 -->
            <!-- 先不上传 -->
            <el-upload
              class="avatar-uploader"
              :class="{ disabled: uploadDisabled }"
              action="#"
              :auto-upload="false"
              :on-change="avatarChange"
              :show-file-list="false"
              accept="image/png,image/jpg,image/jpeg"
            >
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input
              type="text"
              v-model="registerForm.userName"
              prefix-icon="el-icon-user"
              placeholder=" 请输入注册账号"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              type="text"
              v-model="registerForm.name"
              prefix-icon="el-icon-postcard"
              placeholder=" 请输入用户昵称"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              prefix-icon="el-icon-unlock"
              placeholder=" 请输入密码"
              show-password
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
              prefix-icon="el-icon-key"
              placeholder=" 请确认输入的密码"
              show-password
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button round @click="register('registerForm')" class="submit"
              >下一步</el-button
            >
          </el-form-item>
        </div>
        <div v-show="!show">
          <el-form-item prop="sex" label="性 别">
            <el-radio-group v-model="registerForm.sex">
              <el-radio label="man">男</el-radio>
              <el-radio label="woman">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="grade" label="年级">
            <el-select
              v-model="registerForm.grade"
              @change="gradeChange"
              placeholder="请选择"
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
            <el-select
              v-model="registerForm.institute"
              clearable
              placeholder="请选择"
            >
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
              v-model="registerForm.region"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item prop="hobby" label="爱 好">
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
          <el-form-item>
            <el-button round @click="register('registerForm')" class="submit"
              >注册</el-button
            >
          </el-form-item>
        </div>
        <div class="msg">
          已有帐号？
          <router-link class="login" :to="{ name: 'login' }"
            >立即登录</router-link
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
 
<script>
import { regionData } from "element-china-area-data";
import { newUser } from "@/mock/services/login";
import { newRegister } from "@/mock/services/register";
import { register } from "@/api/index";
import headimg from "@/assets/img/headimg4.jpg";
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致，请重新输入！"));
      } else {
        callback();
      }
    };
    let validateAvatar = (rule, value, callback) => {
      if (this.fileList.length < 1) {
        callback(new Error("请上传头像"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userName: "",
        name: "",
        password: "",
        confirmPassword: "",
        // avatar: "",
        sex: "man",
        region: "",
        grade: "",
        hobby: [],
        institute: "",
      },
      active: 0,
      show: true, // 账号注册or用户信息
      fileList: [], // 头像
      avatarUrl: "", // 头像地址
      regions: regionData,
      grades: [],
      dynamicTags: [],
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
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户账号长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        avatar: [
          { required: true, validator: validateAvatar, trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getSelectGrade();
  },
  computed: {
    uploadDisabled: function () {
      return this.fileList.length > 0;
    },
  },
  methods: {
    // 头像
    // :on-change="avatarChange"选择图片改变时触发此方法，可以在其中从fileList获得文件，然后利用
    // window.URL.createObjectURL(file.raw);方法生成本地文件的url，供临时预览。文件被删除或移动，或
    // 者session刷新后，此url都会失效。如果avatarUrl存在，就显示此图片，并将上传图片的样式隐藏。
    avatarChange(file, fileList) {
      this.fileList = fileList;
      //生成图片上传预览，直接src显示,删除或移动后url就失效了
      this.avatarUrl = URL.createObjectURL(file.raw);
      // this.registerForm.avatar = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },

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
      this.registerForm.hobby = this.dynamicTags;
    },
    // 处理年级
    getSelectGrade() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //获取当前年
      for (let i = 0; i < 50; i++) {
        // 可选其他年级
        this.grades.push({ value: year - i, label: year - i + "级" });
      }
    },
    gradeChange(value) {
      this.registerForm.grade = value;
    },
    // 注册
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 点击下一步
          if (this.show == true) {
            register(this.registerForm).then((response) => {
              let { status, message } = response.data.result;
              if (status == 1005) {
                this.$message.error(message);
              } else if (status == 1004) {
                this.show = false;
                this.active = 1;
              }
            });
          } else {
            // 点击注册
            register(this.registerForm).then((response) => {
              let { status, message } = response.data.result;
              if (status == 1004) {
                this.active = 2;
                this.$message.success(message);
                // 模拟添加登录信息
                newUser.push({
                  userName: this.registerForm.userName,
                  password: this.registerForm.password,
                  name: this.registerForm.name,
                  headimg: headimg, //暂用
                  phonenumber:'',
                  email:'',
                  sex: this.registerForm.sex,
                  region: this.registerForm.region,
                  grade: this.registerForm.grade,
                  hobby: this.registerForm.hobby,
                  institute: this.registerForm.institute,
                });
                // 模拟添加注册信息
                newRegister.push({
                  userName: this.registerForm.userName,
                });
                // 切换第一个注册页并置空
                setTimeout(() => {
                  this.registerForm = {
                    userName: "",
                    name: "",
                    password: "",
                    confirmPassword: "",
                    avatar: "",
                    sex: "man",
                    region: "",
                    grade: "",
                    hobby: "",
                    institute: "",
                  };
                  this.selectedOptions = [];
                  this.dynamicTags = [];
                  this.avatarUrl = "";
                  this.fileList = [];
                  this.active = 0;
                  this.show = true;
                }, 2000);
              }
            });
          }
        } else {
          this.$message.warning("请填写正确的注册信息");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.register {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-225deg, #fffeff 0%, #bdd7f0 100%);
}

.avatar-uploader {
  border: 2px dashed #b2eeee;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  cursor: pointer;
  margin-left: 110px;
}
.avatar-uploader:hover {
  border: 2px dashed #409eff;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 100%;
}

.disabled .el-upload--picture-card {
  display: none;
}

.top {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 110px;
  color: #a8ceed;
}

.el-step {
  margin-bottom: 20px;
}

.el-step >>> .el-step__title {
  font-size: 14px;
}

.el-form >>> .el-form-item__label {
  font-size: 15px;
  font-weight: bold;
  color: #a8ceed;
}

.register-wrapper {
  background-color: #fff;
  width: 300px;
  border-radius: 15px;
  padding: 0 100px;
  box-shadow: 0 0 15px #a8ceed;
}

.input {
  display: block;
  width: 100%;
  padding-bottom: 0px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
}

.input >>> .el-input__inner {
  border: 0;
}

.submit {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 30px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  color: #ffffff;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.msg {
  text-align: center;
  margin-bottom: 30px;
  color: #666666;
}

.login {
  font-size: 15px;
  text-decoration: none;
  color: #a8ceed;
  font-weight: bold;
}
</style>