<template>
  <el-container style="height: 100%;">
    <el-scrollbar>
      <el-aside width="220px">
        <el-menu :default-active="$route.name" class="el-menu-vertical-aside"
                 router>
          <el-image :fit="'scale-down'"
                    src="/assets/logo.png"></el-image>
          <el-menu-item-group>
            <template slot="title">
              <span>概览</span>
            </template>
            <el-menu-item :route="{name: 'Home'}" index="Home" :disabled="true">
              <i class="el-icon-menu"/>
              <span slot="title">个人数据</span>
            </el-menu-item>
            <el-menu-item :route="{name: 'Search'}" index="Search">
              <i class="el-icon-search"/>
              <span slot="title">搜索聚合</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <span>参数设置</span>
            </template>
            <el-menu-item :route="{name: 'Setting/Sites'}" index="Setting/Sites">
              <i class="el-icon-s-shop"/>
              <span slot="title">站点设置</span>
            </el-menu-item>
            <el-menu-item :route="{name: 'Setting/Clients'}" index="Setting/Clients" :disabled="true">
              <i class="el-icon-s-promotion"/>
              <span slot="title">下载服务器</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <span>鸣谢</span>
            </template>
            <el-menu-item>
              <i class="el-icon-s-shop"/>
              <span slot="title">TODO</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
    </el-scrollbar>
    <el-container>
      <el-header height="50px">
        <el-page-header :content="$route.meta.content || ''" @back="$router.back()" style="margin-top: 12px;">
          <div></div>
        </el-page-header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <span style="float: right">Version {{ SCRIPT_VER }}</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
const SCRIPT_VER = window['__PTM_APP__']?.info.script.version || '';

export default {
  name: "Index",
  data() {
    return {
      SCRIPT_VER
    }
  },
  methods: {}
}
</script>

<style scoped>
.el-menu-vertical-aside {
  position: fixed;
}

.el-menu-vertical-aside:not(.el-menu--collapse) {
  width: 220px;
}
</style>

<style>
.main-card:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>
