<template>
  <div>
    <el-button circle class="insert_button" icon="el-icon-open" title="PTPP"
               @click="drawer = !drawer"
    ></el-button>

    <el-drawer
      :visible.sync="drawer"
      direction="ltr"
      title="PTPP"
      size="20%"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        drawer: false,
      };
    },
  }
</script>

<style scoped>
  .insert_button {
    position: fixed;
    transform: translate(0, 0);
    right: 5px;
  }
</style>
