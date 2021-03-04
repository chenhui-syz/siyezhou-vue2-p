<template>
  <transition name="fade">
    <div class="edit-container edit-container-img" v-show="isShow">
      <h3 class="upimg-title">插入图片</h3>
      <el-input
        id="fileInput"
        placeholder="粘贴图片地址或者点击上传"
        v-model="picLink"
      />
      <label for="uploadImg" class="upimg-label">
        点我上传图片
      </label>
      <input
        type="file"
        name="file"
        id="uploadImg"
        class="real-upload-btn"
        @change="upload"
      />
      <div>
        <el-button type="primary" @click="submit()">确认</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from "@/api/content";
import config from "@/config";
export default {
  name: "imgUpload",
  props: ["isShow"],
  data() {
    return {
      picLink: "",
      picBinary: "",
    };
  },
  methods: {
    close() {
      // 清空输入内容/选择的文件
      this.$emit("closeEvent");
      this.picLink = "";
      this.picBinary = "";
    },
    upload(e) {
      let file = e.target.files;
      let formData = new FormData();
      if (file.length > 0) {
        formData.append("file", file[0]);
        this.picBinary = formData;
      }
      // 上传图片之后=>uploadImg
      uploadImg(this.picBinary).then((res) => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? config.baseUrl.pro
              : config.baseUrl.dev;
          this.picLink = baseUrl + res.data;
          // 清空input里value，这样下次上传才能监听到上传事件
          document.getElementById("uploadImg").value = "";
        }
      });
    },
    submit() {
      if (this.picLink === "") {
        this.$pop("shake", "请上传图片或输入图片链接");
        return;
      }
      this.$emit("addEvent", this.picLink);
      setTimeout(() => {
        // 恢复初始的状态
        this.picLink = "";
        this.picBinary = "";
        this.$emit("closeEvent");
      }, 0);
    },
  },
};
</script>

<style lang="less">
.edit-container-img {
  width: 500px;
  .upimg-title {
    padding: 10px 0;
    font-weight: 400;
  }
  .upimg-label {
    padding: 10px 0;
    display: block;
    cursor: pointer;
  }
  .real-upload-btn {
    display: none;
  }
}
</style>
