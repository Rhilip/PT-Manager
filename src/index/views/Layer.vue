<template>
    <el-container>
        <el-header height="50px">
            <el-button :icon="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" circle @click.stop="isCollapse = !isCollapse">
            </el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '65px' : '220px'">
                <el-menu class="el-menu-vertical-aside" router
                         :default-active="$route.name" :collapse="isCollapse">
                    <el-menu-item-group>
                        <template slot="title">
                            <span>概览</span>
                        </template>
                        <el-menu-item index="Home" :route="{name: 'Home'}">
                            <i class="el-icon-menu" />
                            <span slot="title">个人数据</span>
                        </el-menu-item>
                        <el-menu-item index="Search" :route="{name: 'Search'}">
                            <i class="el-icon-search" />
                            <span slot="title">搜索结果</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </el-aside>
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
        isCollapse: false
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