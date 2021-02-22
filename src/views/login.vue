<template>

  <div class="login-wrap">
    <div class="ms-login">
      <!-- <div class="ms-title">爱豆后台管理系统</div> -->
      <el-form :model="params"
               :rules="rules"
               ref="params"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="params.user_name"
                    clearable
                    placeholder="请输入用户名">
            <el-button slot="prepend"
                       icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    v-model="params.pass_word">
            <el-button slot="prepend"
                       icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="params.code"
                    placeholder="请输入验证码"
                    clearable>
            <template slot="append"> <img class="img-code"
                   @click="getCode"
                   slot="prepend"
                   :src="url"
                   ref="img-code"></template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="danger" 
                     plain
                     @click="login('params')">登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import { login } from "@/assets/js/request/main";
export default {
  data() {
    return {
      params: {
        user_name: null,
        pass_word: null,
        code: null,
      },
      url: "http://localhost:3000/api/code",
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pass_word: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {},
  watch: {},
  // 监听
  computed: {
   
  },
  created () {
      document.onkeypress = (e)=> {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        this.login("params"); // 登录方法名
        return false;
      }
    };
  },
  // 计算属性
  mounted() {},
  methods: {
    ...mapActions(["getMenus"]),
    getCode() {
      this.url = `http://localhost:3000/api/code?${new Date().getTime()}`;
    },
    login(params) {
      this.$refs[params].validate(async (valid) => {
        if (valid) {
          let codes = document.cookie.split("=")[1];
          if (this.params.code !== codes) {
            return this.$message({
              message: '动态验证码错误',
              type: "error",
              duration: 600,
            });;
          }
          let { message, code, token, data } = await login(this.params);
          if (code === 200) {
            this.$message({
              message: message,
              type: "success",
              duration: 1000,
            });
            this.$store.commit("setToken", token);
            this.$store.commit("setUser", data);
            this.getMenus();
            this.$router.push({
              name: "home",
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}
.ms-title {
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 51%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  overflow: hidden;
}
.ms-content {
  background: #fff;
  padding: 30px 30px;
  border-radius: 8px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.active {
  background: #fd5c57;
}
</style>
