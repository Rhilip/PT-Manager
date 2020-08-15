import Application from "./application";
import {CantInsertScriptError} from "@/common/interfaces/errors";

// 检查用户脚本平台
if (typeof GM_xmlhttpRequest === 'undefined') {
    throw new Error('不支持Greasemonkey 4.x，请换用暴力猴或Tampermonkey')
}

// 注入脚本应用
const app = new Application()
Object.freeze(app)
app.init().then(r => {
    // @ts-ignore 置入全局对象中
    unsafeWindow['__PT_MANAGER__'] = app
}).catch(e => {
    if (!(e instanceof CantInsertScriptError)) {
        console.log(e)
    }
})