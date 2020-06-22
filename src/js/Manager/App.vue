<template>
  <el-container>
    <el-container>
      <el-header :height="20">
        <Header></Header>
      </el-header>
      <el-main>
        Main
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";

  export default {
    name: "App",
    components: {Footer, Header},
  }
</script>

<style scoped>
</style>
