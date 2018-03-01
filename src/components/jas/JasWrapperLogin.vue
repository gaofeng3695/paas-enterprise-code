<template>
  <div class="wrapper">
    <div class="subwrapper">
      <slot></slot>
    </div>
    <p class="copyright">版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1</p>
  </div>

</template>
<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
  }
  .subwrapper {
    width: 900px;
    height: 500px;
    margin-top: 50px;
    margin: 50px auto auto;
    background: #fff;
    border-radius: 6px;
  }
  .copyright {
    width: 100%;
    text-align: center;
    padding-top: 30px;
  }
</style>
