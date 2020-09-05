<template>
    <el-dialog
            :close-on-click-modal="false"
            :title="`编辑下载服务器 - ${form.type}`"
            :visible.sync="visible"
            @close="handleDialogClose">
        <div>
            <el-form :model="form" label-position="top" ref="form">
                <el-form-item label="客户端ID" prop="uuid">
                    <el-input :disabled="true" v-model="form.uuid"/>
                </el-form-item>
                <el-form-item label="服务器名称" prop="name">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="服务器地址" prop="address">
                    <el-input v-model="form.address"/>
                </el-form-item>
                <el-form-item label="登录用户名" prop="username" v-if="form.hasOwnProperty('username')">
                    <el-input v-model="form.username"/>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input show-password v-model="form.password"/>
                </el-form-item>
                <el-form-item label="连接超时时间" prop="timeout">
                    <el-slider :format-tooltip="formatTimeoutTooltip"
                               :marks="marks"
                               :max="800e3" :min="5e3" :step="1000"
                               v-model="form.timeout"/>
                </el-form-item>
            </el-form>
        </div>
        <span class="dialog-footer" slot="footer">
            <el-button @click="handleDialogClose">取 消</el-button>
            <el-button :disabled="disableSaveBtn" @click="handleClientEditSave" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  import _ from 'lodash';
  import bridge from "../../../plugins/bridge";
  import {formatTimeoutTooltip} from "../../../plugins/common";

  export default {
    name: "ClientEdit",
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },

      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        clients: {},
        disableSaveBtn: false,
        form: {},
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
    watch: {
      isVisible: function (newValue) {
        this.visible = newValue
        if (this.visible) {
          this.form = _.clone(this.info)
        } else {
          this.cleanFrom()
        }
      },
    },

    methods: {
      cleanFrom() {
        this.form = {}
      },

      handleDialogClose() {
        this.$emit('close-client-edit-dialog')
      },

      async handleClientEditSave() {
        this.disableSaveBtn = true
        this.$notify.info('正在进行下载服务器连接测试，请耐心等待')
        const client = bridge().clientFactory(this.form)

        try {
          const pong = await client.ping()
          if (pong) {
            const Clients = bridge().store.get("CONFIG:CLIENTS", [])
            const clientId = Clients.findIndex(s => s.uuid = client.config.uuid)
            Clients[clientId] = this.form
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

</style>