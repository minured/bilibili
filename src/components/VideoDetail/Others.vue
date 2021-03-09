<template>
  <div>
    <!-- 发表评论, 弹出 -->
    <div class="publish-comment" :class="{ textareaShow: textareaShow }">
      <div class="inner">
        <div class="user-input">
          <!-- 头像 -->
          <img
            :src="userInfo.userImg"
            alt=""
            v-if="userInfo && userInfo.userImg"
          />
          <img src="@/assets/img/default_img.jpg" alt="" v-else />
          <!-- 输入框 -->
          <textarea
            type="text"
            placeholder="发条友善的评论"
            @focus="onInputFocus"
            v-model="commentModel.content"
            ref="inputEl"
            @blur="onInputBlur"
            rows="1"
          />
          <!-- 发表按钮 -->
          <span
            @click="publishComment"
            :class="{ onInput: isInput }"
            class="publish-btn"
          >
            发表
          </span>
        </div>
      </div>
    </div>

    <van-tabs v-model="active" sticky :color="biliColor">
      <!-- 推荐 -->
      <van-tab title="相关推荐">
        <div class="video-item-wrapper">
          <video-item
            v-for="(video, index) in commendData"
            :videoInfo="video"
            :key="index"
            class="video-item"
            @videoClick="onVideoClick"
          ></video-item>
        </div>
      </van-tab>

      <!-- 评论 -->
      <van-tab :title="`评论 ${comment_count}`">
        <div class="comment-content">
          <!-- 顶级回复和二级回复的 clcik 事件 -->
          <CommentList
            @commentLength="commentLength"
            @forward="$emit('forward')"
            @reply="onReply"
            ref="commentList"
            :flushComment="flushComment"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import VideoItem from "@/components/VideoItem";
import CommentList from "@/components/CommentList";
import dayjs from "dayjs";
import { publishComment } from "@/../http";
export default {
  data() {
    return {
      flushComment: 0,
      textareaShow: false,
      active: 1,
      commendContent: "",
      comment_count: 0,
      // commentModel: {
      //   comment_content: "",
      //   comment_date: "",
      //   parent_id: null,
      //   article_id: "",
      // },
      biliColor: "#fb7299",
      isInput: false,
    };
  },
  components: {
    VideoItem,
    CommentList,
  },
  props: ["commendData", "userInfo", "hasReply"],
  methods: {
    handleReplyFromVideoDetail() {
      console.log("handleReplyFromVideoDetail");
      this.$refs.inputEl.focus();
    },
    onReply(id) {
      this.$emit("reply", id);
      this.commentModel.parentId = id;
      this.$refs.inputEl.focus();
      // this.onInputFocus()
    },
    commentLength(length) {
      this.comment_count = length;
    },
    onVideoClick(videoId) {
      // 视频详情页,created来发ajax, 当地址改变时, 任然是同一页面, 不会再发ajax更新内容
      if (this.$route.params.id == videoId) {
        return;
      }
      this.$router.push("/videoDetail/" + videoId);
    },
    async submit() {
      if (!this.userInfo) {
        this.$toast.fail("请先登录");
        return;
      }
      // 正则校验 TODO
      if (!/^.{2,50}$/.test(this.commendContent)) {
        // console.log("校验失败");
        this.$toast.fail("至少两个字");
        return;
      }

      this.commentModel.comment_content = this.commendContent;
      this.commentModel.comment_date = dayjs().format("MM-DD");
      this.commentModel.article_id = this.$route.params.id;

      // console.log(this.commentModel);
      const res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.commentModel
      );
      // console.log(res);
      if (!res.data.code) {
        this.$toast.success("发表成功");

        // 刷新评论
        // 引用子组件的方法
        this.$refs.commentList.getCommentData();

        this.commendContent = "";
      } else {
        this.$toast.fail(res.data.msg);
      }
      this.parent_id = null;
    },
    onInputFocus() {
      this.isInput = true;
      // TODO 添加动画
      this.$refs.inputEl.rows = 3;
    },
    onInputBlur() {
      // blur事件和click不能同时触发，使用settimeout解决
      setTimeout(() => {
        this.isInput = false;
        // TODO 判断行数，调整回复的行数
        this.$refs.inputEl.rows = 1;
      }, 0);
    },
    async publishComment() {
      if (!this.userInfo) {
        this.$toast.fail("请先登录");
        return;
      }
      console.log(this.commentModel);
      // TODO
      if (!/^.{2,50}$/.test(this.commentModel.content.trim())) {
        this.$toast.fail("至少两个字");
        return;
      }
      const res = await publishComment(this.commentModel);
      if (res.data.status === 200) {
        this.flushComment += 1;
        this.$toast(res.data.message);
        this.commentModel.content = undefined;
      }
    },
  },
  mounted() {
    // 同步commentModel
    this.commentModel.videoId = this.$route.params.id;
    console.log(this.$route.params.id);
  },

  computed: {
    // 同步vuex的state
    commentModel: {
      get() {
        return this.$store.state.commentModel;
      },
      set(model) {
        console.log("set");
        this.$store.commit("updateCommentModel", model);
      },
    },

    notifyNestedReply() {
      return this.$store.state.notifyNestedReply;
    },
  },

  watch: {
    active: {
      immediate: true,
      handler() {
        // console.log("active");
        if (this.active === 1) {
          this.textareaShow = true;
        } else {
          this.textareaShow = false;
        }
      },
    },
    hasReply() {
      console.log("reply request from videoDetail");
      this.handleReplyFromVideoDetail();
    },
    // 利用监听vuex的state去触发事件
    notifyNestedReply() {
      console.log("handle nestedComment's reply");
      console.log(this.$store.state.commentModel.parentId);
      this.$refs.inputEl.focus()
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/baseStyle.scss";
.video-item-wrapper {
  margin-top: 0.833vw;
  display: flex;
  flex-wrap: wrap;
}
.publish-comment {
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  display: none;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 3000;
  padding: 1.067vw 0;
  display: none;
  &.textareaShow {
    display: block;
  }
  div.inner {
    padding: 0 3vw;
    .user-input {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      img {
        width: 8.333vw;
        height: 8.333vw;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 15px;
      }
      textarea {
        resize: none;
        flex: 1;
        border: none;
        outline: none;
        line-height: 7.222vw;
        border-radius: 4.167vw;
        padding: 0.278vw 2.3vw;
        background: #f4f4f4;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
        margin: 0 15px 0 0px;
      }

      span.publish-btn {
        // visibility: hidden;
        color: $bili-color;
        // TODO 实现切换动画
        // &.onInput {
        //   visibility: visible;

        // }
      }
    }
  }
}

.comment-content {
  margin-top: 4.167vw;
  padding: 0 4.167vw 2.778vw 4.167vw;
  // border: 1px solid red;
  margin-bottom: 29px;
}
</style>
