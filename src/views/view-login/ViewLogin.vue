<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title maincolor">云产品研发平台企业版</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <el-form-item prop="username">
          <el-input prefix-icon="fa fa-user" v-model.number="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock" type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="tip maincolor clearfix">
          <a href="#/view-reset" class="fl link">忘记密码</a>
          <a href="#/view-regist" class="fr link">立即注册</a>
        </div>
      </el-form>
    </div>
    <p class="copyright">
      版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1
    </p>
  </div>
</template>

<script>
  import md5 from 'js-md5';

  export default {
    data: () => {
      let checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        if (value.length < 12) {
          callback(new Error('请输入手机号码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: 15811236011,
          password: 123123
        },
        rules: {
          username: [{ validator: checkUser, trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm (formName) {
        const that = this;

        that.$refs[formName].validate(valid => {
          if (valid) {
            this.$jasHttp
              .post('/mock/cloudlink-analysis-tianjiio/login/loginByPassword', {
                loginNum: '' + that.ruleForm.username,
                password: md5(that.ruleForm.password + '')
              })
              .then(res => {
                if (res.data.success === 1) {
                  this.$jasStorage.set('token', res.data.rows[0].token);
                  this.$jasStorage.set('userInfo', res.data.rows[0].userName);
                  that.$router.push('/view-home');
                } else {
                  that.$message.error(res.data.msg || '用户名或密码错误');
                }
              })
              .catch(err => {
                that.$message.error('用户名或密码错误');
                console.log('err', err);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f90 url(/static/images/loginbg.png) no-repeat center center;
    background-size: cover;
  }
  .ms-title {
    text-align: center;
    font-size: 26px;
    padding-bottom: 50px;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 270px;
    margin: -220px 0 0 -175px;
    padding: 40px;
    border-radius: 12px;
    background: #fff;
  }
  .login-btn {
    padding-top: 20px;
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
  .tip {
    padding: 10px 0;
    .link {
      color: #319ce4;
      font-size: 14px;
    }
  }
  .copyright {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 16px;
    margin: 0 auto;
  }
</style>
