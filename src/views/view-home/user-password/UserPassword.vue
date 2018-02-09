<template>
  <div style="width:360px; margin:30px auto 10 auto">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px">
      <el-form-item label="原密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkNewPassword">
        <el-input v-model="ruleForm.checkNewPassword" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="cancel" style="width:125px; marginLeft:90px">保存</el-button>
        <el-button type="primary" @click="confirm" style="width:125px">取消</el-button>
      </div>
    </el-form>
  </div>

</template>

<script>
export default {
  data () {

  }
};
</script>

<style lang="sass" scoped>

</style>