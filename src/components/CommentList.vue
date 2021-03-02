<template>
  <div v-if="commentList">
    <div class="comment-item" v-for="(item, index) in commentList" :key="index">
      <div class="comment-lv1">
        <div class="left">
          <img
            :src="item.userinfo.user_img"
            alt=""
            v-if="item.userinfo && item.userinfo.user_img"
          />
          <img src="@/assets/img/default_img.jpg" alt="" v-else />
        </div>
        <div class="right">
          <div class="comment-info">
            <div class="info-left">
              <p class="user-name" v-if="item.userinfo">
                {{ item.userinfo.name || "无名氏" }}
              </p>
              <p class="date">{{ item.comment_date || "no time" }}</p>
            </div>
            <div class="info-right">
              <span class="reply" @click="$emit('replyClick', item.comment_id)"
                >回复</span
              >
            </div>
          </div>
          <div class="comment-content">
            {{ item.comment_content }}
          </div>
          <div class="comment-operation">
            <!-- 点赞 -->
            <div @click="onZanSelected" class="comment-zan">
              <svg class="icon" aria-hidden="true" v-if="!zanSelected">
                <use xlink:href="#icon-zan2"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-zan2-selected-copy"></use>
              </svg>
              <span :class="{ 'selected-color': zanSelected }">{{
                zanNum
              }}</span>
            </div>

            <!-- 踩 -->
            <div class="comment-cai" @click="caiSelected = !caiSelected">
              <svg class="icon" aria-hidden="true" v-if="!caiSelected">
                <use xlink:href="#icon-cai"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-cai-selected"></use>
              </svg>
            </div>

            <!-- 转发 -->
            <div class="comment-forward" @click="forward = !forward">
              <svg class="icon" aria-hidden="true" v-if="!forward">
                <use xlink:href="#icon-forward"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-forward-selected"></use>
              </svg>
            </div>

            <!-- 气泡 -->
            <div class="comment-qipao" @click="qipaoSelected = !qipaoSelected">
              <svg class="icon" aria-hidden="true" v-if="!qipaoSelected">
                <use xlink:href="#icon-qipao"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-qipao-selected"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="nested-comment">
        <nested-comment
          :comment-children="item.children"
          @sendCommentID="onSendCommendID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NestedComment from "@/components/NestedComment.vue";

export default {
  data() {
    return {
      commentList: null,
      zanSelected: false,
      zanNum: 2356,
      caiSelected: false,
      forward: false,
      qipaoSelected: false,
    };
  },
  components: {
    NestedComment,
  },

  methods: {
    onZanSelected() {
      this.zanSelected = !this.zanSelected;
      this.zanSelected ? this.zanNum++ : this.zanNum--;
    },
    onSendCommendID(comment_id) {
      this.$emit("replyClick", comment_id);
    },
    async getCommentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentList = this.changeToTree(res.data);
      this.$emit("commentLength", res.data.length);
      console.log(this.commentList[2]);
    },
    changeToTree(data) {
      function fn(comment_id) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == comment_id) {
            arr.push(data[i]);
            data[i].children = fn(data[i].comment_id);
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
};
</script>

<style lang="scss" scoped>
@import "@/assets/iconStyle.scss";

.selected-color {
  color: $bili-color !important;
}
.comment-item {
  background: rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 2.778vw;
  padding-top: 2.778vw;
}
.comment-lv1 {
  display: flex;
  justify-content: flex-start;

  .left {
    //   border:1px solid red;
    img {
      width: 30px;
      height: 30px;
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
      .info-right {
        font-size: 2.8vw;
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          width: 3.889vw;
          height: 3.889vw;
          margin-right: 2px;
          margin-top: -2px;
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

    .comment-content {
      margin-top: 2.4vw;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
      margin-bottom: 2.222vw;
    }
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
.nested-comment {
  margin: 2.778vw 0 2.778vw 11.111vw;
  padding: 0 1.389vw;
  // border: 1px solid red;
  max-height: 200px;
  overflow: auto;
  background: #f4f4f4;
  border-radius: 1.111vw;
}
</style>
