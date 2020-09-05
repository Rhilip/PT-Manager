<template>
    <div>
        <el-card class="main-card">
            <el-alert
                    :closable="false"
                    description="在开始使用本脚本的推送服务之前，您至少需要添加一个下载服务器。"
                    show-icon
                    title="下载服务器配置" type="info"/>
            <el-table :data="clients" :row-key="r => `${r.uuid}-${r.address}-${r.username}`" style="width: 100%"
                      :default-sort = "{prop: 'name', order: 'descending'}"
            >
                <el-table-column
                        width="40">
                    <template slot-scope="scope">
                        <img :src="`/assets/client/${scope.row.type}.png`" alt="client-img" class="client-img-list">
                    </template>
                </el-table-column>
                <el-table-column
                        label="下载器名称"
                        align="center"
                        prop="name"
                        width="160" sortable/>
                <el-table-column
                        label="服务器地址"
                        prop="address">
                    <template slot-scope="scope">
                        <el-link type="primary" target="_blank" :href="scope.row.address">
                            {{ scope.row.address }}<i class="el-icon-link el-icon--right"></i>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="用户名"
                        prop="username"
                        width="160" />
                <el-table-column align="right" width="160">
                    <template slot="header">
                        <el-button
                                @click="handleClientAddBtnClick()"
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

        <ClientAdd :is-visible="dialogClientAddVisible" @close-client-add-dialog="handleClientAddDialogSave"/>
        <ClientEdit :info="dialogClientEditInfo" :is-visible="dialogClientEditVisible"
                    @close-client-edit-dialog="handleClientEditDialogSave"
        ></ClientEdit>
    </div>
</template>

<script>
  import _ from "lodash";
  import bridge from "../../plugins/bridge";
  import ClientAdd from "../../components/Setting/Clients/ClientAdd";
  import ClientEdit from "../../components/Setting/Clients/ClientEdit";

  export default {
    name: "Clients",
    components: {ClientEdit, ClientAdd},
    data() {
      return {
        dialogClientAddVisible: false,
        dialogClientEditVisible: false,
        dialogClientEditInfo: {},
        clients: [],
      }
    },
    created() {
      this.getClients();
    },
    methods: {
      getClients() {
        this.clients = _.clone(bridge().store.get("CONFIG:CLIENTS", []))
      },

      handleClientAddBtnClick() {
        this.dialogClientAddVisible = true
      },

      handleClientAddDialogSave() {
        this.getClients()
        this.dialogClientAddVisible = false
      },

      handleClientEdit(index, row) {
        this.dialogClientEditInfo = row
        this.dialogClientEditVisible = true
      },

      handleClientEditDialogSave() {
        this.getClients()
        this.dialogClientEditVisible = false
      },

      handleClientDelete(index, row) {
        this.$confirm(`确定删除下载器 ${row.name}(${row.type})？`)
          .then(() => {
            this.clients.splice(index, 1)
            bridge().store.set("CONFIG:CLIENTS", this.clients)
            this.getClients()
          })
      },
    }
  }
</script>

<style scoped>
    .client-img-list {
        height: 25px;
        top: 5px;
        position: relative;
    }

    .client-status {
        padding: 10px
    }
</style>