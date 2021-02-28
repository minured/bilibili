<template>
  <div v-if="model" class="page-wrapper">
    <div class="navbar-wrapper">
      <NavBar :userInfo="model" />
    </div>
    <div class="edit-list">
      <div class="user-img">
        <van-uploader
          :after-read="afterRead"
          class="upload-btn"
          preview-size="100vw"
        />
        <editItem label="头像" has-border="true">
          <img
            :src="model.user_img"
            alt=""
            slot="right"
            v-if="model.user_img"
          />
          <img src="@/assets/img/default_img.jpg" alt="" slot="right" v-else />
        </editItem>
      </div>

      <editItem
        label="昵称"
        has-border="true"
        :rightText="model.name"
        @itemClick="onNameClick"
      />
      <editItem label="UID" has-border="true" :rightText="model.username" />
      <editItem
        label="性别"
        has-border="true"
        @itemClick="onGenderClick"
        :rightText="model.gender === '1' ? '男' : '女'"
      />
      <editItem label="个性签名" @itemClick="onDescClick" />
    </div>
    <div class="btns-wrapper">
      <EditBtn text="退出登录" hasBorder="true" @btnClick="onLogout" />
      <EditBtn text="返回空间" @btnClick="backToUserInfo" />
    </div>

    <!-- 昵称编辑 -->
    <!-- TODO  添加正则校验 -->
    <van-dialog
      v-model="namePopShow"
      title="昵称"
      show-cancel-button
      @confirm="onNameConfirm"
      @cancel="inputContent = ''"
    >
      <van-field v-model="inputContent" placeholder="请输入昵称" autofocus />
    </van-dialog>

    <!-- 个性签名编辑 -->
    <van-dialog
      v-model="descPopShow"
      title="个性签名"
      show-cancel-button
      @confirm="onDescConfirm"
      @cancel="inputContent = ''"
    >
      <van-field
        v-model="inputContent"
        placeholder="请输入个性签名"
        autofocus
        type="textarea"
      />
    </van-dialog>
    <!-- 性别选择 -->
    <van-action-sheet
      v-model="genderSelectShow"
      :actions="genderList"
      @select="onGenderSelect"
      close-on-click-action
      cancel-text="取消"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import EditItem from "@/components/editItem";
import EditBtn from "@/components/EditBtn";

export default {
  components: {
    NavBar,
    EditItem,
    EditBtn,
  },
  data() {
    return {
      model: {},
      namePopShow: false,
      inputContent: "",
      descPopShow: false,
      genderSelectShow: false,
      genderList: [
        { name: "男", id: 1 },
        { name: "女", id: 0 },
      ],
    };
  },
  methods: {
    async getUserInfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      console.log(res);
      this.model = res.data[0];
    },
    async afterRead(file) {
      // FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据
      const formdata = new FormData();
      formdata.append("file", file.file);
      const res = await this.$http.post("/upload", formdata);
      //   console.log(res)
      this.model.user_img = res.data.url;
      this.updateInfo();
    },
    async updateInfo() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      console.log(res);
      if (res.data.code === 200) {
        this.$toast.success("更新成功");
      }
    },
    onNameClick() {
      console.log("click");
      this.namePopShow = true;
    },
    onNameConfirm() {
      console.log("confirm");
      this.model.name = this.inputContent;
      this.inputContent = "";
      this.updateInfo();
    },
    onDescClick() {
      this.descPopShow = true;
    },
    onDescConfirm() {
      this.model.user_desc = this.inputContent;
      this.inputContent = "";
      this.updateInfo();
    },
    onGenderClick() {
      this.genderSelectShow = true;
    },
    onGenderSelect(item) {
      console.log("select");
      console.log(item);
      this.model.gender = item.id.toString();
      this.updateInfo();
    },
    onLogout() {
      console.log("logout");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    backToUserInfo() {
      console.log("back");
      this.$router.back();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped lang="scss">
.page-wrapper {
  .navbar-wrapper {
    margin-bottom: 2.778vw;
  }
  .edit-list {
    margin-bottom: 2.778vw;
    .user-img {
      position: relative;
      overflow: hidden;
      .upload-btn {
        border: 1px solid red;
        width: 100%;
        position: absolute;
        opacity: 0;
      }
    }
  }
}
</style>
