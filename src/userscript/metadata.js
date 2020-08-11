const pkg = require('../../package.json')

const cdn = 'https://cdn.jsdelivr.net/npm/'

module.exports = {
  name: 'PT-Manager',
  namespace: 'https://blog.rhilip.info/',
  version: `${pkg.version}.${Math.floor(new Date() / 1000)}`,
  author: pkg.author,
  source: pkg.repository.url,
  license: 'MIT',
  include: [
    '*'
  ],
  require: [
    //`${cdn}jquery@${pkg.dependencies.jquery}/dist/jquery.min.js`,
    `${cdn}vue@${pkg.dependencies.vue}/dist/vue.min.js`,
    `${cdn}element-ui@${pkg.dependencies['element-ui']}/lib/index.js`,
    `${cdn}axios@${pkg.devDependencies['axios']}/dist/axios.min.js`,
    `${cdn}axios-userscript-adapter@${pkg.devDependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
    `${cdn}gm-storage@${pkg.devDependencies['gm-storage']}/dist/index.umd.min.js`
  ],
  resource: [
    `element ${cdn}element-ui@${pkg.dependencies['element-ui']}/lib/theme-chalk/index.css`
  ],
  grant: [
    'GM_xmlhttpRequest',
    'GM_setClipboard',
    'GM_addStyle',
    'GM_setValue',
    'GM_getValue',
    'GM_listValues',
    'GM_deleteValue',
    'GM_openInTab',
    'GM_getResourceText',
    'GM_Info',
    'unsafeWindow'
  ],
  connect: [
    '*'
  ],
  'run-at': 'document-start'
}