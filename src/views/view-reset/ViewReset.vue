<template>
  <div class="view-reset">
    <JasHeaderLogin :type="2" />
    <JasWrapperLogin>
      <div class="content">
        <!-- 密码找回步骤条 -->
        <BaseSteps :active="step" :steps="['安全验证','重置密码','完成']" />
        <!-- 第一步： 手机号验证 -->
        <JasPhoneValidate v-if="step === 0" v-on:getPhone="getPhone" />
        <!-- 第二步： 输入新密码 -->
        <div v-if="step === 1">
          <el-form :model="resetPdForm" :rules="rules" ref="resetPdForm" label-width="80px">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="resetPdForm.newPassword" type="password" placeholder="请输入新密码" v-tip="{tip:promptInfo.password.tip}">
                <!--提示信息：'支持数字、字母，6-12个字符' -->
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="resetPdForm.confirmPassword" type="password" placeholder="请确认密码" v-tip="{tip:promptInfo.password.tip}">
              </el-input>
            </el-form-item>
            <!-- 下一步 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit('resetPdForm')" style="width:100%;">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 第三步： 提示密码找回成功 -->
        <div v-show="step === 2" class="view-reset-success">
          <JasRegistSuccess :begin="step === 2" title="恭喜您，密码重置成功！" />
        </div>
      </div>
    </JasWrapperLogin>
  </div>
</template>

