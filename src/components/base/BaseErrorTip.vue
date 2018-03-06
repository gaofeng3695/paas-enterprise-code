<template>
  <div class="error-tip">
    <!-- 错误的字体图标 -->
    <div class="error-icon"> <i class="el-icon-remove"></i> </div>
    <!-- 错误信息 -->
    <div class="error-info">{{errorInfo}}</div>
  </div>
</template>

<script>
  /**
   * @name 错误信息显示
   * @author yulilong
   * @description 主要用于调用API时返回错误信息的显示，基于elemnentUi
   * @prop errorInfo  错误信息
   */
  export default {
    props: {
      errorInfo: { type: String, default: '发生了错误！' }    // 出错的信息
    }
  };
</script>

<style lang="scss" scoped>
  // 总体样式
  .error-tip {
    border: 1px solid #ea7751;
    background-color: #fbe6e6;
    border-radius: 5px;
    line-height: 15px;
    position: relative;
  }
  // 字体图标样式
  .error-icon {
    color: red;
    height: 100%;
    position: absolute;
    text-align: center;
    width: 45px;
    i {
      vertical-align: middle;
    }
  }
  .error-icon:before{
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  // 错误信息样式
  .error-info {
    margin: 5px 5px 5px 45px;
  }
</style>