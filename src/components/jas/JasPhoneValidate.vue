<template>
  <div>
    <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="80px"> 
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="手机号">
          <!-- slot="prepend" 在输入框中的前面 -->
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="+86" value="1"></el-option>
            <el-option label="+26" value="2"></el-option>
            <el-option label="+11" value="3"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="验证" prop="phone">
        <!-- <MoveValidate v-on:verifyPass="tt" /> -->
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="ruleForm.verifyCode" placeholder="请输入手机验证码">
          <!-- slot="append" 在输入框的后面 -->
          <el-button slot="append">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="ruleForm.checked">阅读并接受 <a href="#">《用户协议》</a></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width:100%;">下一步</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          phone: '',
          verifyCode: '',
          checked: false
        },
        rules: {
          phone: [{ type: 'number', required: true, message: '请输入手机号', trigger: 'blur' }]
          // { min: 11, max: 11, message: '手机号为11个数字', trigger: 'blur' }
        },
        select: '3'
      };
    },
    methods: {
      onSubmit () {
        // console.log(this.verifyPhoneForm.phone);
        this.$emit('getPhone', this.ruleForm);
      }
    }
  };
</script>

<style scoped>

</style>