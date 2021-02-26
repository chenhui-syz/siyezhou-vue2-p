<template>
  <div class="addpost-page-container">
    <div class="w-1200">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 富文本编辑框 -->
        <div class="edit-wrap">
          <div class="">
            <div class="">
              <div class="rc-edit" ref="icons">
                <!-- 表情 -->
                <span @click="choose(0)" ref="face">
                  <span>表情</span>
                </span>
                <!-- 图片 -->
                <span @click="choose(1)" ref="img">
                  <span>图片</span>
                </span>
                <!-- 链接 -->
                <span @click="choose(2)" ref="link">
                  <span>链接</span>
                </span>
              </div>
              <textarea
                id="editContent"
                class="rc-editor"
                name="content"
                v-model="content"
                @focus="focusEvent"
                @blur="blurEvent"
              ></textarea>
            </div>
          </div>
          <div ref="modal">
            <face
              :isShow="current === 0"
              @closeEvent="closeModal()"
              @addEvent="addFace"
            ></face>
            <img-upload
              :isShow="current === 1"
              @closeEvent="closeModal()"
              @addEvent="addPic"
            ></img-upload>
            <link-add
              :isShow="current === 2"
              @closeEvent="closeModal()"
              @addEvent="addLink"
            ></link-add>
          </div>
        </div>
        <el-form-item label="悬赏分">
          <el-select v-model="form.fav" placeholder="发表后无法修改">
            <el-option label="20" value="20"></el-option>
            <el-option label="60" value="60"></el-option>
            <el-option label="100" value="100"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Face from "@/components/editor/face";
import ImgUpload from "@/components/editor/imgUpload";
import LinkAdd from "@/components/editor/linkAdd";
export default {
  name: "addpost",
  components: {
    Face,
    LinkAdd,
    ImgUpload,
  },
  data() {
    return {
      form: {
        title: "",
        fav: "",
        code: "",
      },
      current: "",
      content: "",
      pos: "",
    };
  },
  // 每次页面上的DOM元素发生改变的时候触发
  updated() {
    this.$emit("changeContent", this.content);
  },
  methods: {
    handleBodyClick(e) {
      e.stopPropagation();
      // 触发隐藏本组件的关闭事件,改变isShow
      // 判断是否点击到了非控制ICON以外的地方+本组件的地方
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.current = "";
      }
    },
    focusEvent() {
      this.getPos();
    },
    blurEvent() {
      this.getPos();
    },
    // 计算光标的当前位置
    getPos() {
      let cursorPos = 0;
      let elem = document.getElementById("editContent");
      if (document.selection) {
        //IE
        let selectRange = document.selection.createRange();
        selectRange.moveStart("character", -elem.value.length);
        cursorPos = selectRange.text.length;
      } else if (elem.selectionStart || elem.selectionStart === "0") {
        cursorPos = elem.selectionStart;
      }
      this.pos = cursorPos;
    },
    closeModal() {
      this.current = "";
    },
    choose(index) {
      if (index === this.current) {
        this.closeModal();
      } else {
        this.current = index;
      }
    },
    // 添加表情
    addFace(item) {
      console.log(item);
      const insertContent = ` face${item}`;
      this.insert(insertContent);
      this.pos = insertContent.length;
    },
    // 添加图片链接
    addPic(item) {
      const insertContent = ` img[${item}]`;
      this.insert(insertContent);
      this.pos = insertContent.length;
    },
    // 添加链接
    addLink(item) {
      const insertContent = ` (${item})[${item}]`;
      this.insert(insertContent);
      this.pos = insertContent.length;
    },
    insert(val) {
      if (typeof this.content === "undefined") {
        return;
      }
      let tmp = this.content.split("");
      tmp.splice(this.pos, 0, val);
      this.content = tmp.join("");
    },
  },
  mounted() {
    this.$nextTick(() => {
      document
        .querySelector("body")
        .addEventListener("click", this.handleBodyClick);
    });
  },
  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.handleBodyClick);
  },
};
</script>

<style lang="less">
.addpost-page-container {
  .w-1200 {
    margin-top: 20px;
  }

  /* 简易编辑器 */
  .rc-edit {
    position: relative;
    display: block;
    top: 1px;
    left: 0;
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 2px 2px 0 0;
    background-color: #fbfbfb;
  }
  .rc-edit span {
    cursor: pointer;
    padding: 0 10px;
    line-height: 38px;
    color: #009e94;
  }
  .rc-edit span i {
    position: relative;
    padding-right: 6px;
    font-size: 18px;
  }
  .rc-edit span:hover {
    color: #5db276;
  }

  .fade-leave-active {
    animation: bounceOut 0.3s;
  }

  .fade-enter-active,
  .fade-enter-to {
    animation: bounceIn 0.3s;
  }

  .edit-wrap {
    position: relative;

    .rc-editor {
      height: 260px;
      width: 100%;
      line-height: 20px;
      padding: 6px 10px;
      resize: none;
      border-radius: 0 0 2px 2px;
      border-width: 1px;
      border-style: solid;
      background-color: #fff;
    }

    .quote {
      font-size: 22px;
      vertical-align: middle;
      position: relative;
      top: 4px;
    }
  }

  .edit-content {
    position: absolute;
    top: 45px;
    left: 0;
  }
}
</style>
