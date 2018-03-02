<template>
  <div class="view-userPassword">
    <!-- <div style="width:400px; margin:0px auto 0px auto"> -->
    <div class="userPassword-content">  
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNewPassword">
          <el-input v-model="ruleForm.checkNewPassword" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <div style="marginTop:60px">
          <el-button type="primary" @click="confirm" style="width:90px; marginLeft:100px">保存</el-button>
          <el-button @click="cancel" style="width:90px; marginLeft:115px; color:#319CE4">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    // 验证原始密码是否为空或者是否满足设置要求
    let validatePassword = (rule, value, callback) => {
      if (value === '' || value.toString().length < 6 || value.toString().length > 20) {
        callback(new Error('请输入6-20位密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };
    // 验证新密码是否为空以及是否满足设置要求
    let validateNewPassword = (rule, value, callback) => {
      if (value === '' || value.toString().length < 6 || value.toString().length > 20) {
        callback(new Error('请输入6-20位密码'));
      } else {
        if (this.ruleForm.newPassword !== '') {
          this.$refs.ruleForm.validateField('newPassword');
        }
        callback();
      }
    };
    // 验证二次输入的新密码是否正确
    let validateCheckNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',           // 原始密码
        newPassword: '',        // 新密码
        checkNewPassword: ''    // 确认新密码
      },
      rules: {
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
        checkNewPassword: [{ required: true, validator: validateCheckNewPass, trigger: 'blur' }]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.userPassword-content {
  width: 400px;
  margin: 0px auto;
}
</style>