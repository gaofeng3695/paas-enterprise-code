<template>
  <div>
    <div class="titletop">
      <i class="el-icon-success icon"></i>
      <span class="titlename">恭喜您，注册成功！</span>
    </div>
    <div class="middle padleft">
      <span> >> </span>
      <span class="count">{{count}}</span>
      <span>秒后自动登录</span>
    </div>
    <div class="bottom padleft">
      <span @click="gotonext">立即登录</span>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      begin: { // 设定begin属性为true，开启定时器
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        count: 5
      };
    },
    watch: {
      begin () {
        if (this.begin) {
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.count--;
            if (this.count === 0) {
              clearInterval(this.timer);
              this.gotonext();
            }
          }, 1000);
        } else {
          clearInterval(this.timer);
          this.count = 5;
        }
      }
    },
    methods: {
      gotonext () {
        location.hash = '/view-home';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .padleft {
    padding-left: 60px;
  }
  .titletop {
    .icon {
      font-size: 45px;
      line-height: 54px;
      color: #31cc71;
    }
    .titlename {
      padding-left: 8px;
      vertical-align: top;
    }
    height: 54px;
    line-height: 54px;
    font-size: 22px;
  }
  .middle {
    height: 26px;
    line-height: 26px;
    .count {
      color: #db585e;
    }
  }
  .bottom {
    height: 48px;
    line-height: 48px;
    color: #169aed;
    span {
      cursor: pointer;
    }
  }
</style>
