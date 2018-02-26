<template>
  <div class="main">
    <p class="view table-view">view02</p>
    <el-button @click="getTableList">刷新</el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column fixed prop="string" label="星" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-select v-model="value" placeholder="请选择" class="select01">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

  </div>

</template>

<script>
  export default {
    name: 'view02',
    data () {
      return {
        tableData: [],
        dialogVisible: false,
        loading: true,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    created () {
      this.getTableList();
    },
    watch: {
      '$route' (to, from) {
        console.log(to);
        console.log(from);
      }
    },
    methods: {
      getTableList: function () {
        this.loading = true;
        this.$jasHttp
          .get('/mock/tableList', {}, true)
          .then((res) => {
            this.tableData = res.data.data.projects;
            this.loading = false;
          })
          .catch(function (err) {
            console.log('err', err);
          });
      },
      handleClick: function (row) {
        this.dialogVisible = true;
      },
      handleClose: function (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      }
    }
  };
</script>

<style scoped lang='scss'>
  .main {
    .view {
      color: red;
      font-size: 16px;
    }
  }
  .el-select {
    margin-left: 20px;
    line-height: 20px;
    .el-input {
      .el-input__inner {
        font-size: white;
        background-color: #565a77;
        font-size: 40px;
      }
    }
  }
</style>