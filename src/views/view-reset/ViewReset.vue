<template>
  <div class="view-reset">
    <JasHeaderLogin :type="2" />
    <div>
      <div class="content">
        <BaseSteps :avtive="0" :steps="['安全验证','重置密码','完成']" />
        <JasPhoneValidate v-on:getPhone="getPhone" />
        
      </div>
      <p class="copyright">版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1</p>
    </div>
  </div>
</template>

<script>
  import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';     // 头部组件
  import BaseSteps from '../../components/base/BaseSteps.vue';              // 步骤条组件
  // import MoveValidate from '../../components/base/MoveValidate.vue';              // 步骤条组件
  import JasPhoneValidate from '../../components/jas/JasPhoneValidate.vue';              // 电话号码验证
  export default {
    components: {
      JasHeaderLogin, BaseSteps, JasPhoneValidate
    },
    data () {
      return {
        verifyPhoneForm: {
          phone: '',
          verifyCode: ''
        },
        select: '3'
      };
    },
    methods: {
      tt () {
        console.log('11111111');
      },
      getPhone (phoneInfo) {
        console.log('得到的电话表单：', phoneInfo);
      }
    }
  };
</script>

<style lang="scss" scoped>

   
  // 找回密码页面总样式
  .view-reset {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .view-reset {
    // 头部样式
    > :nth-child(1) {
      position: fixed;
      width: 100%;
    }
    // 正文样式
    > :nth-child(2) {
      box-sizing: border-box; 
      overflow: scroll;
      border-top: 80px solid;
      height: 100%;
      width: 100%;
      background-color: #f4f7f8;
    }
    // 密码找回输入信息部分样式
    .content {
      margin: 150px auto auto auto;
      height: 470px;
      width: 720px;
      background-color: #fff;
      border: 1px solid;
    }
    // 版权信息
    .copyright {
      margin: 20px auto auto auto;
      width: 500px;
    }
  } 

  .content {
    // 步骤条样式
    > :nth-child(1) {
      width: 500px;
      margin: 20px auto 0 auto;
    }
    // 手机号验证表单组件样式
    > :nth-child(2) {
      width: 500px;
      margin: 20px auto 0 auto;
    }
  }
  
  

  
</style>