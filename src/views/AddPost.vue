<template>
  <div class="addpost-page-container">
    <div class="w-1200">
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 富文本编辑框 -->
        <div class="edit-wrap">
          <!-- 操作栏 -->
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
          <!-- 输入区域 -->
          <textarea
            id="editContent"
            class="rc-editor"
            name="content"
            v-model="content"
            @focus="focusEvent"
            @blur="blurEvent"
          ></textarea>
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
        <el-form-item label="验证码">
          <el-input v-model="ruleForm.code"></el-input>
          <span
            class="svg"
            style="color: #c00;"
            @click="_getCode()"
            v-html="svg"
          ></span>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit('ruleForm')">立即发布</el-button>
    </div>
  </div>
</template>

<script>
import Face from "@/components/editor/face";
import ImgUpload from "@/components/editor/imgUpload";
import LinkAdd from "@/components/editor/linkAdd";
import { addPost } from "@/api/content";
import CodeMix from "@/mixin/login";
window.vue = this;
export default {
  name: "addpost",
  mixins: [CodeMix],
  components: {
    Face,
    LinkAdd,
    ImgUpload,
  },
  data() {
    return {
      ruleForm: {
        title: "",
        code: "",
      },
      current: "",
      // 当前全部的文本内容
      content: "",
      // 光标的位置
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
      // 接收到用户选择插入的内容，然后拼接成实际需要的格式
      const insertContent = ` face${item}`;
      // 插入到文本区域
      this.insert(insertContent);
      // 把光标的位置根据插入内容的长度后移
      this.pos += insertContent.length;
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
      // 将当前文本内容打散成一个数组
      let tmp = this.content.split("");
      // 在光标的位置插入内容
      tmp.splice(this.pos, 0, val);
      this.content = tmp.join("");
    },
    submit(ruleForm) {
      console.log("xxx");
      if(this.content.trim() === ''){
        this.$pop('shake','请输入帖子内容')
        return 
      }
      // this.$pop('shake','请上传图片或输入图片链接')
      // this.$alert("文章内容不能为空");
      // this.$Pageconfirm(
      //   '确定退出吗？',
      //   () => {

      //   },
      //   () => {}
      // )
      this.$refs[ruleForm].validate((valid) => {
        // 验证通过，提交表单
        if (valid) {
          console.log("验证通过，提交表单");
          addPost({
            // username: this.ruleForm.email,
            // password: this.ruleForm.password,
            // code: this.ruleForm.code,
            // sid: this.$store.state.sid,
          })
            .then((res) => {
              if (res.code === 200) {
                console.log(res);
              } else if (res.code === 401) {
                console.log("出现错误");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 不通过
          console.log("error submit!!");
          return false;
        }
      });
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
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes bounceOut {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }
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
    color: #409eff;
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
    margin-bottom: 20px;

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
      box-sizing: border-box;
      border-color: #ccc;
    }

    .quote {
      font-size: 22px;
      vertical-align: middle;
      position: relative;
      top: 4px;
    }
  }
}
</style>
