<template>
  <div>
    <el-form :model="phoneForm" :rules="rules" ref="phoneForm" label-width="80px"> 
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="phoneForm.phone" placeholder="手机号">
          <!-- slot="prepend" 在输入框中的前面 -->
          <el-select v-model="phoneForm.countryCode" slot="prepend" placeholder="请选择">
            <el-option label="+86" value="+86"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <!-- 手动验证拖动条 -->
      <el-form-item label="验证" prop="manualVerify">
        <BaseValidSlider :success="phoneForm.manualVerify" @callback="phoneForm.manualVerify = true" />
      </el-form-item>
      <!-- 获取手机验证码 -->
      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model.number="phoneForm.verifyCode" placeholder="请输入手机验证码">
          <!-- slot="append" 在输入框的后面 -->
          <!-- <el-button slot="append">获取验证码</el-button> -->
          <BaseButtonTimer slot="append" name="发送验证码" :time="countdown" @callback="sendPhoneCode" />
        </el-input>
      </el-form-item>
      <!-- 同意用户协议选择框 -->
      <el-form-item prop="accept">
        <el-checkbox v-model="phoneForm.accept">阅读并接受 <a href="#">《用户协议》</a></el-checkbox>
      </el-form-item>
      <!-- 下一步 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('phoneForm')" style="width:100%;">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  /**
   * @name 手机号验证
   * @author yulilong
   * @description 手机号验证组件，基于elemnentUi,   获取验证码API、校验验证码API等待完善
   * @prop null
   * @event getPhone 点击下一步按钮的回调
   * @returns {Object}phoneForm 手机表单数据：详情见下面 data
   */
  import BaseValidSlider from '../base/BaseValidSlider.vue';
  import BaseButtonTimer from '../base/BaseButtonTimer.vue';
  export default {
    components: {
      BaseValidSlider, BaseButtonTimer
    },
    data () {
      // var that = this;
      // 手动拖动滑块 校验
      var checkedManual = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请拖动滑块。'));
        } else {
          callback(); // 这个不写会导致提交验证无效
        }
      };
      // 勾选 用户协议 检测
      var checkedAccept = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请阅读并勾选同意。'));
        } else {
          callback();
        }
      };
      // 手机号正确性检测
      var checkedPhoneNumber = (rule, value, callback, that) => {
        var numberReg = /^[1][3-8][0-9]{9}$/; // 手机号匹配规则： 1. 第一位为1。   2. 第二位为3~8中的一个。   3. 最后9位为0~9中的一个。
        this.countdown = 0;                   // 重置发送验证码 按钮倒计时为0(禁止倒计时)
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (value.toString().length !== 11) {
          return callback(new Error('手机号长度不对(长度11位)'));
        } else {
          // 手机号格式正确，设置 发送验证码按钮倒计时为60秒
          if (numberReg.test(value)) {
            this.countdown = 20;
            callback();
          } else {
            return callback(new Error('手机号格式不对'));
          }
        }
      };
      return {
        // 手机表单数据
        phoneForm: {
          countryCode: '+86',       // 手机号 国家码
          phone: null,              // 手机号
          manualVerify: false,      // 手动验证
          verifyCode: null,         // 验证码
          accept: false             // 是否阅读用户协议
        },
        // 手机表单验证规则
        rules: {
          phone: [{ type: 'number', required: true, message: '请输入手机号。' },
                {validator: checkedPhoneNumber}
          ],
          manualVerify: [{ validator: checkedManual, trigger: 'blur' }],
          verifyCode: [{ type: 'number', required: true, message: '请输入验证码。' }],
          accept: [{ validator: checkedAccept }]
        },
        // 获取验证码按钮的倒计时 时间
        countdown: 0
      };
    },
    methods: {
      /**
       * 发送验证码按钮 处理事件
       * @returns {void}
      */
      sendPhoneCode () {
        // 手机号匹配规则： 1. 第一位为1。   2. 第二位为3~8中的一个。   3. 最后9位为0~9中的一个。
        var numberReg = /^[1][3-8][0-9]{9}$/;
        if (numberReg.test(this.phoneForm.phone)) {
          // 手机号校验通过，调用API 申请发送手机验证码。

          // TODO ： 发送验证码API调用
          this.$message('验证码已经发送，请注意接收短信！');
        } else {
          // 手机号码格式不对，提示输入正确的手机号。
          this.$message('请输入正确的手机号码，然后在点击发送验证码！');
        }
      },
      /**
       * 下一步按钮（提交按钮） 处理事件
       * @param {Object}formName 电话表单数据
       * @returns {void}
      */
      onSubmit (formName) {
        const that = this;
        that.$refs[formName].validate(valid => {
          if (valid) {
            // TODO： 验证码正确性API 调用
            // that.$jasHttp.post('/mock/phone/idCode', {code: that.phoneForm.verifyCode})
            // .then(res => {
            //   if (res.data.data.success) {
            //     this.$emit('getPhone', this.phoneForm);
            //   } else {
            //     console.log('验证码错误');
            //     that.$message.error(res.data.msg || '验证码错误请从新输入');
            //   }
            // });
            this.$emit('getPhone', this.phoneForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>
  /* 国家区号（+86）下拉列表样式 */
  .el-select {
    width: 80px;
  }
</style>