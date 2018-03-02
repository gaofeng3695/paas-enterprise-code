<template>
  <div class="view-regist">
    <JasHeaderLogin :type="1" />
    <JasWrapperLogin>
      <div class="wrapper02">
        <BaseSteps class="base-steps" :active="index" :steps="['设置用户名','填写账号信息','设置企业信息','注册成功']" />

        <!-- 第一步：设置用户名 -->
        <div style="width:440px;margin:30px auto 30px auto;" v-show="index===0">
          <JasPhoneValidate v-on:getPhone="nextStep1" />
        </div>

        <!-- 第二步：填写账号信息 -->
        <div style="width:440px;margin:30px auto 30px auto;" v-show="index===1">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="ruleForm.userName" v-tip="{tip:jasValider.name.tip}" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="请输入密码" v-tip="{tip:jasValider.password.tip}" v-model="ruleForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" placeholder="请再次输入密码" v-tip="{tip:jasValider.password2.tip}" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" v-tip="{tip:jasValider.email.tip}" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <div>
              <el-button type="primary" @click="nextStep2('ruleForm')" style="width:350px; marginLeft:90px">下一步</el-button>
            </div>
          </el-form>
        </div>

        <!-- 第三步：设置企业信息 -->
        <div style="width:440px;margin:30px auto 30px auto;" v-show="index===2">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="90px">
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="ruleForm2.enterpriseName" v-tip="{tip:jasValider.enterprise.tip}" placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item label="企业规模" prop="enterpriseScale">
              <el-select v-model="ruleForm2.enterpriseScale" placeholder="请选择企业规模">
                <!-- <el-option label="请选择" value="请选择"></el-option> -->
                <el-option label="50人以下" value="1"></el-option>
                <el-option label="50-99人" value="2"></el-option>
                <el-option label="100-299人" value="3"></el-option>
                <el-option label="300-499人" value="4"></el-option>
                <el-option label="500人以上" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业电话" prop="enterpriseNum">
              <el-input v-model="ruleForm2.enterpriseNum" v-tip="{tip:jasValider.phone.tip}" placeholder="请输入企业电话"></el-input>
            </el-form-item>
            <el-form-item label="企业所在地" prop="address">
              <JasSelectAddress v-model="ruleForm2.address" placeholder="请选择" />
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input v-model="ruleForm2.detailAddress" v-tip="{tip:jasValider.address.tip}" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <div>
              <el-button type="text" @click="nextStep4('ruleForm2')" style="width:440px; paddingLeft:350px; padding-top:0px; font-size:10px">跳过此步骤</el-button>
              <el-button type="primary" @click="lastStep" style="width:155px; marginLeft:90px; background-color:#F1C40F">上一步</el-button>
              <el-button type="primary" @click="nextStep3('ruleForm2')" style="width:155px; marginLeft:30px">下一步</el-button>
            </div>
          </el-form>
        </div>

        <!-- 注册成功 -->
        <div style="margin:80px auto auto auto;" v-show="index===3">
          <JasRegistSuccess :begin="isbegin" />
        </div>

        <div>
          <el-dialog title="申请加入企业" :visible.sync="dialogVisible">
            <el-form :model="ruleForm2" label-width="90px">
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input v-model="ruleForm2.enterpriseName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="申请理由" prop="desc">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="ruleForm2.desc" v-tip="{tip:jasValider.text.tip}"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false,nextStep4('ruleForm2')">确 定</el-button>
            </div>
          </el-dialog>
        </div>

      </div>
    </JasWrapperLogin>
  </div>

</template>

