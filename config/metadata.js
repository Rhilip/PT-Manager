const pkg = require('../package.json')

module.exports = {
  name: 'PT-Manager',
  namespace: 'https://blog.rhilip.info/',
  version: `${pkg.version}.${Math.floor(new Date() / 1000)}`,
  author: pkg.author,
  source: pkg.repository.url,
  license: 'MIT',
  match: [
    '*://*'
  ],
  require: [
    `${pkg.cdn}jquery@${pkg.dependencies.jquery}/dist/jquery.min.js`,
    `${pkg.cdn}axios@${pkg.dependencies.axios}/dist/axios.min.js`,
    `${pkg.cdn}axios-userscript-adapter@${pkg.dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
    `${pkg.cdn}vue@${pkg.dependencies.vue}/dist/vue.min.js`,
    `${pkg.cdn}element-ui@${pkg.dependencies['element-ui']}/lib/index.js`,
    `${pkg.cdn}vue-router@${pkg.dependencies['vue-router']}/dist/vue-router.min.js`
  ],
  resource: [
    `element ${pkg.cdn}element-ui@${pkg.dependencies['element-ui']}/lib/theme-chalk/index.css`
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
