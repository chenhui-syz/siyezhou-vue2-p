<template>
  <transition name="fade">
    <div
      class="edit-content"
      v-show="isShow"
    >
      <div class="">请输入合法链接</div>
      <div class="">
        <input
          type="text"
          class=""
          v-model="link"
          id="linkInput"
        />
      </div>
      <span class="" @click="cancel()">
        <a
          href="javascript:;"
          class=""
        ></a>
      </span>
      <div class="">
        <a class="" @click.prevent="submit()">确定</a>
        <a class="" @click.prevent="cancel()">取消</a>
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

<style lang="less"></style>
