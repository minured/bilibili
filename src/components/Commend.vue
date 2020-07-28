<template>
  <div>
    <van-tabs v-model="active" sticky>
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
      <van-tab :title="`评论 ${comment_count}`">
        <div class="commend-wrapper">
          <div class="user-input">
            <img :src="userInfo.user_img" alt="" v-if="userInfo && userInfo.user_img" />
            <img src="@/assets/img/default_img.jpg" alt="" v-else />
            <input
              type="text"
              placeholder="发个友善的评论"
              @focus="onInputFocus"
              v-model="commendContent"
              ref="inputEl"
            />
            <span @click="submit">发布</span>
          </div>
        </div>
        <div class="commend-wrapper">
          <!-- 顶级回复和二级回复的 clcik 事件 -->
          <comment-list
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
      active: 0,
      commendContent: "",
      comment_count: 0,
      commentModel: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: "",
      },
    };
  },
  components: {
    VideoItem,
    CommentList,
  },
  props: ["commendData", "userInfo"],
  methods: {
    onReplyClick(parent_id) {
      console.log(parent_id)
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
        console.log("校验失败");
        this.$toast.fail('至少两个字')
        return;
      }

      this.commentModel.comment_content = this.commendContent;
      this.commentModel.comment_date = dayjs().format("MM-DD");
      this.commentModel.article_id = this.$route.params.id;

      console.log(this.commentModel);
      const res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.commentModel
      );
      console.log(res);
      if (!res.data.code) {
        this.$toast.success("发表成功");
        
        // 刷新评论
        this.$refs.commentList.getCommentData()

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
    },
  },
};
</script>

<style lang="scss" scoped>
.video-item-wrapper {
  margin-top: 0.833vw;
  display: flex;
  flex-wrap: wrap;
}
.commend-wrapper {
  margin-top: 4.167vw;
  padding: 0 4.167vw 2.778vw 4.167vw;
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
      margin-right: 2.778vw;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      line-height: 7.222vw;
      border-radius: 4.167vw;
      padding: 0.278vw 2.778vw;
      background: #f4f4f4;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
      margin-right: 2.778vw;
    }
    span {
      background: #fb7299;
      line-height: 7.222vw;
      padding: 0.556vw 2.778vw 0 2.778vw;
      height: 7.222vw;
      border-radius: 3.611vw;
      color: white;
    }
  }
}
</style>
