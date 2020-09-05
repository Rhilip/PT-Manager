<template>
    <div>
        <el-card class="main-card">
            <el-alert
                    description="在开始使用本脚本的推送服务之前，您至少需要添加一个下载服务器。"
                    show-icon
                    title="下载服务器配置"
                    type="info" :closable="false" />
            <el-table :data="clients" row-key="uuid" style="width: 100%">
                <el-table-column
                        width="40">
                    <template slot-scope="scope">
                        <img :src="`/assets/client/${scope.row.type}.ico`" alt="client-img" class="client-img-list">
                    </template>
                </el-table-column>
                <el-table-column
                        label="下载器名称"
                        prop="name"
                        width="120"/>
                <el-table-column
                        label="服务器地址"
                        prop="address"/>
                <el-table-column
                        align="center"
                        label="用户名"
                        prop="username"
                        width="120"/>
                <el-table-column align="right" width="160">
                    <template slot="header">
                        <el-button
                                @click="handleClientAddBtn()"
                                size="medium"
                                type="success">
                            <i class="el-icon-circle-plus"/>&nbsp;&nbsp;添加新下载器
                        </el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                @click="handleClientEdit(scope.$index, scope.row)"
                                size="mini">
                            编辑
                        </el-button>
                        <el-button
                                @click="handleClientDelete(scope.$index, scope.row)"
                                size="mini"
                                type="danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <template slot="append">
                    <div class="client-status" v-if="clients.length > 0">
                        你总共添加了 {{ clients.length }} 个下载器
                    </div>
                </template>
            </el-table>
        </el-card>

        <ClientAdd :is-visible="dialogClientAddVisible" @close-client-add-dialog="dialogClientAddVisible = false"/>
    </div>
</template>

<script>
  import ClientAdd from "../../components/Setting/Clients/ClientAdd";
  export default {
    name: "Clients",
    components: {ClientAdd},
    data() {
      return {
        dialogClientAddVisible: false,
        clients: [],
      }
    },
    created() {
      this.clients = [];
    },
    methods: {
      handleClientAddBtn() {
        this.dialogClientAddVisible = true
      },

      handleClientEdit(index, row) {
        console.log('')
      },

      handleClientDelete(index, row) {
        this.$confirm(`确定删除下载器 ${row.name}(${row.type})？`)
          .then(() => {
            console.log('')
          })
      },
    }
  }
</script>

<style scoped>

</style>