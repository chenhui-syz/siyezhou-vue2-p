<template>
  <div class="home-page-container">
    <v-header></v-header>
    <div class="w-1200 home-mainbody">
      <vSidebar></vSidebar>
      <div class="operate-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "@/components/common/vHeader.vue";
import vSidebar from "@/components/common/vSidebar.vue";
export default {
  components: { vHeader, vSidebar },
  name: "home",
};
</script>

<style lang="less">
.home-page-container {
  padding-top: 80px;

  .home-mainbody {
    display: flex;
  }

  .operate-area {
    flex: 1;
    border: 1px solid #ccc;
  }
}
</style>
