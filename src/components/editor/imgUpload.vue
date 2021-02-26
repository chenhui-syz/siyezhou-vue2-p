<template>
  <transition name="fade">
    <div
      class="edit-content"
      v-show="isShow"
    >
      <div class="">插入图片</div>
      <div class="">
        <ul class="">
          <li class="">
            <label for class="">URL</label>
            <div class="">
              <input
                type="text"
                id="fileInput"
                class=""
                placeholder="粘贴图片地址或者点击上传"
                v-model="pic"
              />
            </div>
            <button type="button" class="">
              <label for="uploadImg">
                <i class=""></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class=""
              @change="upload"
            />
          </li>
          <li class="">
            <button type="button" class="" @click="submit()">
              确认
            </button>
          </li>
        </ul>
      </div>
      <span class="" @click.stop="close()">
        <a
          href="javascript:;"
          class=""
        ></a>
      </span>
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
      pic: "",
      formData: "",
    };
  },
  methods: {
    close() {
      // 清空输入内容/选择的文件
      this.$emit("closeEvent");
      this.pic = "";
      this.formData = "";
    },
    upload(e) {
      let file = e.target.files;
      let formData = new FormData();
      if (file.length > 0) {
        formData.append("file", file[0]);
        this.formData = formData;
      }
      // 上传图片之后=>uploadImg
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? config.baseUrl.pro
              : config.baseUrl.dev;
          this.pic = baseUrl + res.data;
          // 清空input里value，这样下次上传才能监听到上传事件
          document.getElementById("uploadImg").value = "";
        }
      });
    },
    submit() {
      if (this.pic === "") {
        document.getElementById("fileInput").focus();
        this.$pop("shake", "请上传图片或输入图片链接");
        return;
      }
      this.$emit("addEvent", this.pic);
      setTimeout(() => {
        // 恢复初始的状态
        this.pic = "";
        this.formData = "";
        this.$emit("closeEvent");
      }, 0);
    },
  },
};
</script>

<style lang="less">
</style>
