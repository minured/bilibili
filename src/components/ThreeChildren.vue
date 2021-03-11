<template>
  <div class="page" v-if="commentList">
    <div
      class="comment-item"
      v-for="(item, i) in commentList.slice(0, 3)"
      :key="i"
    >
      <!-- {{ JSON.stringify(item) }} -->

      <div class="current-level" @click="sendCommentID(item.comment_id)">
        <div class="comment" @click="$emit('reply', item._id)">
          <!-- 评论用户名-->
          <div class="comment-info">
            <span class="user-name">{{ item.userInfo.nickname }}</span>
            <span style="font-size:3.46667vw;color: #212121">：</span>
          </div>

          <!-- 评论内容 -->
          <div class="comment-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div
      class="more-comment"
      @click="$emit('popAllChildren')"
    >
      查看全部{{ commentList.length }}条回复 >
    </div>
  </div>
</template>

<script>
export default {
  name: "threeComment",
  props: ["currentComment", "isLevel3"],
  data() {
    return {
      commentList: null,
    };
  },
  methods: {
    // 递归组件 层层向上发送事件
    // 评论id的传递路径： nestedComment => CommentList => Commend(在此发送)
    sendCommentID(id) {
      this.$emit("sendCommentID", id); //被每层的本递归组件 接收
    },
    continueSendID(id) {
      this.sendCommentID(id);
    },

    treeToArray(tree) {
      // 深拷贝
      function deepCopy(obj) {
        // 深度复制数组
        if (Object.prototype.toString.call(obj) === "[object Array]") {
          const object = [];
          for (let i = 0; i < obj.length; i++) {
            object.push(deepCopy(obj[i]));
          }
          return object;
        }
        // 深度复制对象
        if (Object.prototype.toString.call(obj) === "[object Object]") {
          const object = {};
          for (let p in obj) {
            object[p] = obj[p];
          }
          return object;
        }
      }
      //
      function tree2Array(treeObj, rootId) {
        const temp = []; // 设置临时数组，用来存放队列
        const out = []; // 设置输出数组，用来存放要输出的一维数组
        temp.push(treeObj);
        // 首先把根元素存放入out中
        let parentId = rootId;
        const obj = deepCopy(treeObj);
        obj.parentId = parentId;
        delete obj["children"];
        out.push(obj);
        // 对树对象进行广度优先的遍历
        while (temp.length > 0) {
          const first = temp.shift();
          const children = first.children;
          if (children && children.length > 0) {
            parentId = first._id;
            const len = first.children.length;
            for (let i = 0; i < len; i++) {
              temp.push(children[i]);
              const obj = deepCopy(children[i]);
              obj.parentId = parentId;
              delete obj["children"];
              out.push(obj);
            }
          }
        }
        return out;
      }

      const res = tree2Array(tree, null);
      res.splice(0, 1);
      this.commentList = res;
    },
  },
  mounted() {
    this.treeToArray(this.currentComment);
  },

  watch: {
    currentComment() {
      this.treeToArray(this.currentComment);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .more-comment {
    font-size: 3vw;
    color: #5090cc;
    padding-bottom: 0.667vw;
  }
}
.comment-item {
}
.current-level {
  // border: 1px solid red;
  display: flex;
  padding: 0.4vw 0;
  width: 100%;

  // 嵌套评论
  .comment {
    flex: 1;
    // border: 1px solid red;
    display: flex;
    align-items: center;

    .comment-info {
      // border: 1px solid red;
      .user-name {
        font-size: 3.46667vw;
        color: #5090cc;
      }
      white-space: nowrap;
      text-overflow: -o-ellipsis-lastline;
      // overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .comment-content {
      // border: 1px solid red;
      font-size: 3.46667vw;
      color: #212121;
      white-space: pre-line;
      word-break: break-word;
    }
  }
}
</style>
