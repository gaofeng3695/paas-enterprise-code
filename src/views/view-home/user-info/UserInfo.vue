<template>
  <div class="user-info">
    个人信息
    <div class="personal-info">
      <div class="profile">
        <!-- 用户头像显示与修改 -->
        <div v-bind:style="{'background':'url' + '(' + profileUrl + ')'}">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" 
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <p>修改头像</p> 
          </el-upload>
        </div>
        <!-- 手机号显示与修改按钮 -->
        <div>
          <p>{{userInfo.mobileNum}}</p>
          <el-button type="text" @click="phoneDialogVisible = true">修改</el-button>
        </div>
        
      </div>
      
    </div>

    <!-- 修改手机号弹窗 -->
    <el-dialog title="修改手机号" :visible.sync="phoneDialogVisible" width="30%">
      <span>这是一段信息</span>
      <el-form :model="phoneForm" :rules="rules" ref="phoneForm" label-width="80px">
        <el-form-item>
          <BaseErrorTip :errorInfo="APIErrorInfo" />
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="新手机号" prop="phone">
          <el-input v-model.number="phoneForm.phone" placeholder="手机号" v-tip="{tip:promptInfo.tel.tip}">
            <!-- slot="prepend" 在输入框中的前面 -->
            <el-select v-model="phoneForm.countryCode" slot="prepend" placeholder="请选择">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!-- 获取手机验证码 -->
        <el-form-item label="验证码" prop="verifyCode">
          <el-input v-model="phoneForm.verifyCode" placeholder="请输入手机验证码" v-tip="{tip:'请输入验证码'}">
            <!-- slot="append" 在输入框的后面 -->
            <BaseButtonTimer slot="append" name="发送验证码" :time="countdown" @callback="sendPhoneCodeBtn()" />
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="phoneDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="phoneDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import BaseErrorTip from '../../../components/base/BaseErrorTip.vue';         // API调用返回错误显示
  import BaseButtonTimer from '../../../components/base/BaseButtonTimer.vue';   // 发送验证码倒计时插件
  import jasValider from '../../../assets/js/jas-valider';                      // 表单输入项、验证的提示信息
  export default {
    components: {
      BaseButtonTimer, BaseErrorTip
    },
    data () {
      // 手机号正确性检测
      var checkedPhoneNumber = (rule, value, callback) => {
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
      var uploadImgUrl = '/cloudlink-core-file/attachment/save?token=' + this.$jasStorage.get('token') +
                        '&bizType=pic&businessId=' + this.$jasStorage.get('userInfo').objectId;
      var getImgUrl = '/cloudlink-core-file/file/getImageBySize?fileId=' + this.$jasStorage.get('userInfo').profilePhoto +
                        '&token=' + this.$jasStorage.get('token') + '&viewModel=fill&width=135&hight=135';
      return {
        // 手机表单数据
        phoneForm: {
          countryCode: '+86',       // 手机号 国家码
          phone: null,              // 手机号
          verifyCode: null          // 验证码
        },
        // 手机表单验证规则
        rules: {
          phone: [{ type: 'number', required: true, message: jasValider.tel.requirement },  // '【必填项】不能为空'
                {validator: checkedPhoneNumber}],
          verifyCode: [{ required: true, message: '请输入验证码。' }]
        },
        APIErrorInfo: '',                             // API返回的错误信息
        promptInfo: jasValider,                       // 表单提示信息
        countdown: 0,                                 // 获取验证码按钮的倒计时 时间
        uploadUrl: uploadImgUrl,                      // 头像上传地址
        profileUrl: getImgUrl,                        // 获取头像图片地址
        userInfo: this.$jasStorage.get('userInfo'),   // 用户信息
        phoneDialogVisible: false                     // 修改电话对话框
      };
    },
    methods: {
      changePhone () {
        // this.getNewUserInfo();    // 更新用户信息
      },
      /**
       * 图片信息校验： 只能是图片格式(jpg/gif/png/bmp)， 大小限制10MB
       * @param {Object}file    待上传的文件
       * @returns {boolean}     是否可以上传
      */
      beforeAvatarUpload (file) {
        var isJPG = file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;   // 头像图片限制10MB大小

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt10M;
      },
      /**
       * 头像上传成功 后处理函数
       * @param {Object}res     上传成功后返回的信息
       * @param {Object}file    文件信息
       * @returns {Object}null  无
      */
      handleAvatarSuccess (res, file) {
        const params = {
          objectId: this.$jasStorage.get('userInfo').objectId,
          profile_photo: res.rows[0].fileId
        };
        this.updateUserInfo(params);    // 更新用户头像
      },
      /**
       * 更新用户信息API： 头像、手机号、个人基本信息等
       * @param {Object}params   跟新信息API参数
       *  @returns {Object}null  无
      */
      updateUserInfo (params) {
        this.$jasHttp.post('/cloudlink-core-framework/user/update', params, true)
        .then(res => {
          this.getNewUserInfo();    // 更新用户信息
        }).catch();
      },
      /**
       * 从新获取用户信息， 把用户信息存储到本地
       *  @returns {Object}null  无
      */
      getNewUserInfo () {
        const params = { objectId: this.userInfo.objectId };
        this.$jasHttp.get('/cloudlink-core-framework/user/getById', params, true)
        .then(res => {
          if (res.data.success === 1) {
            this.$jasStorage.set('userInfo', res.data.rows[0]);     // 把新的用户信息存储到本地
            this.userInfo = this.$jasStorage.get('userInfo');       // 从本地存储中读取用户信息
            // 更新头像图片地址
            this.profileUrl = '/cloudlink-core-file/file/getImageBySize?fileId=' + this.$jasStorage.get('userInfo').profilePhoto +
        '&token=' + this.$jasStorage.get('token') + '&viewModel=fill&width=135&hight=135';
          } else {
            this.$notify({ message: '更新用户信息失败：' + res.data.msg || '服务器连接失败，请您稍后再试', type: 'error' });
          }
        }).catch(() => {
          this.$notify({ message: '更新用户信息失败,可从新登陆。', type: 'error' });
        });
      },
      /** ***********修改手机号方法**************/
      /**
       * 发送验证码按钮 处理事件
       * @returns {void}
      */
      sendPhoneCodeBtn () {
        console.log('发送，this.countdown：', this.countdown);
        // 手机号匹配规则： 1. 第一位为1。   2. 第二位到第11位为数字
        var numberReg = jasValider.tel.regexp; // 手机号匹配规则
        // 如果是手机号则调用发送验证码API
        if (numberReg.test(this.phoneForm.phone)) {
          // 获取手机验证码API接口参数
          var params = {
            sendMode: '1',                        // 验证类型必填： 1手机 2邮箱，默认为手机， 目前只支持手机
            sendNum: this.phoneForm.phone + '',   // 接收验证码账号，必选，字符串类型，手机号码或邮箱，目前只支持手机
            signName: '中盈安信',                  // 验证码签名即应用签名，必选，字符类型，如巡线卫士、中盈安信
            useCategory: 'general'                // 使用场景，必选: 通用general 注册regist 登录 login
          };
          this.getVerifyCode(params);             // 调用发送验证码API
        } else {
          // 手机号码格式不对，提示输入正确的手机号。
          this.$notify({ message: '请输入正确的手机号码，然后在点击发送验证码！', type: 'error' });
        }
      },
      /**
       * 发送验证码API
       * @param {Object}params   发送验证码API参数
       * @returns {void}
      */
      getVerifyCode (params) {
        // 发送验证码API调用
        this.$jasHttp.post('/cloudlink-core-framework/verfy/getVerifyCode', params)
        .then(res => {
          // 成功发送验证码信息：{"success":1,"code":"200","msg":"ok","rows":[{"verifyCode":"验证码"}]}
          if (res.data.success === 1 && res.data.msg === 'ok') {
            this.$notify({ message: '验证码已经发送，请注意接收短信！', type: 'success' });
          } else if (res.data.success === -1) {
            // 获取验证码失败：{success:-1，msg："对应错误信息",code:"对应错误编码"}
            this.$notify({
              message: '获取验证码出错，错误信息：' + res.data.msg || '服务器连接失败，请您稍后再试',
              type: 'error'
            });
          } else {
            // 连开发人员都不知道的错误信息
            this.$notify({ message: '服务器连接失败，请您稍后再试', type: 'error' });
          }
        }).catch(err => {
          this.$notify({ message: '服务器连接失败，请您稍后再试', type: 'error' });
          console.log('获取验证码出现异常：', err);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
// 用户个人信息
.user-info {
  border: 1px solid red;
  padding: 3%;
  height: 400px;
}
.user-info {
  
  > div {
    border-bottom: 1px solid;
  }
  // 用户头像
  .personal-info {
    .profile {
      width: 135px;
      margin: 0 auto;
      div:nth-child(1) {
        border: 1px solid;
        height: 135px;
        width: 135px;
        border-radius: 50%;
        text-align: center;
        line-height: 135px;
        // background: url("http://p1ibqa9uh.bkt.clouddn.com/17-12-29/81402174.jpg");
        p {
          height: 135px;
          width: 135px;
          border-radius: 50%;
          opacity: 0;
          background-color:rgba(0,0,0,.2);
          color: white;
        }
        p:hover {
          opacity: 1;
        }
      }
      // img {
      //   height: 135px;
      //   width: 135px;
      //   border-radius: 50%;
      // }
      // 手机号显示
      > :nth-child(2) {
        width: 200px;
        margin: 0 auto;
        p {
          display: inline-block;
          padding-right: 50px;
        }
      }
    }
    
  }
  /* 国家区号（+86）下拉列表样式 */
  .el-select {
    width: 80px;
  }
}
</style>