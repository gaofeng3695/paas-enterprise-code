<template>
  <div>
    统计信息
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业信息" name="first">
        <BaseChartLineForTimeData />
      </el-tab-pane>
      <el-tab-pane label="应用信息 " name="second">应用信息</el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import BaseChartLineForTimeData from './../../../components/base/BaseChartLineForTimeData';

  export default {
    data () {
      return {
        activeName: 'first'
      };
    },
    components: {
      BaseChartLineForTimeData
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="sass" scoped>

</style>