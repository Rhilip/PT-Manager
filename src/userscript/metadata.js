const pkg = require('../../package.json')

const cdn = 'https://unpkg.com/'

module.exports = {
  name: 'PT-Manager',
  namespace: 'https://blog.rhilip.info/',
  version: `${pkg.version}.${Math.floor(new Date() / 1000)}`,
  author: pkg.author,
  source: pkg.repository.url,
  license: 'MIT',
  include: [
    '*://ptm.rhilip.info/*',   // 默认公网域名
    '*://localhost:8080/*'   //  本地调试域名
  ],
  require: [
    `${cdn}sizzle@${pkg.dependencies['sizzle']}/dist/sizzle.js`,
    //`${cdn}jquery@${pkg.dependencies['jquery']}/dist/jquery.min.js`,
    //`${cdn}vue@${pkg.dependencies['vue']}/dist/vue.min.js`,
    //`${cdn}element-ui@${pkg.dependencies['element-ui']}/lib/index.js`,
    //`${cdn}localforage@${pkg.dependencies['localforage']}/dist/localforage.min.js`
  ],
  resource: [
    //`element ${cdn}element-ui@${pkg.dependencies['element-ui']}/lib/theme-chalk/index.css`
  ],
  grant: [
    'GM_xmlhttpRequest',
    'GM_setClipboard',
    //'GM_addStyle',
    'GM_setValue',
    'GM_getValue',
    'GM_listValues',
    'GM_deleteValue',
    //'GM_openInTab',
    //'GM_getResourceText',
    'GM_info',
    'unsafeWindow'
  ],
  connect: [
    '*'
  ],
  'run-at': 'document-start'
}
