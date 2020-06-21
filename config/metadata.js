const pkg = require('../package.json')

module.exports = {
  name: 'PT-Manager',
  namespace: 'https://blog.rhilip.info/',
  version: pkg.version,
  author: pkg.author,
  source: pkg.repository.url,
  license: 'MIT',
  match: [
    '*://*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${pkg.dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${pkg.dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${pkg.dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
    `https://cdn.jsdelivr.net/npm/vue@${pkg.dependencies.vue}/dist/vue.min.js`,
    `https://cdn.jsdelivr.net/npm/element-ui@${pkg.dependencies['element-ui']}/lib/index.js`,
    `https://cdn.jsdelivr.net/npm/vue-router@${pkg.dependencies['vue-router']}/dist/vue-router.min.js`
  ],
  resource: [
    `element https://cdn.jsdelivr.net/npm/element-ui@${pkg.dependencies['element-ui']}/lib/theme-chalk/index.css`
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
    'GM_Info'
  ],
  connect: [
    '*'
  ],
  'run-at': 'document-end'
}
