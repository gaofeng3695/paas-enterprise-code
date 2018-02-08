<template>
  <div class="view-reset">
    <JasHeaderLogin :type="2" />
    <div>
      <div class="content">
        <!-- 密码找回进度条 -->
        <BaseSteps :active="step" :steps="['安全验证','重置密码','完成']" />
        <!-- 第一步： 手机号验证 -->
        <JasPhoneValidate v-if="step === 0" v-on:getPhone="getPhone" />
        <!-- 第二步： 输入新密码 -->
        <div v-if="step === 1">
          <el-form :model="resetPdForm" :rules="rules" ref="resetPdForm" label-width="80px">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="resetPdForm.newPassword" type="password" placeholder="请输入新密码">
              </el-input>
              <p>使用字母、数字和符号两种及以上的组合，6-20个字符</p>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="resetPdForm.confirmPassword"  type="password" placeholder="请确认密码">
              </el-input>
            </el-form-item>
            <!-- 下一步 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit('resetPdForm')" style="width:100%;">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 第三步： 提示密码找回成功 -->
        <div  v-show="step === 2" class="view-reset-success">
          <JasRegistSuccess :begin="step === 2" title="恭喜您，密码重置成功！"/>
        </div>
        
      </div>
      <p class="copyright">版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1</p>
    </div>
  </div>
</template>

<script>
  import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';     // 头部组件
  import BaseSteps from '../../components/base/BaseSteps.vue';              // 步骤条组件
  import JasPhoneValidate from '../../components/jas/JasPhoneValidate.vue'; // 电话号码验证
  import JasRegistSuccess from '../../components/jas/JasRegistSuccess.vue'; // 电话号码验证
  export default {
    components: {
      JasHeaderLogin, BaseSteps, JasPhoneValidate, JasRegistSuccess
    },
    data () {
      // 新密码规则 验证： 使用字母、数字和符号两种及以上的组合，6-20个字符；
      var checkedPasswordRule = (rule, value, callback) => {
        // 正则规则： 字母+数字，字母+特殊字符，数字+特殊字符
        const regular = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (value.toString().length < 6 || value.toString().length > 20) {
          return callback(new Error('密码的长度为6到12位'));
        } else {
          if (regular.test(value)) {
            callback();
          } else {
            return callback(new Error('密码给不对：使用字母、数字和符号两种及以上的组合'));
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
        }
      };
      return {
        // 重置密码表单数据
        resetPdForm: {
          newPassword: '',
          confirmPassword: ''
        },
        // 密码重置表单验证规则
        rules: {
          newPassword: [
            {required: true, message: '请输入新密码'},
            { min: 6, max: 20, message: '长度在6到20个字符' },
            {validator: checkedPasswordRule}
          ],
          confirmPassword: [
            {required: true, message: '请确认新密码'},
            { min: 6, max: 20, message: '长度在6到20个字符' },
            {validator: checkedConfirmPd}
          ]
        },
        step: 0                // 步骤条
      };
    },
    methods: {
      /**
       * 手机验证组件回调函数 处理事件
       * @param {Object}phoneInfo 电话表单数据
       * @returns {void}
      */
      getPhone (phoneInfo) {
        this.step = 1;
        console.log('得到的电话表单：', phoneInfo);
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
              // 密码确认成功，进入第三步，提示密码修改成功
              that.step = 2;
            } else {
              that.$notify({
                message: '两次密码不一致，请重新输入！！！！！',
                type: 'error'
              });
            }
          } else {
            that.$notify({
              message: '有必填项没有填！！！',
              type: 'error'
            });
            return false;
          }
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
      overflow: scroll;
      border-top: 80px solid;
      height: 100%;
      width: 100%;
      background-color: #f4f7f8;
    }
    // 密码找回输入信息部分样式
    .content {
      margin: 100px auto auto auto;
      height: 450px;
      width: 700px;
      background-color: #fff;
      border: 1px solid #f4f7f8;    // 防止外边距合并 颜色与父元素背景色一直 隐藏
    }
    // 版权信息
    .copyright {
      margin: 20px auto auto auto;
      width: 500px;
    }
  } 

  .view-reset .content {
    // 步骤条样式
    > :nth-child(1) {
      width: 500px;
      margin: 50px auto 0 auto;
    }
    // 手机号验证表单组件、输入新密码 样式
    > :nth-child(2) {
      width: 500px;
      margin: 50px auto 0 auto;
    }
    // 密码重置成功提示样式
    .view-reset-success {
      width: 310px;
      margin:50px auto;
    }
  }
  
  

  
</style>