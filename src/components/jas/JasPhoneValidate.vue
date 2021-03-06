<template>
  <div>
    <el-form :model="phoneForm" :rules="rules" ref="phoneForm" label-width="80px">
      <!-- API返回错误信息显示 -->
      <el-form-item v-show="showErrorInfo">
        <BaseErrorTip :errorInfo="APIErrorInfo" />
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="phoneForm.phone" placeholder="手机号" v-tip="{tip:promptInfo.tel.tip}">
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
        <el-input v-model="phoneForm.verifyCode" placeholder="请输入手机验证码" v-tip="{tip:'请输入验证码'}">
          <!-- slot="append" 在输入框的后面 -->
          <BaseButtonTimer slot="append" name="发送验证码" :time="countdown" @callback="sendPhoneCode" />
        </el-input>
      </el-form-item>
      <!-- 同意用户协议选择框 -->
      <el-form-item prop="accept">
        <el-checkbox v-model="phoneForm.accept" @change="checkedAcceptValue()">阅读并接受
          <a href="#">《用户协议》</a>
        </el-checkbox>
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
  import BaseValidSlider from '../base/BaseValidSlider.vue';    // 手动滑块
  import BaseButtonTimer from '../base/BaseButtonTimer.vue';    // 倒计时按钮
  import jasValider from '../../assets/js/jas-valider';         // 表单输入项、验证的提示信息
  import BaseErrorTip from '../base/BaseErrorTip.vue';          // 错误信息显示组件
  export default {
    components: {
      BaseValidSlider, BaseButtonTimer, BaseErrorTip
    },
    data () {
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
        var numberReg = jasValider.tel.regexp; // 手机号匹配规则
        this.countdown = 0;                   // 重置发送验证码 按钮倒计时为0(禁止倒计时)
        if (!value) {
          return callback(new Error(jasValider.tel.requirement));   // 手机号不能为空
        } else if (value.toString().length !== 11) {
          return callback(new Error(jasValider.tel.warning));       // 格式不正确
        } else {
          // 手机号格式正确，设置 发送验证码按钮倒计时为60秒
          if (numberReg.test(value)) {
            this.countdown = 60;
            callback();
          } else {
            return callback(new Error(jasValider.tel.warning)); // 格式不正确
          }
        }
      };
      return {
        APIErrorInfo: '',           // API返回的错误信息
        showErrorInfo: false,       // 是否显示错误信息组件
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
          phone: [{ type: 'number', required: true, message: jasValider.tel.requirement },  // '【必填项】不能为空'
          { validator: checkedPhoneNumber }
          ],
          manualVerify: [{ validator: checkedManual, required: true, trigger: 'change' }],
          verifyCode: [{ required: true, message: '请输入验证码。' }],
          accept: [{ validator: checkedAccept, required: true, trigger: 'change' }]
        },
        promptInfo: jasValider, // 表单提示信息
        // 获取验证码按钮的倒计时 时间
        countdown: 0
      };
    },
    computed: {
      /**
       * 手动滑块 滑动后触发验证事件
       * @returns {void} phoneForm.manualVerify
      */
      touchManualVerify () {
        return this.phoneForm.manualVerify;
      }
    },
    watch: {
      /**
       * 手动滑块 滑动后触发验证事件
       * @returns {void}
      */
      touchManualVerify: function () {
        this.$refs.phoneForm.validateField('manualVerify');
      }
    },
    methods: {
      /**
       * 勾选统一按钮后 触发统一按钮验证
       * @returns {void}
      */
      checkedAcceptValue () {
        this.$refs.phoneForm.validateField('accept');
      },
      /**
       * 发送验证码按钮 处理事件
       * @returns {void}
      */
      sendPhoneCode () {
        // 手机号匹配规则： 1. 第一位为1。   2. 第二位为3~8中的一个。   3. 最后9位为0~9中的一个。
        var numberReg = /^[1][3-8][0-9]{9}$/;
        if (numberReg.test(this.phoneForm.phone)) {
          // 获取手机验证码API接口参数
          var params = {
            sendMode: '1',                        // 验证类型必填： 1手机 2邮箱，默认为手机， 目前只支持手机
            sendNum: this.phoneForm.phone + '',   // 接收验证码账号，必选，字符串类型，手机号码或邮箱，目前只支持手机
            signName: '中盈安信',                  // 验证码签名即应用签名，必选，字符类型，如巡线卫士、中盈安信
            useCategory: 'general'                // 使用场景，必选: 通用general 注册regist 登录 login
          };
          // 发送验证码API调用
          this.$jasHttp.post('/cloudlink-core-framework/verfy/getVerifyCode', params)
            .then(res => {
              // 成功发送验证码信息：{"success":1,"code":"200","msg":"ok","rows":[{"verifyCode":"验证码"}]}
              if (res.data.success === 1 && res.data.msg === 'ok') {
                this.showErrorInfo = false;    // 关闭错误信息显示组件
                this.$notify({ message: '验证码已经发送，请注意接收短信！', type: 'success' });
              } else if (res.data.success === -1) {
                // 获取验证码失败：{success:-1，msg："对应错误信息",code:"对应错误编码"}
                this.APIErrorInfo = '获取验证码出错，错误信息：' + res.data.msg || '服务器连接失败，请您稍后再试';
                this.showErrorInfo = true;    // 显示API报错信息
                // this.$notify({ message: '获取验证码出错，错误信息：' + res.data.msg || '服务器连接失败，请您稍后再试', type: 'error' });
              } else {
                // 连开发人员都不知道的错误信息
                this.APIErrorInfo = '服务器连接失败，请您稍后再试';
                this.showErrorInfo = true;    // 显示API报错信息
              }
            }).catch(err => {
              this.APIErrorInfo = '服务器连接失败，请您稍后再试';
              this.showErrorInfo = true;    // 显示API报错信息
              console.log('获取验证码出现异常：', err);
            });
        } else {
          // 手机号码格式不对，提示输入正确的手机号。
          this.APIErrorInfo = '请输入正确的手机号码，然后在点击发送验证码！';
          this.showErrorInfo = true;
          // this.$notify({ message: '请输入正确的手机号码，然后在点击发送验证码！', type: 'error' });
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
            var params = {
              sendNum: that.phoneForm.phone + '',           // 接收验证码的号码，手机号或邮箱，必选，字符串类型
              verifyCode: that.phoneForm.verifyCode + ''    // 验证码，必选，字符串类型】
            };
            // 校验验证码API 调用
            that.$jasHttp.get('/cloudlink-core-framework/verfy/checkVerifyCode', params)
              .then(res => {
                // 校验 验证码成功： {"success":1,"code":"200","msg":"ok","rows":[{}]}
                if (res.data.success === 1 && res.data.msg === 'ok') {
                  // that.$message.success('验证码没问题');
                  this.showErrorInfo = false;    // 关闭错误信息显示组件
                  that.$emit('getPhone', that.phoneForm);
                } else if (res.data.success === -1) {
                  // 校验 验证码失败：{success:-1，msg："对应错误信息",code:"对应错误编码"}
                  this.APIErrorInfo = '验证码不对：' + res.data.msg || '服务器连接失败，请您稍后再试';
                  this.showErrorInfo = true;    // 显示API报错信息
                  // that.$notify({ message: '验证码有误，错误信息：' + res.data.msg || '服务器连接失败，请您稍后再试', type: 'error' });
                  return false;
                } else {
                  // 连开发人员都不知道的错误信息
                  this.APIErrorInfo = '服务器连接失败，请您稍后再试';
                  this.showErrorInfo = true;    // 显示API报错信息
                  return false;
                }
              }).catch(err => {
                this.APIErrorInfo = '服务器连接失败，请您稍后再试';
                this.showErrorInfo = true;    // 显示API报错信息
                console.log('校验验证码出现异常：', err);
              });
          } else {
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