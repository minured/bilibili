<template>
  <div>
    <van-field
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
      v-model="content"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  props: ["label", "type", "placeholder", "rule", "inputType"],
  methods: {
    ruleJudge() {
      // 把字符串转换成正则
      // 通过检验才更新父组的件值，否则置空
      const rule = new RegExp(this.rule);
      if (rule.test(this.content)) {
        this.$store.commit("setInputTips", undefined);
        this.$emit("onContentUpdate", this.content);
      } else {
        this.$emit("onContentUpdate", undefined);
        let message = undefined;
        switch (this.inputType) {
          case "nickname":
            message = "昵称要求2-10位";
            break;
          case "username":
            message = "账号要求6-16位";
            break;
          case "password":
            message = "密码要求6-16位";
            break;
        }

        this.$store.commit("setInputTips", message);
      }
    },
  },
  watch: {
    content() {
      this.ruleJudge();
    },
  },
};
</script>

<style></style>
