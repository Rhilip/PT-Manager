<template>
  <el-row type="flex" justify="space-between" align="center">
    <el-col :span="6">
      <el-page-header @back="goBack" :content="'PT Manager'">
      </el-page-header>
    </el-col>
    <el-col :span="10"><div class="grid-content bg-purple">fsdafasd</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">adfasdfas</div></el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>

<style scoped>

</style>
