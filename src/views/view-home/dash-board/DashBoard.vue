<template>
  <div class="main">
    <h2>组件演示</h2>

    <div>
      <div class="line">滑动验证</div>
      <BaseValidSlider :success="success" @callback="success = true" />
      <el-button @click="success=!success">切换</el-button>
    </div>
    <div>
      <div class="line">倒计时按钮</div>
      <div style="margin-top: 15px;">
        <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="input5" class="input-with-select">
          <BaseButtonTimer slot="append" name="确定" :time="35" @callback="clickbutton" />
        </el-input>
        <BaseButtonTimer name="发送验证码" :time="5" @callback="clickbutton" />
      </div>
    </div>
    <div>
      <div class="line">步骤条</div>
      <BaseSteps :steps="['步骤一','步骤二','步骤三','步骤四']" :active="active" />
      <el-button @click="active++">下一步</el-button>
      <el-button @click="active=0">重置</el-button>
    </div>

    <div class="line">注册成功</div>
    <JasRegistSuccess :begin="isbegin" />
    <el-button @click="isbegin = true">开始</el-button>
    <el-button @click="isbegin = false">重置</el-button>

  </div>

</template>

<script>
  import BaseValidSlider from '../../../components/base/BaseValidSlider';
  import BaseButtonTimer from '../../../components/base/BaseButtonTimer';
  import BaseSteps from '../../../components/base/BaseSteps';
  import JasRegistSuccess from '../../../components/jas/JasRegistSuccess';
  export default {
    data () {
      return {
        input5: '',
        success: false,
        active: 0,
        isbegin: false
      };
    },
    components: {
      BaseValidSlider, BaseButtonTimer, BaseSteps, JasRegistSuccess
    },
    methods: {
      clickbutton () {
        this.$message('这是一条消息提示');
      }
    }

  };
</script>

<style scoped>
  .line {
    border-radius: 4px 0 0 4px;
    border-left: 4px solid #50bfff;
    height: 40px;
    line-height: 40px;
    background: #ecf8ff;
    padding: 4px 12px;
    margin: 20px 0 10px;
    font-size: 16px;
    font-weight: 600;
  }
</style>