<script>
  import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';     // 头部组件
  import BaseSteps from '../../components/base/BaseSteps.vue';              // 步骤条组件
  import JasPhoneValidate from '../../components/jas/JasPhoneValidate.vue'; // 电话号码验证
  import JasRegistSuccess from '../../components/jas/JasRegistSuccess.vue'; // 密码重置成功提示组件
  import JasWrapperLogin from '../../components/jas/JasWrapperLogin.vue';   // 密码找回框
  import jasValider from '../../assets/js/jas-valider';
  export default {
    components: {
      JasHeaderLogin, BaseSteps, JasPhoneValidate, JasRegistSuccess, JasWrapperLogin
    },
    data () {
      // // 新密码规则 验证： 使用字母、数字和符号两种及以上的组合，6-20个字符；
      // var checkedPasswordRule = (rule, value, callback) => {
      //   // 正则规则： 字母+数字，字母+特殊字符，数字+特殊字符
      //   const regular = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      //   if (!value) {
      //     return callback(new Error('密码不能为空'));
      //   } else if (value.toString().length < 6 || value.toString().length > 20) {
      //     return callback(new Error('密码的长度为6到12位'));
      //   } else {
      //     // 校验密码规则 匹配
      //     if (regular.test(value)) {
      //       callback();
      //     } else {
      //       return callback(new Error('密码组合不对：使用字母、数字和符号两种及以上的组合'));
      //     }
      //   }
      // };
      /**
       * 验证： 密码输入的只能是数字和字母
       * @param {Object}rule        表单验证规则
       * @param {Object}value       输入的值
       * @param {Object}callback    回调函数
       * @returns {Object}callback  回调函数
      */
      var checkedInputType = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(jasValider.password.requirement));  // 密码不能为空
        } else {
          // 如果密码长度 是6~12位才验证输入类型
          if (value.toString().length >= 6 && value.toString().length <= 12) {
            // 密码输入仅支持数字、字母，禁止输入其他符号
            const regular = /^[0-9a-zA-Z]+$/;
            if (regular.test(value)) {
              callback();
              // 两次密码输入一直验证
              if (this.resetPdForm.confirmPassword && this.resetPdForm.confirmPassword.toString().length >= 6) {
                this.$refs.resetPdForm.validateField('confirmPassword');
              }
            } else {
              return callback(new Error(jasValider.password.warning));  // '格式不正确'
            }
          } else {
            // if (value.toString().length < 6) return callback(new Error('密码太短，密码长度最少6位'));
            // if (value.toString().length > 12) return callback(new Error('密码太长，密码长度最多12位'));
            return callback(new Error(jasValider.password.warning));  // '格式不正确'
          }
        }
      };
      // 确认密码 是否与新密码一致 验证
      var checkedConfirmPd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('确认密码不能为空'));
        } else if (value.toString().length > 5 || value.toString().length < 21) {
          if (this.resetPdForm.newPassword === this.resetPdForm.confirmPassword) {
            // 密码确认没问题。
            callback();
          } else {
            return callback(new Error('两次密码不一致'));
          }
        } else {
          // 这里是超出密码规定长度了，已经在 rules里面限制了。
          return callback(new Error(jasValider.password.warning));  // '格式不正确'
        }
      };
      return {
        // 重置密码表单数据
        resetPdForm: {
          newPassword: '',        // 新密码
          confirmPassword: ''     // 确认新密码
        },
        // 密码重置表单验证规则
        rules: {
          newPassword: [
            { required: true, message: jasValider.password.requirement },   // 【必填项】不能为空
            { min: 6, max: 12, message: '长度在6到12个字符' },
            { validator: checkedInputType }  // 验证： 只能输入数字和字母
            // TODO: 密码复杂度验证以后再做
            // {validator: checkedPasswordRule}
          ],
          confirmPassword: [
            { required: true, message: jasValider.password.requirement },   // 【必填项】不能为空
            { min: 6, max: 12, message: '长度在6到12个字符' },
            { validator: checkedConfirmPd }   // 确认密码 是否与新密码一致
          ]
        },
        resetPdSwitcher: true,  // 密码重置API 防止重复发送开关： 一次请求结果返回才可以再次请求， true：可以发送， false：禁止发送
        phoneInfo: null,        // 获得的 手机号与验证码信息
        promptInfo: jasValider, // 表单提示信息
        step: 0                 // 步骤条
      };
    },
    methods: {
      /**
       * 手机验证组件回调函数 处理事件
       * @param {Object}data 电话表单数据
       * @returns {void}
      */
      getPhone (data) {
        this.step = 1;
        this.phoneInfo = data;
      },
      /**
       * 密码重置提交按钮 处理事件
       * @param {Object}formName 电话表单数据
       * @returns {void}
      */
      onSubmit (formName) {
        const that = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (that.resetPdForm.newPassword === that.resetPdForm.confirmPassword) {
              if (!that.phoneInfo || !that.phoneInfo.phone) {
                this.$notify({ message: '手机号不存在！！！！！', type: 'error' });
                return false;   // 验证没有通过
              }
              var params = {
                mobileNum: that.phoneInfo.phone + '',         // 手机号 字符串类型
                verifyCode: that.phoneInfo.verifyCode + '',   // 验证码 字符串类型
                password: that.resetPdForm.newPassword + ''   // 新密码 字符串类型
              };
              this.resetPassword(params);                     // 调用接口重置密码
            } else {
              this.$notify({ message: '两次密码不一致，请重新输入！！！！！', type: 'error' });
              return false;   // 验证没有通过
            }
          } else {
            return false;// 验证没有通过
          }
        });
      },
      /**
       * 密码重置API调用
       * @param {Object}params API接口参数
       * @returns {void}
      */
      resetPassword (params) {
        // 请求已经发送，还没有返回结果，则禁止再次发送请求。
        if (!this.resetPdSwitcher) {
          this.$notify({
            duration: 9000,
            message: '密码重置请求已经发送，请耐心等待。',
            type: 'info'
          });
          return;
        }
        this.resetPdSwitcher = false;   // 禁止请求重置密码API
        this.$jasHttp.post('/cloudlink-core-framework/login/resetPassword', params)
          .then(res => {
            // 密码重置成功：{"success":1,"code":"200","msg":"ok","rows":[{"booleanResult":true}]}
            if (res.data.success === 1 && res.data.msg === 'ok') {
              // 密码确认成功，进入第三步，提示密码修改成功
              this.step = 2;
            } else if (res.data.success === -1) {
              // 密码重置失败：{success:-1，msg："对应错误信息",code:"对应错误编码"}
              this.$notify({
                duration: 9000,
                message: '密码重置出错，错误信息：' + res.data.msg || '服务器连接失败，请您稍后再试',
                type: 'error'
              });
            } else {
              // 连开发人员都不知道的错误信息
              this.$notify({
                duration: 9000,
                message: '服务器连接失败，请您稍后再试',
                type: 'error'
              });
            }
            this.resetPdSwitcher = true;    // 可以再次请求重置密码API
          }).catch(err => {
            this.$notify({
              duration: 9000,
              message: '服务器连接失败，请您稍后再试',
              type: 'error'
            });
            console.log('密码重置出现异常：', err);
            this.resetPdSwitcher = true;    // 可以再次请求重置密码API
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  // 找回密码页面总样式
  .view-reset {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .view-reset {
    // 头部样式
    > :nth-child(1) {
      position: fixed;
      width: 100%;
    }
    // 正文样式
    > :nth-child(2) {
      box-sizing: border-box; 
      overflow: auto;
      border-top: 80px solid;
      height: 100%;
      width: 100%;
      background-color: #f4f7f8;
    }

    // 密码找回部分样式
    .content {
      padding-top: 10px;
    }
  }

  .view-reset .content {
    // 步骤条样式
    > :nth-child(1) {
      width: 500px;
      margin: 0 auto;
      // margin: 50px auto 0 auto;
    }
    // 手机号验证样式
    > :nth-child(2) {
      width: 410px;
      margin: 35px auto 0 auto;
      // margin: 50px auto 0 auto;
    }
    // 密码重置成功提示样式
    .view-reset-success {
      width: auto;
      margin-top: 110px;
    }
  }
</style>