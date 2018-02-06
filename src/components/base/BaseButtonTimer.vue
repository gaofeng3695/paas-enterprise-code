<template>
  <el-button type="primary" @click="begin">{{trueName}}</el-button>
</template>

<script>
  /**
   * @name 带倒计时的按钮
   * @author gf
   * @description 带倒计时的按钮，基于elemnentUi
   * @prop name
   * @prop time
   * @event callback 点击按钮后的回调
   */
  export default {
    props: {
      name: { // 按钮名称
        type: String,
        default: '确定'
      },
      time: { // 倒计时，秒数
        type: Number,
        default: 60
      }
    },
    data () {
      return {
        timeself: 0
      };
    },
    computed: {
      trueName () {
        if (this.timeself) {
          return this.timeself + ' s';
        }
        return this.name;
      },
      trueTime () {
        return this.timeself || this.time;
      }
    },
    methods: {
      begin () {
        if (this.timeself) {
          return;
        }
        this.$emit('callback');
        this.timeself = this.time;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          // 只有当时间大于0秒的时候才倒计时
          if (this.timeself > 0) {
            this.timeself--;
          }
          // 当时间小于1秒的时候停止倒计时
          if (this.timeself < 1) {
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    mounted () {
      setTimeout(() => (this.$el.style.width = this.$el.clientWidth + 'px'));
    }
  };
</script>

<style lang="scss" scoped>

</style>