<template>
  <transition name="fade">
    <div class="edit-content" v-show="isShow">
      <div class="edit-contanier">
        <ul class="edit-wrapper clearfix">
          <li
            v-for="(value, key) in lists"
            class="edit-item"
            :key="'face' + key"
            @click="handleFaceClick(key)"
          >
            <img :src="value" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from "@/assets/js/face";
export default {
  name: "face",
  data() {
    return {
      lists: faces,
    };
  },
  props: ["isShow"],
  methods: {
    handleFaceClick(item) {
      this.$emit("closeEvent");
      this.$emit("addEvent", item);
    },
  },
};
</script>

<style lang="less">
.edit-contanier {
  text-align: left;

  .edit-wrapper {
    position: relative;
    width: 372px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .edit-item {
      cursor: pointer;
      float: left;
      border: 1px solid #e8e8e8;
      height: 22px;
      width: 26px;
      overflow: hidden;
      margin: -1px 0 0 -1px;
      padding: 4px 2px;
      text-align: center;
    }
  }
}
</style>
