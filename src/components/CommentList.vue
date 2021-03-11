<template>
  <div v-if="commentList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <div
        v-for="(item, index) in currentList"
        :key="index"
        :title="item"
        class="comment-item"
      >
        <!-- 一级评论 -->
        <div class="comment-lv1">
          <!-- 左边头像 -->
          <div class="left">
            <img
              :src="item.userInfo.userImg"
              alt=""
              v-if="item.userInfo && item.userInfo.userImg"
            />
            <img src="@/assets/img/default_img.jpg" alt="" v-else />
          </div>
          <!-- 右边整块，包括名字和内容 -->
          <div class="right">
            <div class="comment-info">
              <div class="info-left">
                <p class="user-name">
                  {{ item.userInfo.nickname || "无名氏" }}
                </p>
                <p class="date">{{ item.date || "no time" }}</p>
              </div>

              <div class="info-right"></div>
            </div>
            <div class="comment-content">
              {{ item.content }}
            </div>
            <!-- 仅本地效果， 独立点亮TODO，可以在评论列表加字段 -->
            <div class="comment-operation">
              <!-- 点赞 -->
              <div @click="onZanSelected" class="comment-zan">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zan2"></use>
                </svg>
                <!-- <span :class="{ 'selected-color': zanSelected }">{{
                  zanNum
                }}</span> -->
              </div>

              <!-- 踩 -->
              <div class="comment-cai" @click="caiSelected = !caiSelected">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-cai"></use>
                </svg>
                <!-- <svg class="icon" aria-hidden="true" v-else>
                  <use xlink:href="#icon-cai-selected"></use>
                </svg> -->
              </div>

              <!-- 转发 -->
              <div class="comment-forward" @click="$emit('forward')">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-forward"></use>
                </svg>
                <!-- <svg class="icon" aria-hidden="true" v-else>
                  <use xlink:href="#icon-forward-selected"></use>
                </svg> -->
              </div>

              <!-- 气泡 -->
              <div class="comment-qipao" @click="$emit('reply', item._id)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qipao"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 当前仅显示三条二级评论 -->
        <div class="three-children" v-if="item.children.length > 0">
          <ThreeChildren
            @reply="onReply"
            :currentComment="item"
            @popAllChildren="onPopAllChildren(index)"
            :showAllChildren="showAllChildren"
          />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// import NestedComment from "@/components/NestedComment.vue";
import ThreeChildren from "@/components/ThreeChildren";
import { getVideoComment } from "@/../http";

export default {
  data() {
    return {
      // vant_list的参数
      loading: false,
      finished: false,

      // 当前显示评论
      currentList: null,
      // 全部评论
      commentList: null,
      currentPage: 10,

      showAllChildren: true,

      zanSelected: false,
      zanNum: 2356,
      caiSelected: false,
      forward: false,
      isFlushComment: false,
    };
  },
  props: ["flushComment"],
  components: {
    // NestedComment,
    ThreeChildren,
  },

  methods: {
    onReply(id) {
      this.$emit("reply", id);
    },
    onPopAllChildren(index) {
      this.$store.commit("loadIndex", index);
      this.showAllChildren = true;
      this.$store.commit("loadPopStatus", true);
    },
    // 列表触底加载
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        // 这里的加载列表可以直接覆盖之前的，因为vue会做类似dom diff
        this.currentPage += 10;
        this.currentList = this.commentList.slice(0, this.currentPage + 10);
        this.loading = false;
        if (this.currentPage >= this.commentList.length) {
          // 有问题
          this.finished = true;
        }
      }, 1000);
    },
    onZanSelected() {
      this.zanSelected = !this.zanSelected;
      this.zanSelected ? this.zanNum++ : this.zanNum--;
    },
    onSendCommendID(comment_id) {
      this.$emit("replyClick", comment_id);
    },
    async getCommentData() {
      const res = await getVideoComment(this.$route.params.id);
      this.commentList = this.changeToTree(res.data);

      // 评论后刷新：继承上次当前评论展示数
      let sliceIndex = 10;
      if (this.isFlushComment) {
        if (this.commentList.length - this.currentPage > 0) {
          this.currentPage += 10;
        }
        sliceIndex = this.currentPage;
      }
      this.currentList = this.commentList.slice(0, sliceIndex);

      // 除了方法还可以当作传数据
      this.$emit("commentLength", res.data.length);
      // 把commentList载入store
      this.$store.commit("loadComment", this.commentList);
    },

    // 优化评论结构
    changeToTree(data) {
      // 每条评论文档的_id
      function fn(commentId) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId == commentId) {
            arr.push(data[i]);
            data[i].children = fn(data[i]._id);
          }
        }
        return arr;
      }
      return fn(null);
    },
  },
  created() {
    this.getCommentData();
  },
  watch: {
    $route() {
      this.getCommentData();
    },
    flushComment() {
      this.isFlushComment = true;
      this.getCommentData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/iconStyle.scss";

.selected-color {
  color: $bili-color !important;
}
.comment-item {
  // background: rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 4.167vw;
  padding-top: 2.778vw;
}
.comment-lv1 {
  // background: rgba($color: #000000, $alpha: 0.1);
  display: flex;
  justify-content: flex-start;

  .left {
    img {
      width: 8.333vw;
      height: 8.333vw;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 2.778vw;
      padding-top: 0.556vw;
    }
  }

  .right {
    flex: 1;
    .comment-info {
      display: flex;
      justify-content: space-between;

      // 名字和日期
      .info-left {
        //   border: 1px solid red;
        .user-name {
          font-size: 3.467vw;
          color: #757575;
        }
        .date {
          margin-top: 1.2vw;
          font-size: 3.2vw;
          height: 3.2vw;
          line-height: 3.2vw;
          color: #999;
        }
      }
      // 回复按钮
      .info-right {
        font-size: 2.8vw;
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          width: 3.889vw;
          height: 3.889vw;
          margin-right: 0.556vw;
          margin-top: -0.556vw;
        }
        .reply {
          font-size: 3.333vw;
          color: #5090cc;
        }
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
    // 评论内容
    .comment-content {
      margin-top: 2.4vw;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
      margin-bottom: 2.222vw;
    }
    // 点赞收藏转发
    .comment-operation {
      font-size: 3.4667vw;
      // border: 1px solid red;
      display: flex;
      div {
        margin-right: 4.167vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div.comment-zan {
        span {
          margin-top: 0.556vw;
          margin-left: 0.556vw;
          color: #8a8a8a;
        }
      }
    }
  }
}
// 次级评论
.three-children {
  margin: 2.778vw 0 0 11.111vw;
  padding: 0 1.389vw;
  // border: 1px solid red;
  max-height: 55.556vw;
  overflow: auto;
  background: #f4f4f4;
  border-radius: 1.111vw;
}
</style>
