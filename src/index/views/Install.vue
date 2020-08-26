<template>
    <el-container>
        <el-header height="100px" style="margin-top: 10px">
            <el-row>
                <el-col :offset="2" :span="22">
                    <el-image :src="require('@/index/assets/logo.png')" fit="cover"></el-image>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row>
                <el-col :offset="2" :span="16">
                    <el-tag style="margin-bottom: 10px" type="success">使用说明</el-tag>
                    <el-steps :active="2" direction="vertical">
                        <el-step status="process" title="安装一个用户脚本管理器">
                            <template v-slot:description>
                                <el-alert :closable="false" show-icon title="要使用用户脚本，您首先需要安装一个用户脚本管理器。根据您使用的浏览器不同，可用的用户脚本管理器也有所不同。"
                                          type="info">
                                </el-alert>
                                <ul>
                                    <li>Chrome：<a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">Tampermonkey</a> 或 <a href="https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag">Violent monkey</a></li>
                                    <li>Firefox：<a href="https://addons.mozilla.org/firefox/addon/tampermonkey/">Tampermonkey</a> 或 <a href="https://addons.mozilla.org/firefox/addon/violentmonkey/">Violentmonkey</a></li>
                                    <li>Safari：<a href="http://tampermonkey.net/?browser=safari">Tampermonkey</a></li>
                                    <li>Microsoft Edge：<a href="https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s">Tampermonkey</a></li>
                                    <li>Opera：<a href="https://addons.opera.com/extensions/details/tampermonkey-beta/">Tampermonkey</a> 或 <a href="https://addons.opera.com/extensions/details/violent-monkey/">Violentmonkey</a></li>
                                    <li>Maxthon：<a href="http://extension.maxthon.com/detail/index.php?view_id=1680">Violentmonkey</a></li>
                                    <li>Dolphin：<a href="https://play.google.com/store/apps/details?id=net.tampermonkey.dolphin">Tampermonkey</a></li>
                                    <li>UC：<a href="https://play.google.com/store/apps/details?id=net.tampermonkey.uc">Tampermonkey</a></li>
                                    <li>Qupzilla：（不需要额外软件）</li>
                                    <li>AdGuard：（不需要额外软件）</li>
                                </ul>
                            </template>
                        </el-step>
                        <el-step title="安装 PT-Manager 用户脚本">
                            <template v-slot:description>
                                <p>
                                    请在安装完成用户脚本管理器后，直接点击按钮&nbsp;
                                    <a class="btn" href='./index.prod.user.js' target="_blank">
                                        <el-button size="mini" type="primary">安装</el-button>
                                    </a>&nbsp;
                                    ，在弹出的用户脚本管理器页面确认安装。
                                </p>
                                <p>
                                    <el-alert :closable="false" description="如果你使用 Tamermonkey 进行用户脚本管理，请务必确保在安装完成后，Tamermonkey 提示跨源资源访问窗口时点击“总是允许域名”，然后再刷新一遍页面。" show-icon
                                              title="请注意："
                                              type="warning"
                                    >
                                    </el-alert>
                                </p>
                            </template>
                        </el-step>
                        <el-step title="刷新此页面">
                            <template v-slot:description>
                                <p>如果你确认完成了<b>脚本管理器</b>和<b>用户脚本</b>的安装，请刷新此页面。如果发现本提示页面已经消失并出现管理界面，则说明安装完成。</p>
                                <p>
                                    如果已启用脚本，但页面未能正常跳转。你也可以点击此处
                                    <el-button @click.stop="forceEnter" size="mini" type="success">
                                        强行进入
                                    </el-button>
                                </p>
                            </template>
                        </el-step>
                    </el-steps>
                </el-col>
                <el-col :span="4">
                    <el-tag style="margin-bottom: 10px" type="success">捐赠</el-tag>
                    <div>
                        <div style="text-align: center;margin-bottom: 5px">
                            <el-image :src="require('@/index/assets/donate/alipay.jpg')" fit="cover"></el-image>
                            <span>Alipay</span>
                        </div>
                        <div style="text-align: center;margin-bottom: 5px">
                            <el-image :src="require('@/index/assets/donate/wechat.jpg')" fit="cover"></el-image>
                            <span>Wechat</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer style="text-align: center">
            <el-link href="//blog.rhilip.info" type="info">Blog</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link href="//github.com/Rhilip/PT-Manager" type="info">Github</el-link>
        </el-footer>
    </el-container>
</template>

<script>
  export default {
    name: "Install",
    data() {
      return {}
    },
    methods: {
      forceEnter() {
        this.$router.push({name: 'Home'}).catch(() => {
          this.$message({message: '诶诶，你至少得安装脚本，才能强行进入呀', type: 'error'})
        })
      }
    }
  }
</script>

<style scoped>
    body {
        background-color: #F2F2F2;
    }
</style>