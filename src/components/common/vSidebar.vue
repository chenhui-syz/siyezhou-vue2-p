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
          <li>我的信息</li>
          <li>修改基本资料</li>
          <li>修改密码</li>
          <li>修改邮箱</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="活动中心" name="3">
        <ul class="sidebar-wrapper">
          <li>天天签到</li>
          <li>积分抽奖</li>
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
    }
  }
}
</style>
