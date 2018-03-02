<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title maincolor">云产品研发平台企业版</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" v-if="!logined" class="form">
        <el-form-item prop="username">
          <el-input prefix-icon="fa fa-user" v-model.number="ruleForm.username" v-tip="{tip:'请输入手机号'}" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock" type="password" v-tip="{tip:'请输入密码'}" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="login('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="tip maincolor clearfix">
          <el-button type="text" class="fl " @click="gotoreset">忘记密码</el-button>
          <el-button type="text" class="fr " @click="gotoregist">立即注册</el-button>
        </div>
      </el-form>
      <div class="enterprise" v-else>
        <p class="tip01">您的账号属于多个企业，请选择您要登录的公司</p>
        <div class="cardwrap">
          <el-carousel :autoplay="false" type="card" trigger="click" indicator-position="none" height="110px" class="enters" @change="changeEnterp">
            <el-carousel-item v-for="item in enterprises" :key="item.objectId" class="logowrap">
              <img width="60" height="60" :src="item.url || '/static/images/enterlogo.png'" />
            </el-carousel-item>
          </el-carousel>
          <p class="entername">{{enterName}}</p>
          <div class="checkwrap">
            <el-checkbox v-model="isPersonal">个人登录</el-checkbox>
          </div>
        </div>

        <div class="login-btn">
          <el-button type="primary" @click="loginByEnterp">确定</el-button>
        </div>
      </div>
    </div>
    <p class="copyright">
      版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1
    </p>
  </div>
</template>

<script>
  import JasValider from '../../assets/js/jas-valider';
  export default {
    data: () => {
      // 手机号正确性检测
      var checkedPhoneNumber = (rule, value, callback, that) => {
        var numberReg = JasValider.tel.regexp; // 手机号匹配规则： 1. 第一位为1。   2. 第二位为3~8中的一个。   3. 最后9位为0~9中的一个。
        if (!value) {
          return callback(new Error('请输入手机号'));
        } else if (numberReg.test(value)) {
          callback();
        } else {
          return callback(new Error(JasValider.tel.warning));
        }
      };
      return {
        logined: 0,
        isPersonal: false,
        enterName: '',
        enterprises: [],
        ruleForm: {
          username: null,
          password: null
        },
        rules: {
          username: [{ type: 'number', required: true, message: '请输入手机号' },
          { validator: checkedPhoneNumber }],
          password: [{ required: true, message: '请输入密码' }]
        }
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) { return false; }
          this._requestLogin();
        });
      },
      _requestLogin () {
        if (this.loginSwitcher === false) { return; }
        this.loginSwitcher = false;
        this.$jasHttp
          .post('/cloudlink-core-framework/login/login', {
            loginNum: '' + this.ruleForm.username,
            password: this.ruleForm.password + '',
            appId: '0c753fdd-5f54-4b24-bf50-491ea5eb1a84'
          })
          .then(res => {
            if (res.data.success === 1) {
              this.$jasStorage.set('token', res.data.token);
              this.$jasStorage.set('userInfo', res.data.rows[0]);
              if (res.data.code === 'PU03063') { // 没有默认企业的情况
                this._requestGetEnterList();
              } else if (res.data.code === 'PU01023') {
                this.loginSwitcher = true;
                this.$notify({
                  message: '企业应用过期',
                  type: 'error'
                });
              } else { // 可以直接登录
                this.loginSwitcher = true;
                this._goToHomePage();
              }
            } else {
              this.loginSwitcher = true;
              this.$notify({
                message: res.data.msg || '服务器连接失败，请您稍后再试',
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.loginSwitcher = true;

            this.$notify({
              message: '服务器连接失败，请您稍后再试',
              type: 'error'
            });
            console.log('err', err);
          });
      },
      _requestGetEnterList () {
        this.$jasHttp
          .get('/cloudlink-core-framework/login/getEnterpriseList', {}, true)
          .then(res => {
            this.loginSwitcher = true;
            this.logined = 1;
            if (res.data.success === 1) {
              this.enterprises = res.data.rows;
            } else {
              this.$notify({
                message: res.data.msg || '服务器连接失败，请您稍后再试',
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.loginSwitcher = true;
            this.$notify({
              message: '服务器连接失败，请您稍后再试',
              type: 'error'
            });
            console.log('err', err);
          });
      },
      _requestLoginByEnterp () {
        if (this.loginSwitcher2 === false) { return; }
        this.loginSwitcher2 = false;
        this.$jasHttp
          .post('/cloudlink-core-framework/login/loginWithEnterprise', {
            enterpriseId: this.enterpriseChoosed.objectId,
            appId: '0c753fdd-5f54-4b24-bf50-491ea5eb1a84'
          }, true)
          .then(res => {
            this.loginSwitcher2 = true;
            if (res.data.success === 1) {
              this.$jasStorage.set('userInfo', res.data.rows[0]);
              this._goToHomePage();
            } else {
              this.$notify({
                message: res.data.msg || '服务器连接失败，请您稍后再试',
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.loginSwitcher2 = true;
            this.$notify({
              message: '服务器连接失败，请您稍后再试',
              type: 'error'
            });
            console.log('err', err);
          });
      },
      loginByEnterp () {
        if (this.isPersonal) {
          this._goToHomePage();
          return;
        }
        this._requestLoginByEnterp();
      },
      _goToHomePage () {
        this.$notify({
          message: '您已经成功登陆',
          type: 'success'
        });
        this.$router.push('/view-home');
      },
      changeEnterp (item) {
        this.enterpriseChoosed = this.enterprises[item];
        this.enterName = this.enterprises[item].enterpriseName;
      },

      gotoreset () {
        this.$router.push('/view-reset');
      },
      gotoregist () {
        this.$router.push('/view-regist');
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

  .enterprise {
    .tip01 {
      text-align: center;
      padding: 10px 0;
    }
    .cardwrap {
      box-sizing: border-box;
      height: 205px;
      padding: 10px 0 20px 0;
      .logowrap {
        text-align: center;
        img {
          margin-top: 10px;
          height: 90px;
          width: 90px;
        }
      }
      .el-carousel__mask {
        opacity: 0.5;
      }
      .el-carousel__item {
        // background-color: #f1f1f1;
        // border-radius: 4px;
      }
      .checkwrap {
        padding-top: 10px;
      }
    }
    .entername {
      padding: 18px 0 8px 0;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px;
    height: 320px;
    margin: -260px 0 0 -200px;
    padding: 40px;
    border-radius: 12px;
    background: #fff;
  }
  .login-btn {
    text-align: center;
    button {
      width: 100%;
      height: 36px;
    }
  }
  .form {
    margin-top: 80px;
    .login-btn {
      padding-top: 20px;
    }
  }
  .ms-title {
    text-align: center;
    font-size: 26px;
    padding-bottom: 10px;
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
