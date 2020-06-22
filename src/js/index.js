
import Vue from 'vue'
import ElementUI from 'element-ui'

import { managerHost, insertElementCss } from './utils'
import InsertApp from './Insert/App.vue'
import ManagerApp from './Manager/App.vue'

if (typeof GM_xmlhttpRequest === 'undefined') {
  // This Userscirpt can't run under Greasemonkey 4.x platform
  alert('不支持Greasemonkey 4.x，请换用暴力猴或Tampermonkey')
} else if (managerHost.includes(location.host)) {
  // 管理页面
  console.log('Manager Page')
  // 删除原提示安装信息
  // eslint-disable-next-line no-undef
  intro_vm.$destroy()
  document.getElementById('introduce_app').remove()
  document.getElementById('introduce_script').remove()
  // 插入APP
  prepareInsertApplication('ptpp_manager', ManagerApp)
} else {
  // 获得载入链接清单
  const insertUrlList = GM_getValue('insert_url_list', [])
  for (let i = 0; i < insertUrlList.length; i++) {
    const insertUrl = insertUrlList[i]
    if (location.host.search(insertUrl) > -1) {
      console.log('Insert PTPP-userscript')
      insertElementCss() // 注入样式
      prepareInsertApplication('ptpp_insert', InsertApp) // 注入App
      break // 退出判定循环
    }
  }
}

function prepareInsertApplication (id, application) {
  // 插入APP
  if (!document.getElementById(id)) {
    const appNode = document.createElement('div')
    appNode.id = id
    document.body.appendChild(appNode)
  }

  // 激活Vue组件
  Vue.use(ElementUI)
  new Vue({
    render: h => h(application)
  }).$mount(`#${id}`)
}
