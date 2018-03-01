<template>
  <div class="wrapper">
    <JasWrapperLogin>
      <div>这里写表单等内容</div>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
    </JasWrapperLogin>
  </div>

</template>

<script>
  import JasWrapperLogin from '../../../components/jas/JasWrapperLogin.vue';
  export default {
    components: {
      JasWrapperLogin
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    background: #f90;
  }
</style>