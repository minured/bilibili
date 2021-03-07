<template>
  <div>
    <!-- 发表评论, 弹出 -->
    <div class="publish-comment" :class="{ textareaShow: textareaShow }">
      <div class="inner">
        <div class="user-input">
          <!-- 头像 -->
          <img
            :src="userInfo.user_img"
            alt=""
            v-if="userInfo && userInfo.user_img"
          />
          <img src="@/assets/img/default_img.jpg" alt="" v-else />
          <!-- 输入框 -->
          <textarea
            type="text"
            placeholder="发条友善的评论"
            @focus="onInputFocus"
            v-model="commendContent"
            ref="inputEl"
            @blur="onInputBlur"
            rows="1"
          />
          <!-- 发表按钮 -->
          <span :class="{ onInput: isInput }">发表</span>
        </div>
      </div>
    </div>

    <van-tabs v-model="active" sticky animated swipeable :color="biliColor">
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
            @replyClick="onReplyClick"
            ref="commentList"
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
export default {
  data() {
    return {
      textareaShow: false,
      active: 1,
      commendContent: "",
      comment_count: 0,
      commentModel: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: "",
      },
      biliColor: "#fb7299",
      isInput: false,
    };
  },
  components: {
    VideoItem,
    CommentList,
  },
  props: ["commendData", "userInfo"],
  methods: {
    onReplyClick(parent_id) {
      // console.log(parent_id);
      this.$refs.inputEl.focus();
      this.commentModel.parent_id = parent_id;
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
      if (!this.userInfo) {
        this.$toast.fail("请先登录");
        return;
      }
      this.isInput = true;
      // TODO 添加动画
      this.$refs.inputEl.rows = 3;
    },
    onInputBlur() {
      this.isInput = false;
      // TODO 判断行数，调整回复的行数
      this.$refs.inputEl.rows = 1;
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
  z-index: 10;
  padding: 1.067vw 1.333vw;
  display: none;
  &.textareaShow {
    display: block;
  }
  div.inner {
    padding: 0 1.333vw;
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
        padding: 0.278vw 2.778vw;
        background: #f4f4f4;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
        margin: 0 15px 0 0px;
      }

      span {
        display: none;
        color: $bili-color;
        // TODO 实现切换动画
        &.onInput {
          display: inline;
        }
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
