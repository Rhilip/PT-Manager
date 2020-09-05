<template>
    <el-dialog
            :close-on-click-modal="false"
            :visible.sync="visible"
            @close="handleDialogClose"
            title="添加新下载服务器">
        <div>
            <el-form :model="form" label-position="top" ref="form">
                <el-form-item label="下载服务器类型" prop="type">
                    <el-select @change="handleClientTypeSelectChange"
                               placeholder="请选择" v-model="form.type">
                        <el-option
                                :key="name"
                                :label="name"
                                :value="name"
                                v-for="(value, name) in clients">
                            {{ name }}
                            <span style="float: right;">
                                <img :src="`/assets/client/${value.type}.png`" alt="client-img" class="client-img">
                            </span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务器名称" prop="name">
                    <el-input :disabled="disableForm" v-model="form.name"/>
                    <div class="form-notice">
                        取一个好听的名字，方便你以后认出它来
                    </div>
                </el-form-item>
                <el-form-item label="服务器地址" prop="address">
                    <el-input :disabled="disableForm" v-model="form.address"/>
                    <div class="form-notice">
                        完整的服务器地址（含端口），如：http://192.168.1.1:5000/
                    </div>
                </el-form-item>
                <el-form-item label="登录用户名" prop="username" v-if="form.hasOwnProperty('username')">
                    <el-input :disabled="disableForm" v-model="form.username"/>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input :disabled="disableForm" show-password v-model="form.password"/>
                </el-form-item>
                <el-form-item label="连接超时时间" prop="timeout">
                    <el-row justify="space-around" type="flex">
                        <el-col :span="22">
                            <el-slider :disabled="disableForm"
                                       :format-tooltip="formatTimeoutTooltip"
                                       :marks="marks" :max="800e3" :min="5e3"
                                       :step="1000" v-model="form.timeout"/>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="客户端ID（自动生成）" prop="uuid">
                    <el-input :disabled="true" v-model="form.uuid"/>
                </el-form-item>
            </el-form>
        </div>

        <span class="dialog-footer" slot="footer">
            <el-button @click="handleDialogClose">取 消</el-button>
            <el-button :disabled="disableSaveBtn" @click="handleClientAddSave" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  import _ from 'lodash';
  import {clientsConfig} from "../../../plugins/factory/clients";
  import bridge from "../../../plugins/bridge";
  import {formatTimeoutTooltip} from "../../../plugins/common";

  export default {
    name: "ClientAdd",
    data() {
      return {
        visible: false,
        disableForm: true,
        disableSaveBtn: false,
        form: {},
        clients: clientsConfig,
        marks: {
          5e3: '5 秒',
          60e3: {
            style: {
              color: '#1989FA'
            },
            label: this.$createElement('strong', '1 分钟')
          },
          300e3: '5 分钟',
          600e3: '10 分钟',
        }
      }
    },

    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      isVisible: function (newValue) {
        this.visible = newValue
        this.cleanForm()
      }
    },

    methods: {
      cleanForm() {
        this.form = {}
      },

      handleClientTypeSelectChange(clientType) {
        this.form = _.clone(this.clients[clientType])
        this.form.uuid = this.$uuid.v4()
        this.disableForm = false
      },

      handleDialogClose() {
        this.$emit('close-client-add-dialog')
      },

      async handleClientAddSave() {
        this.disableSaveBtn = true
        this.$notify.info('正在进行下载服务器连接测试，请耐心等待')
        const client = bridge().clientFactory(this.form)

        try {
          const pong = await client.ping()
          if (pong) {
            const Clients = bridge().store.get("CONFIG:CLIENTS", [])
            Clients.push(this.form)
            bridge().store.set("CONFIG:CLIENTS", Clients)
            this.handleDialogClose()
          }
        } catch (e) {
          this.$notify.error('不能正常连接到下载服务器，请检查你的配置或增加超时时间')
        } finally {
          this.disableSaveBtn = false
        }
      },

      formatTimeoutTooltip
    }
  }
</script>

<style scoped>
    .client-img {
        height: 18px;
        margin-top: 9px;
    }
</style>