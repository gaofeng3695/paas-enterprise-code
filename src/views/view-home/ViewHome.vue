<template>
  <el-container style="height: 100%; border: 1px solid #eee">

    <el-header height="80px" style="background-color: #242f42">
      <ViewHomeHeader />
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: #324157">
        <ViewHomeSideBar />
      </el-aside>
      <el-main style="background-color: #f3f4f8">
        <div class="routerBg">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>




<style>
  .routerBg {
    background: #fff;
    min-height: 100%;
    min-width: 900px;
  }

  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  import ViewHomeHeader from './ViewHomeHeader.vue';
  import ViewHomeSideBar from './ViewHomeSideBar.vue';
  export default {
    components: {
      ViewHomeHeader,
      ViewHomeSideBar
    }
  };
</script>
