<template>
  <div>
      <div class="login-top">
          <div></div>
          <div>{{topMiddle}}</div>
          <div class="top-right">
              <slot name="right"/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:["topMiddle", "topRight", "toPage"],
    methods:{
        switchPage(){
            this.$router.push(this.toPage)
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-top {
        background: white;
        height: 12.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.444vw;
        
        div {
            flex:1;/* 平分空间 */
            // border: 1px solid red;
            text-align: center;
        }
        .top-right {
            font-size: 3.889vw;
        }
  
    }
</style>