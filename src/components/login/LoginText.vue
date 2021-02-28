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
            content: ""
        }
    },
    props:['label', 'type', 'placeholder', 'rule'],
    methods: {
        ruleJudge(){
            // 把字符串转换成正则
            const rule = new RegExp(this.rule)
            if (rule.test(this.content)) {
                this.$emit('onContentUpdate', this.content)
            }
        }
 
    },
    watch: {
        content(){
            this.ruleJudge()
        }
    }
}
</script>

<style>

</style>