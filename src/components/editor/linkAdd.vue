<template>
  <transition name="fade">
    <div class="edit-container edit-container-link" v-show="isShow">
      <p class="link-title">请输入合法链接</p>
      <el-input v-model="link" id="linkInput" />
      <div class="link-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "linkAdd",
  props: ["isShow"],
  data() {
    return {
      link: "",
    };
  },
  methods: {
    submit() {
      if (this.link === "") {
        document.getElementById("linkInput").focus();
        this.$pop("shake", "请输入合法的链接");
        return;
      }
      this.$emit("addEvent", this.link);
      setTimeout(() => {
        this.link = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.$emit("closeEvent");
      this.link = "";
    },
  },
};
</script>

<style lang="less">
.edit-container-link {
  width: 500px;
  .link-title {
    padding: 10px 0;
  }
  .link-footer {
    margin-top: 10px;
  }
}
</style>
