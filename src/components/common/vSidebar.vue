<template>
  <div class="v-sidebar-page-contanier">
    <el-collapse @change="handleChange">
      <el-collapse-item title="网站中心" name="1">
        <ul class="sidebar-wrapper">
          <li><router-link :to="{name:'postlist'}">帖子列表</router-link></li>
          <li><router-link :to="{name:'essencelist'}">精华帖</router-link></li>
          <li><router-link :to="{name:'hotrank'}">热度排行</router-link></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="个人中心" name="2">
        <ul class="sidebar-wrapper">
          <li><router-link :to="{name:'info'}">我的信息</router-link></li>
          <li><router-link :to="{name:'updatebasicinfo'}">修改基本资料</router-link></li>
          <li><router-link :to="{name:'updatepassword'}">修改密码</router-link></li>
          <li><router-link :to="{name:'updateemail'}">修改邮箱</router-link></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="活动中心" name="3">
        <ul class="sidebar-wrapper">
          <li><router-link :to="{name:'register'}">天天签到</router-link></li>
          <li><router-link :to="{name:'lottery'}">积分抽奖</router-link></li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less">
@height: 80px;
.v-sidebar-page-contanier {
  font-size: 22px;
  width: 300px;

  .sidebar-wrapper{
    line-height: 40px;

    li{
      cursor: pointer;
      padding-left: 10px;

      &:hover{
        background-color: #efefef;
      }

      a{
        width: 100%;
        height: 100%;
        display: inline-block;
      }

    }
  }
}
</style>
