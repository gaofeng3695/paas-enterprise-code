

<template>
  <div class="header">
    <div class="logo item">

    </div>
    <div class="name item">
      <div class="china">云产品研发平台企业版</div>
      <div class="english">ENTERPRISE EDITION</div>
    </div>
    <el-select v-model="value" placeholder="请选择" class="select01">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="/static/images/loginbg.jpg"> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        name: 'linxin',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    computed: {
      username () {
        let username = this.$jasStorage.get('userInfo').userName;
        return username || this.name;
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'loginout') {
          this.$jasStorage.remove('token');
          this.$router.push('/');
        }
      }
    }
  };
</script>
<style lang="scss"  scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    height: 80px;
    font-size: 22px;
    line-height: 80px;
    color: #fff;
    margin: 0 -20px 0 -20px;
  }

  .logo {
    width: 80px;
    background: url(/static/images/logo.png) no-repeat center right;
    margin: 0 10px 0 0px;
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
  .item {
    height: 80px;
    line-height: 80px;
    color: white;
    float: left;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
  .el-select {
    margin-left: 20px;
    line-height: 20px;
  }
</style>
