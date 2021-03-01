<template>
  <div class="reg-page-container">
    <div class="w-1200">
      <p class="tc reg-title">注册</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="form-container"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
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
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link class="ml20" :to="{ name: 'login' }"
            >前往登录</router-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CodeMix from "@/mixin/login";
export default {
  name: "reg",
  mixins: [CodeMix],
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        code: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
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
.reg-page-container {
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
