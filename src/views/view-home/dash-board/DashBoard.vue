<template>
  <div class="main">
    <h2>组件演示</h2>

    <div>
      <div class="line">滑动验证</div>
      <BaseValidSlider :success="success" @callback="success = true" />
      <el-button @click="success=!success">切换</el-button>
    </div>
    <div>
      <div class="line">倒计时按钮</div>
      <div style="margin-top: 15px;">
        <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="input5" class="input-with-select">
          <BaseButtonTimer slot="append" name="确定" :time="35" @callback="clickbutton" />
        </el-input>
        <BaseButtonTimer name="发送验证码" :time="5" @callback="clickbutton" />
      </div>
    </div>
    <div>
      <div class="line">步骤条</div>
      <BaseSteps :steps="['步骤一','步骤二','步骤三','步骤四']" :active="active" />
      <el-button @click="active++">下一步</el-button>
      <el-button @click="active=0">重置</el-button>
    </div>

    <div class="line">注册成功</div>
    <JasRegistSuccess :begin="isbegin" title="恭喜您，密码重置成功！" />
    <el-button @click="isbegin = true">开始</el-button>
    <el-button @click="isbegin = false">重置</el-button>

    <div class="line">地址选择</div>
    <JasSelectAddress v-model="aCity" />
    <div class="line">图片上传</div>

    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

  </div>

</template>

<script>
  import BaseValidSlider from '../../../components/base/BaseValidSlider';
  import BaseButtonTimer from '../../../components/base/BaseButtonTimer';
  import BaseSteps from '../../../components/base/BaseSteps';
  import JasRegistSuccess from '../../../components/jas/JasRegistSuccess';
  import JasSelectAddress from '../../../components/jas/JasSelectAddress';

  export default {
    data () {
      return {
        input5: '',
        success: false,
        active: 0,
        isbegin: false,
        imageUrl: '',
        aCity: ['eda7d877-3f18-4c41-bb9a-028e4f876550', '7eb35714-8565-425e-a134-785ae909284e', '2ca23cc1-afc6-4dfd-9026-cc42907a1c0a']
      };
    },
    components: {
      BaseValidSlider, BaseButtonTimer, BaseSteps, JasRegistSuccess, JasSelectAddress
    },
    methods: {
      clickbutton () {
        this.$message('这是一条消息提示');
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    }

  };
</script>

<style scoped>
  .line {
    border-radius: 4px 0 0 4px;
    border-left: 4px solid #50bfff;
    height: 40px;
    line-height: 40px;
    background: #ecf8ff;
    padding: 4px 12px;
    margin: 20px 0 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>