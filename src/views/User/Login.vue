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
export default {
  name: "login",
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
        } else {
          // 不通过
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
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
}
</style>
