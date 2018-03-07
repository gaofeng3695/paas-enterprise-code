<template>

  <div class="header">
    <div class="logo item">

    </div>
    <div class="name item">
      <div class="china">云产品研发平台企业版</div>
      <div class="english">ENTERPRISE EDITION</div>
    </div>
    <div class="title item">
      {{title}}
    </div>
    <div class="switch item">
      <span v-if="type===2">
        <span class="link" @click="gotoregist">注册</span>
        <span> | </span>
        <span class="link" @click="gotologin">登录</span>
      </span>
      <span v-else>
        <span class="grey01">已有账号？</span>
        <span class="link" @click="gotologin">马上登录</span>
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      type: { // header类型，1是欢迎注册 2是忘记密码
        type: Number,
        default: 1
      }
    },
    data () {
      return {

      };
    },
    computed: {
      title () {
        return this.type === 1 ? '欢迎注册' : '找回密码';
      }
    },
    methods: {
      gotologin () {
        location.hash = '/view-login';
      },
      gotoregist () {
        location.hash = '/view-regist';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    overflow: hidden;
    height: 80px;
    background: #282d40;
    .logo {
      width: 80px;
      background: url(/static/images/logo.png) no-repeat center right;
      margin: 0 10px 0 0px;
    }
    .grey01 {
      color: #a4a5a9;
    }
    .title {
      padding-left: 22px;
      font-size: 20px;
      font-weight: 600;
    }
    .name {
      .china {
        height: 50px;
        font-size: 24px;
        font-weight: 600;
        line-height: 74px;
      }
      .english {
        text-align: center;
        line-height: 16px;
        font-size: 8px;
        letter-spacing: 6px;
      }
    }
    .switch {
      float: right;
      padding-right: 22px;
      span.link {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .item {
    height: 80px;
    line-height: 80px;
    color: white;
    float: left;
  }
</style>
