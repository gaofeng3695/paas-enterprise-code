<template>
  <div class="view-regist">
    <JasHeaderLogin :type="1" />
    <div>
      <div class="regist-content" >
        <BaseSteps :active="index" :steps="['设置用户名','填写账号信息','设置企业信息','注册成功']" />

        <!-- 第一步：设置用户名 -->
        <div style="width:360px;margin:30px auto 30px auto;" v-show="index===0">
          <JasPhoneValidate v-on:getPhone="nextStep1" />
        </div>

        <!-- 第二步：填写账号信息 -->
        <div style="width:360px;margin:30px auto 30px auto;" v-show="index===1">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="ruleForm.userName" v-tip="{tip:'支持中文、字母，2-20个字符'}" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="请输入密码" v-tip="{tip:'建议使用字母、数字和符号两种及以上的组合，6-20个字符'}" v-model="ruleForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" v-tip="{tip:'请填写本人常用邮箱，例如sample@163.com'}" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <div>
              <el-button type="primary" @click="nextStep2('ruleForm')" style="width:270px; marginLeft:90px">下一步</el-button>
            </div>
          </el-form>
        </div>

        <!-- 第三步：设置企业信息 -->
        <div style="width:360px;margin:30px auto 10px auto;" v-show="index===2">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="90px">
            <el-form-item label="企业名称" prop="enterpriseName">
              <el-input v-model="ruleForm2.enterpriseName" v-tip="{tip:'支持中文、字母、数字、“_”、“-”、“（）”、“()”，4-40个字符'}" placeholder="请输入企业名称"></el-input>
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
              <el-input v-model="ruleForm2.enterpriseNum" v-tip="{tip:'请输入正确的电话号码'}" placeholder="请输入企业电话"></el-input>
            </el-form-item>
            <el-form-item label="企业所在地" prop="address">
              <JasSelectAddress v-model="ruleForm2.address" placeholder="请选择"/>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input v-model="ruleForm2.detailAddress" v-tip="{tip:'支持中文、字母、数字、“_”、“-”，2-200个字符'}" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <div>
              <el-button type="text" @click="nextStep4('ruleForm2')" style="width:360px; paddingLeft:270px; font-size:10px">跳过此步骤</el-button>
              <el-button type="primary" @click="lastStep" style="width:125px; marginLeft:90px">上一步</el-button>
              <el-button type="primary" @click="nextStep3('ruleForm2')" style="width:125px">下一步</el-button>
            </div>
          </el-form>
        </div>

        <!-- 注册成功 -->
        <div style="width:360px;margin:30px auto 200px auto;" v-show="index===3">
          <JasRegistSuccess :begin="isbegin" />
        </div>

        <div>
          <el-dialog title="申请加入企业" :visible.sync="dialogVisible">
            <el-form :model="ruleForm2" label-width="90px">
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input v-model="ruleForm2.enterpriseName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="申请理由" prop="desc">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="ruleForm2.desc" v-tip="{tip:'最多200个字符'}"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false,nextStep4('ruleForm2')">确 定</el-button>
            </div>
          </el-dialog>
        </div>

      </div>
      <p class="copyright">版权所有：北京中盈安信技术服务股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备12006059号-1</p>
    </div>
  </div>

</template>

