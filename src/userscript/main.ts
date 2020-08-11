import app from "./application";

// 检查用户脚本平台
if (typeof GM_xmlhttpRequest === 'undefined') {
    throw new Error('不支持Greasemonkey 4.x，请换用暴力猴或Tampermonkey')
}

// @ts-ignore 置入全局对象中
unsafeWindow['__PT_MANAGER__'] = app