<script>
import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';                  // 头部组件
import JasRegistSuccess from '../../components/jas/JasRegistSuccess.vue';              // 注册成功倒计时组件
import BaseSteps from '../../components/base/BaseSteps.vue';                           // 步骤条组件
import JasPhoneValidate from '../../components/jas/JasPhoneValidate.vue';              // 电话号码验证
import JasSelectAddress from '../../components/jas/JasSelectAddress.vue';
import JasWrapperLogin from '../../components/jas/JasWrapperLogin.vue';
import JasValider from '../../assets/js/jas-valider';
// import md5 from 'js-md5';
export default {
  components: {
    JasHeaderLogin, BaseSteps, JasRegistSuccess, JasPhoneValidate, JasSelectAddress, JasWrapperLogin
  },
  data () {
    // 验证用户名是否满足要求
    let checkUserName = (rule, value, callback) => {
      var userNameReg = JasValider.name.regexp;
      if (!value) {
        callback(new Error(JasValider.name.requirement));    // 用户名不能为空
      } else if (!userNameReg.test(value)) {
        callback(new Error(JasValider.name.warning));    // 格式不正确
      } else {
        callback();
      }
    };
    // 验证密码是否为空以及是否满足要求
    let validatePassword = (rule, value, callback) => {
      var passwordReg = JasValider.password.regexp;
      if (this.ruleForm.checkPass) {
        this.$refs.ruleForm.validateField('checkPass');
      }
      if (value === '') {
        callback(new Error(JasValider.password.requirement));    // 密码不能为空
      } else if (!passwordReg.test(value)) {
        callback(new Error(JasValider.password.warning));    // 格式不正确
      } else {
        callback();
      }
    };
    // 验证二次输入密码是否正确
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(JasValider.password2.requirement));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(JasValider.password2.warning));
      } else {
        callback();
      }
    };
    // 验证邮箱是否满足要求
    let checkEmail = (rule, value, callback) => {
      var emailReg = JasValider.email.regexp;
      if (value === '') {
        callback();
      } else if (!emailReg.test(value)) {
        callback(new Error(JasValider.email.warning));    // 邮箱格式不正确
      } else {
        callback();
      }
    };
    // 验证企业名称是否为空且是否满足要求
    let checkenterpriseName = (rule, value, callback) => {
      var enterpriseNameReg = JasValider.enterprise.regexp;
      if (!value) {
        callback(new Error(JasValider.enterprise.requirement));    // 企业名称不能为空
      } else if (!enterpriseNameReg.test(value)) {
        callback(new Error(JasValider.enterprise.warning));    // 企业名称格式不正确
      } else {
        callback();
      }
    };
    // 验证企业电话是否正确
    let checkenterpriseNum = (rule, value, callback) => {
      var enterpriseNumReg = JasValider.phone.regexp;
      if (value === '') {
        callback();
      } else if (!enterpriseNumReg.test(value)) {
        callback(new Error(JasValider.phone.warning));    // 电话格式不正确
      } else {
        callback();
      }
    };
    // 验证详细地址是否正确
    let checkdetailAddress = (rule, value, callback) => {
      var addressReg = JasValider.address.regexp;
      if (value === '') {
        callback();
      } else if (!addressReg.test(value)) {
        callback(new Error(JasValider.address.warning));    // 地址格式不正确
      } else {
        callback();
      }
    };
    // 验证申请理由是否满足要求
    let checkdesc = (rule, value, callback) => {
      var descReg = JasValider.text.regexp;
      if (value === '') {
        callback();
      } else if (!descReg.test(value)) {
        callback(new Error(JasValider.text.warning));    // 申请理由格式不正确
      } else {
        callback();
      }
    };
    return {
      index: 0,             // 步骤条下标
      isbegin: false,       // 注册成功页面倒计时，默认为false
      dialogVisible: false, // 申请加入企业页面，默认不显示
      jasValider: JasValider,
      ruleForm: {
        userName: '',       // 用户名
        password: '',       // 密码
        checkPass: '',      // 检验密码
        email: ''           // 邮箱
      },
      ruleForm2: {
        enterpriseName: '',       // 企业名称
        enterpriseScale: '',      // 企业规模
        enterpriseNum: '',        // 企业电话
        address: [],              // 企业地址  省、市、区
        detailAddress: '',        // 详细地址
        desc: ''                  // 申请理由
      },
      rules: {
        userName: [{ required: true, validator: checkUserName, trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      rules2: {
        enterpriseName: [{ required: true, validator: checkenterpriseName, trigger: 'blur' }],
        enterpriseNum: [{ validator: checkenterpriseNum, trigger: 'blur' }],
        detailAddress: [{ validator: checkdetailAddress, trigger: 'blur' }],
        desc: [{ validator: checkdesc, trigger: 'blur' }]
      }
    };
  },

  methods: {
    // 第一步：设置用户名，信息无误跳转到下一步
    nextStep1 (phoneInfo) {
      const that = this;
      this.phoneInfo = phoneInfo;
      this.$jasHttp.get('/cloudlink-core-framework/login/checkUser', {
        registNum: '' + phoneInfo.phone
      })
        .then(res => {
          // 校验 手机号未注册 且验证码无误 跳转到下一步
          if (res.data.success === 1 && res.data.msg === 'ok') {
            this.$jasStorage.set('userInfo', res.data.rows[0]);
            that.index++;
          } else if (res.data.success === 1 && res.data.msg !== 'ok') {
            // 校验 验证码无误且手机号正确，但此手机号已经被注册，提示错误信息
            that.$notify({
              message: res.data.msg || '服务器连接失败，请您稍后再试 ',
              type: 'error'
            });
            return false;
          } else {
            that.$notify({
              message: res.data.msg || '服务器连接失败，请您稍后再试 ',
              type: 'error'
            });
            return false;
          }
        })
        .catch(err => {
          that.$notify({
            message: '服务器连接失败，请您稍后再试 ',
            type: 'error'
          });
          console.log('err', err);
          return false;
        });
    },
    // 第二步：填写账号信息，信息无误跳转到下一步
    nextStep2 (formName) {
      const that = this;
      console.log('this.ruleForm:   ', this.ruleForm);
      that.$refs[formName].validate((valid) => {
        if (valid) {
          this.index++;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 第三步：设置企业信息，信息无误跳转到下一步
    nextStep3 (formName) {
      const that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$jasHttp.get('/cloudlink-core-framework/login/checkEnpName', {
            enterpriseName: '' + that.ruleForm2.enterpriseName
          })
            .then(res => {
              if (res.data.success === 1 && res.data.msg === 'ok') {
                this.$jasStorage.set('userInfo', res.data.rows[0]);
                that.registAndLogin2(formName);
              } else {
                that.dialogVisible = true;
                that.registAndLogin1(formName);
              }
            })
            .catch(err => {
              that.$notify({
                message: '服务器连接失败，请您稍后再试',
                type: 'error'
              });
              console.log('err', err);
            });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    // 第三步直接跳转到第四步
    nextStep4 (formName) {
      this.registAndLogin2(formName);
    },
    // 第三步返回到第四步
    lastStep () {
      this.index--;
    },
    // 注册新用户，企业名称已经存在，可以选择加入企业或直接登录
    registAndLogin1 (formName) {
      const that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$jasHttp.post('/cloudlink-core-framework/login/registAndLogin', {
            mobileNum: '' + that.phoneInfo.phone,
            password: '' + that.ruleForm.password,
            userName: '' + that.ruleForm.userName,
            email: '' + that.ruleForm.email,
            desc: '' + that.ruleForm2.desc,
            appId: '0c753fdd-5f54-4b24-bf50-491ea5eb1a84'
          })
            .then(res => {
              if (res.data.success === 1 && res.data.msg === 'ok') {
                this.$jasStorage.set('userInfo', res.data.rows[0]);
              } else {
                that.$notify({
                  message: res.data.msg || '服务器连接失败，请您稍后再试 ',
                  type: 'error'
                });
              }
            })
            .catch(err => {
              that.$notify({
                message: '服务器连接失败，请您稍后再试',
                type: 'error'
              });
              console.log('err', err);
            });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    // 注册新用户，同时注册新企业
    registAndLogin2 (formName) {
      const that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$jasHttp.post('/cloudlink-core-framework/login/registAndLogin', {
            mobileNum: '' + that.phoneInfo.phone,
            password: '' + that.ruleForm.password,
            userName: '' + that.ruleForm.userName,
            email: '' + that.ruleForm.email,
            enterpriseName: '' + that.ruleForm2.enterpriseName,
            enterpriseScale: '' + that.ruleForm2.enterpriseScale,
            enterpriseNum: '' + that.ruleForm2.enterpriseNum,
            address: '' + that.ruleForm2.address,
            detailAddress: '' + that.ruleForm2.detailAddress,
            desc: '' + that.ruleForm2.desc,
            appId: '0c753fdd-5f54-4b24-bf50-491ea5eb1a84'
          })
            .then(res => {
              if (res.data.success === 1) {
                this.$jasStorage.set('userInfo', res.data.rows[0]);
                that.index++;
                that.isbegin = true;
              } else {
                that.$notify({
                  message: res.data.msg || '服务器连接失败，请您稍后再试',
                  type: 'error'
                });
                if (res.data.code === 'PU01010') {
                  that.dialogVisible = true;
                  that.registAndLogin1(formName);
                }
              }
            })
            .catch(err => {
              that.$notify({
                message: '服务器连接失败，请您稍后再试',
                type: 'error'
              });
              console.log('err', err);
            });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 注册页面总样式
.view-regist {
  height: 100%;
  width: 100%;
  position: relative;
}
.view-regist {
  > :nth-child(1) {
    position: fixed;
    width: 100%;
  }
  > :nth-child(2) {
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    width: 100%;
    padding-top: 80px;
    background-color: #f4f7f8;
  }
  .wrapper02 {
    overflow: hidden;
  }
  .el-select {
    width: 350px;
  }
  .base-steps {
    width: 660px;
    height: 50px;
    margin: 30px auto 35px auto;
  }
}
</style>
