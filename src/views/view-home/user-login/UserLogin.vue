<template>
  <div>
    <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
    <br/>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>

    <div style="margin-top: 15px;">
      <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="input5" class="input-with-select">
        <!-- <el-button slot="append" type="primary">搜索</el-button> -->
        <BaseButtonTimer slot="append" name="发送验证码" :time="35" />
      </el-input>
      <BaseButtonTimer slot="append" name="发送验证码" :time="5" @callback="clickbutton" />
    </div>

  </div>

</template>

<script>
  import BaseButtonTimer from './../../../components/base/BaseButtonTimer';
  export default {
    components: {
      BaseButtonTimer
    },
    data () {
      return {
        value: '',
        input5: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    methods: {
      clickbutton () {
        console.log(123);
      }
    }
  };
</script>

<style lang="sass" scoped>

</style>