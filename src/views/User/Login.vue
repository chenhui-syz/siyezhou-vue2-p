<template>
  <div class="login-page-container">
    <div class="w-1200">
      <p class="tc reg-title">登录</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="form-container"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
          <span
            class="svg"
            style="color: #c00;"
            @click="_getCode()"
            v-html="svg"
          ></span>
        </el-form-item>
        <el-form-item class="df-aic-jcc">
          <el-button type="primary" @click="submitForm('ruleForm')">
            登录
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link class="ml20" :to="{ name: 'reg' }">前往注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
import CodeMix from "@/mixin/login";
export default {
  name: "login",
  mixins: [CodeMix],
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
        code: "",
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度为 4 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        // 验证通过，提交表单
        if (valid) {
          console.log("验证通过，提交表单");
          login({
            username: this.ruleForm.email,
            password: this.ruleForm.password,
            code: this.ruleForm.code,
            sid: this.$store.state.sid,
          })
            .then((res) => {
              if (res.code === 200) {
                // 存储用户的登录名
                res.data.username = this.username;
                this.$store.commit("setUserInfo", res.data);
                this.$store.commit("setToken", res.token);
                this.$store.commit("setIsLogin", true);
                console.log("登陆成功", res.data);
                // 重置表单信息
                this.$refs[ruleForm].resetFields();
                this.$router.push({
                  name: "postlist",
                });
              } else if (res.code === 401) {
                console.log("出现错误");
              }
            })
            .catch((err) => {
              const data = err.response.data;
              if (data.code === 500) {
                // this.$alert("用户名密码校验失败，请检查！");
              } else {
                // this.$alert("服务器错误");
              }
              console.log(err.response);
            });
        } else {
          // 不通过
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
.login-page-container {
  .form-container {
    width: 600px;
    margin: 20px auto;
  }

  .reg-title {
    margin-top: 60px;
    font-size: 20px;
  }

  .ml20 {
    margin-left: 20px;
  }
}
</style>
