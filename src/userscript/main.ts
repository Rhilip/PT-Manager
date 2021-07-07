import Application from "./lib/application";
import Site from './lib/sites';

// 检查用户脚本平台
if (typeof GM_xmlhttpRequest === 'undefined') {
    throw new Error('不支持Greasemonkey 4.x，请换用暴力猴或Tampermonkey')
}

// 注入脚本应用
const app = new Application()

Object.seal(app)
app.init().then(() => {
    Object.assign(unsafeWindow, {
        __PT_MANAGER__: app,
        __PT_SITE__: Site
    })
}).catch(e => {
    console.log(e)
})
