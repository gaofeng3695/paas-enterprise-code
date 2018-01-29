<template>
  <el-menu :default-active="onRoutes" background-color="#324157" text-color="white" router unique-opened>
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>{{ item.title }}</template>
          <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" :route="subItem.route">{{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :route="item.route">
          <i :class="item.icon"></i>{{ item.title }}
        </el-menu-item>
      </template>
    </template>

  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'el-icon-setting',
            index: '/view-home/dash-board',
            title: '首页演示'
          },
          {
            icon: 'el-icon-menu',
            index: 'info',
            title: '企业数据',
            subs: [
              {
                index: '/view-home/info-login',
                title: '登陆日志'

              },
              {
                index: '/view-home/info-operate',
                title: '操作日志'
              },
              {
                index: '/view-home/info-statistic',
                title: '统计信息'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            index: 'user',
            title: '个人中心',
            subs: [
              {
                index: '/view-home/user-info',
                title: '个人信息'
              },
              {
                index: '/view-home/user-password',
                title: '修改密码'
              },
              {
                index: '/view-home/user-enterprise',
                title: '我的企业'
              },
              {
                index: '/view-home/user-app',
                title: '我的应用'
              },
              {
                index: '/view-home/user-login',
                title: '登录日志'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            index: '2',
            title: '举例',
            subs: [
              {
                index: '/view-home/demo-table',
                title: '列表模板'
              }
            ]
          }
        ]
      };
    },
    computed: {
      onRoutes () {
        return this.$route.path;
      }
    }
  };
</script>

<style scoped>
  .el-menu {
    border-right: solid 1px #000;
  }
</style>
