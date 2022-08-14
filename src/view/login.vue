<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="top">登 录</div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        @keyup.enter.native="login('loginForm')"
      >
        <el-form-item prop="userName">
          <el-input
            type="text"
            v-model="loginForm.userName"
            prefix-icon="el-icon-user"
            placeholder=" 请输入用户账号"
            class="input"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
            placeholder=" 请输入密码"
            show-password
            class="input"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
        <el-form-item>
          <el-button round @click="login('loginForm')" class="submit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="msg">
        还没有帐号？
        <router-link class="register" :to="{ name: 'register' }">立即注册</router-link>
      </div>
    </div>
  </div>
</template>
 
<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        rememberMe: false,
      },
      rules: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCookie();
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 记住密码
          if (this.loginForm.rememberMe) {
            Cookies.set("userName", this.loginForm.userName, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("userName");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }

          // 登录
          let params = {
            userName: this.loginForm.userName,
            password: this.loginForm.password,
          };
          // namespaced: true 调用action要加空间名
          this.$store
            .dispatch("myself/Login", params)
            .then(() => {
              this.$router.push({ path: "/index" });
            })
            .catch((error) => {
              console.log(error.response);
              this.$message.error("登录失败");
              return false;
            });
        } else {
          this.$message.warning("请填写登录信息");
          return false;
        }
      });
    },

    getCookie() {
      const userName = Cookies.get("userName");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        userName: userName === undefined ? this.loginForm.userName : userName,
        password:
          password === undefined
            ? this.loginForm.password
            : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
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

.login {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-225deg, #fffeff 0%, #bdd7f0 100%);
}

.top {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 120px;
  color: #a8ceed;
}

.login-wrapper {
  background-color: #fff;
  width: 300px;
  border-radius: 15px;
  padding: 0 100px;
  box-shadow: 0 0 15px #a8ceed;
}

.el-checkbox {
  margin-top: 10px;
  color: #a8ceed;
  font-weight: bold;
}
.input {
  display: block;
  width: 100%;
  padding-bottom: 0px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
}

.login-wrapper >>> .el-input__inner {
  border: 0;
}

.submit {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  color: #ffffff;
}

.msg {
  text-align: center;
  margin-bottom: 30px;
  color: #666666;
}

.register {
  font-size: 15px;
  text-decoration: none;
  color: #a8ceed;
  font-weight: bold;
}
</style>
