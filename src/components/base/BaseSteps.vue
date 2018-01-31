<template>
  <div class="jas-steps">
    <el-steps :active="active" process-status="finish" finish-status="success" simple style="margin-top: 20px">
      <template v-for="step in steps">
        <el-step :title="step" :key="step"></el-step>
      </template>
    </el-steps>
  </div>
</template>

<script>
  export default {
    props: {
      steps: { // header类型，1是欢迎注册 2是忘记密码
        type: Array,
        default: () => ['步骤 1', '步骤2']
      },
      active: {
        type: Number,
        default: 0
      }
    }
  };
</script>

<style lang="scss" scoped>
  .jas-steps /deep/ .el-steps {
    .el-step__title.is-process {
      color: #3598db;
    }
    .el-step__head.is-process {
      color: #3598db;
      border-color: #3598db;
    }
  }
</style>