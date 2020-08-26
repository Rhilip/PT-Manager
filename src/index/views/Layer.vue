<template>
    <el-container>
        <el-scrollbar>
            <el-aside width="220px">
                <el-menu :default-active="$route.name" class="el-menu-vertical-aside"
                         router>
                    <el-image :fit="'scale-down'"
                              :src="require('@/index/assets/logo.png')"></el-image>
                    <el-menu-item-group>
                        <template slot="title">
                            <span>概览</span>
                        </template>
                        <el-menu-item :route="{name: 'Home'}" index="Home">
                            <i class="el-icon-menu"/>
                            <span slot="title">个人数据</span>
                        </el-menu-item>
                        <el-menu-item :route="{name: 'Search'}" index="Search">
                            <i class="el-icon-search"/>
                            <span slot="title">搜索结果</span>
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
                        <el-menu-item :route="{name: 'Setting/Clients'}" index="Setting/Clients">
                            <i class="el-icon-s-promotion"/>
                            <span slot="title">下载服务器</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </el-aside>
        </el-scrollbar>
        <el-container>
            <el-header height="50px">
                Header
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: "Index",
    data () {
      return {
      }
    },
    methods: {
    }
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