<script>
import JasHeaderLogin from '../../components/jas/JasHeaderLogin.vue';                  // 头部组件
import JasRegistSuccess from '../../components/jas/JasRegistSuccess.vue';              // 注册成功倒计时组件
import BaseSteps from '../../components/base/BaseSteps.vue';                           // 步骤条组件
import JasPhoneValidate from '../../components/jas/JasPhoneValidate.vue';              // 电话号码验证
import JasSelectAddress from '../../components/jas/JasSelectAddress';
// import md5 from 'js-md5';
export default {
  components: {
    JasHeaderLogin, BaseSteps, JasRegistSuccess, JasPhoneValidate, JasSelectAddress
  },
  data () {
    // 验证用户名是否满足要求
    let checkUserName = (rule, value, callback) => {
      var userNameReg = /^[a-zA-Z\u4e00-\u9fa5]{2,20}$/;
      // ^[^\d#\$\*\+@!%\^&-=][a-zA-Z\u4e00-\u9fa5_]{2,20}$
      if (!value) {
        callback(new Error('请输入用户姓名'));
      } else if (!userNameReg.test(value)) {
        callback(new Error('支持中文、字母，2-20个字符'));
      } else {
        callback();
      }
    };
    // 验证密码是否为空以及是否满足要求
    let validatePassword = (rule, value, callback) => {
      if (value === '' || value.toString().length < 6 || value.toString().length > 20) {
        callback(new Error('请输入6-20位密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    // 验证二次输入密码是否正确
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    // 验证企业名称是否为空且是否满足要求
    let checkenterpriseName = (rule, value, callback) => {
      var enterpriseNameReg = /^[0-9a-zA-Z\u4e00-\u9fa5 ()（）_-]{4,40}$/;
      if (!value) {
        callback(new Error('请输入企业名称'));
      } else if (!enterpriseNameReg.test(value)) {
        callback(new Error('请填写工商局注册的全称'));
      } else {
        callback();
      }
    };
    // 验证企业电话是否正确
    // let checkenterpriseNum = (rule, value, callback) => {
    //   var enterpriseNumReg = /^((0\d{2,3}-\d{7,8})|([1][3-8][0-9]{9}))$/;
    //   if (!enterpriseNumReg.test(value)) {
    //     callback(new Error('请输入正确的电话号码'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      index: 0,             // 步骤条下标
      isbegin: false,       // 注册成功页面倒计时，默认为false
      dialogVisible: false, // 申请加入企业页面，默认不显示
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
        email: [{ message: '请输入邮箱地址', trigger: 'blue' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]
      },
      rules2: {
        enterpriseName: [{ required: true, validator: checkenterpriseName, trigger: 'blur' }]
        // enterpriseNum: [{ validator: checkenterpriseNum, trigger: 'blur,change' }]
        // enterpriseName: [{ required: true, message: '请输入企业名称', trigger: 'blur' },
        // { min: 4, max: 40, message: '请填写工商局注册的全称', trigger: 'blur' }]
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
              message: res.data.msg,
              type: 'error'
            });
            return false;
          } else {
            that.$notify({
              message: res.data.msg,
              type: 'error'
            });
            return false;
          }
        })
        .catch(err => {
          that.$notify({
            message: '发生未知错误: ' + err,
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
                // that.$notify({
                //   message: '注册失败，失败信息：' + res.data.msg,
                //   type: 'error'
                // });
              }
            })
            .catch(err => {
              that.$notify({
                message: '' + err,
                type: 'error'
              });
              console.log('err', err);
              // return false;
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
                  message: '注册失败，失败信息：' + res.data.msg,
                  type: 'error'
                });
                // return false;
              }
            })
            .catch(err => {
              that.$notify({
                message: '用户信息有误' + err,
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
              if (res.data.success === 1 && res.data.token) {
                this.$jasStorage.set('userInfo', res.data.rows[0]);
                that.index++;
                that.isbegin = true;
              } else if (res.data.success === -1 && res.data.msg === '已存在同名企业！') {
                that.dialogVisible = true;
                that.registAndLogin1(formName);
                that.$notify({
                  message: '保存注册信息失败，错误信息：' + res.data.msg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              that.$notify({
                message: '用户信息有误' + err,
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
    border-top: 80px solid;
    height: 100%;
    width: 100%;
    background-color: #f4f7f8;
  }
  .regist-content {
    margin: 70px auto auto auto;
    // height: 530px;
    width: 720px;
    background-color: #fff;
    border: 1px solid #fff;
  }
  // 版权信息
  .copyright {
    margin: 20px auto auto auto;
    width: 500px;
  }
  .el-cascader {
    width: 270px;
  }
  .el-select {
    width: 270px;
  }
}
.regist-content {
  // 步骤条样式
  > :nth-child(1) {
    width: 660px;
    margin: 20px auto 0 auto;
  }
}
</style>
