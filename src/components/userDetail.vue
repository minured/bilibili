<template>
  <div class="user-detail">
    <!-- 上部，头像和编辑资料 -->
    <div class="detail-part1">
      <img
        :src="userInfo.userImg"
        alt=""
        v-if="userInfo.userImg"
        class="part1-left"
      />
      <img
        src="@/assets/img/default_img.jpg"
        alt=""
        class="part1-left"
        v-else
      />
      <div class="part1-right">
        <div>
          <div class="count-item">
            <span class="num">4</span>
            <span class="type">粉丝</span>
          </div>
          <span class="split"></span>
          <div class="count-item">
            <span class="num">134</span>
            <span class="type">关注</span>
          </div>
          <span class="split"></span>
          <div class="count-item">
            <span class="num">15</span>
            <span class="type">获赞</span>
          </div>
        </div>
        <div @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>
    <!-- 下部，昵称签名uid -->
    <div class="detail-part2">
      <p class="name">
        {{ userInfo.nickname }}
        <svg class="icon" aria-hidden="true">
          <use
            :xlink:href="
              userInfo.gender === 0 ? '#icon-female' : '#icon-male'
            "
          ></use>
        </svg>
      </p>
      <p class="line2">
        <span class="introduction" v-if="userInfo.userDesc">{{
          userInfo.userDesc
        }}</span>
        <span class="introduction" v-else>这个人很神秘, 什么都没有写</span>
        <a href="" @click.prevent="showUid = !showUid">{{
          showUid ? "展开" : "收起"
        }}</a>
      </p>
      <p class="uid" v-show="showUid">uid: {{ userInfo.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUid: false,
      uidBtnText: "展开",
    };
  },
  methods: {},
  props: ["userInfo"],
};
</script>

<style lang="scss" scoped>
@import "../assets/iconStyle.scss";
.user-detail {
  background: white;
  padding: 3.333vw;
  .detail-part1 {
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .part1-left {
      width: 23.333vw;
      height: 23.333vw;
      border-radius: 50%;
      margin-top: -8.333vw;
    }
    .part1-right {
      width: 61.111vw;
      //   border: 1px solid red;
      & > div {
        // border: 1px solid red;
      }
      div:nth-child(1) {
        display: flex;
        // justify-content: space-around;
        align-items: center;
        margin-bottom: 1.389vw;
        .split {
          width: 1px;
          height: 5.556vw;
          background: #e7e7e7;
          // vertical-align: middle;
        }
        .count-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .num {
            color: #212121;
            font-size: 3.73333vw;
          }
          .type {
            color: #999;
            font-size: 2.93333vw;
          }
        }
      }
      div:nth-child(2) {
        color: #fb7299;
        border: 1px solid #fb7299;
        font-size: 3.73333vw;
        width: 100%;
        height: 8vw;
        line-height: 8vw;
        text-align: center;
        border-radius: 1.389vw;
      }
    }
  }
  .detail-part2 {
    // border: 1px solid red;
    .name {
      margin-bottom: 1.389vw;
      font-size: 4.8vw;
    }
    p.line2 {
      margin: 0;
      margin-bottom: 0.556vw;
      display: flex;
      .introduction {
        flex: 1;
        font-size: 3.46667vw;
        color: #999;
      }
      a {
        font-size: 3.46667vw;
        color: #1389bf;
      }
    }

    p.uid {
      margin: 0;
      display: inline;
      color: #505050;
      background: #f4f4f4;
      font-size: 3.333vw;
      padding: 0.278vw 0.556vw;
      border-radius: 0.556vw;
    }
  }
}
</style>
