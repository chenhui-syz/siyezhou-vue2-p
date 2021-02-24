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
            <template v-else class="grid-content df-aic-jcfe">
              <div class="grid-content df-aic-jcfe"></div>
            </template>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
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
}
</style>
