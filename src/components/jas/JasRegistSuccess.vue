<template>
  <div class="outwrapper">
    <div class="wrapper01">
      <div class="titletop">
        <i class="el-icon-success icon"></i>
        <span class="titlename">{{title}}</span>
      </div>
      <div class="middle padleft">
        <span> >> </span>
        <span class="count">{{count}}</span>
        <span>{{subtip}}</span>
      </div>
      <div class="bottom padleft">
        <span @click="gotonext">立即登录</span>
      </div>
    </div>
  </div>

</template>

<script>
  /**
   * @name 注册成功后的自动跳转组件
   * @author gf
   * @description 注册成功后的自动跳转组件
   * @prop begin
   * @prop title
   * @event callback 滑动到右侧后出发，一般在此处设置状态为成功
   */

  export default {
    props: {
      begin: { // 设定begin属性为true，开启定时器
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '恭喜您，注册成功！'
      }
    },
    data () {
      return {
        count: 5

      };
    },
    computed: {
      subtip () {
        return this.title === '恭喜您，注册成功！' ? '秒后自动登录' : '秒后自动跳转登录页面';
      }
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
        if (this.title === '恭喜您，注册成功！') {
          location.hash = '/view-home';
        } else {
          location.hash = '/view-login';
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .outwrapper {
    position: relative;
    min-height: 130px;
  }
  .wrapper01 {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

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
