<template>
  <div>
    <JasHeaderLogin :type="1" />
    <div style="width:660px;margin:0 auto;">
      <BaseSteps :avtive="0" :steps="['设置用户名','填写账号信息','设置企业信息','注册成功']" />
    </div>
    <JasRegistSuccess :begin="true" />
  </div>

</template>

<script>
  import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';
  import JasRegistSuccess from '../../components/jas/JasRegistSuccess.vue';
  import BaseSteps from '../../components/base/BaseSteps.vue';
  export default {
    components: {
      JasHeaderLogin, BaseSteps, JasRegistSuccess
    }
  };
</script>

<style lang="scss" scoped>

</style>
