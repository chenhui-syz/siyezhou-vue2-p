<template>
  <div class="v-header-page-contanier">
    <div class="w-1200">
      <el-row>
        <el-col :span="24">
          <el-col :span="8"
            ><div class="grid-content">
              <span class="header-height">四叶舟</span>
            </div>
          </el-col>
          <el-col :span="16">
            <!-- 未登入的状态 -->
            <template v-if="!isLogin">
              <ul class="grid-content df-aic-jcfe header-height">
                <li>
                  <router-link :to="{ name: 'login' }">登录</router-link>
                </li>
                <li class="ml20">
                  <router-link :to="{ name: 'reg' }">注册</router-link>
                </li>
              </ul>
            </template>
            <template v-else>
              <ul class="grid-content df-aic-jcfe header-height">
                <li class="userinfo-wrapper">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      用户信息
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        >昵称：{{ userInfo.name }}</el-dropdown-item
                      >
                      <el-dropdown-item>头像：IMG</el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="logout">退出登录</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li class="ml20">
                  <router-link :to="{ name: 'addpost' }">发帖</router-link>
                </li>
              </ul>
            </template>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "vheader",
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    logout() {
      console.log("cuowu");
      this.$Pageconfirm(
        "确定退出吗？",
        () => {
          localStorage.clear();
          this.$store.commit("setToken", "");
          this.$store.commit("setUserInfo", "");
          this.$store.commit("setIsLogin", false);
          this.$router.push({ name: "login" }, () => {});
        },
        () => {}
      );
    },
  },
};
</script>

<style lang="less">
.v-header-page-contanier {
  @height: 80px;
  background-color: #efefef;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: @height;
  border-bottom: 1px solid #ccc;

  .header-height {
    line-height: @height;
  }

  .ml20 {
    margin-left: 20px;
  }
  .userinfo-wrapper {
    .el-dropdown-selfdefine {
      font-size: 16px;
      position: relative;
      top: 1px;
      cursor: pointer;
    }
  }
}
</style>
