/**
 * @typedef {Object} AxiosResponse
 * @property {Object} data
 * @property {Object} headers
 * @property {Object} config
 * @property {Object} request
 * @property {number} code
 * @property {string} statusText
 */
/**
 * @typedef {Object} AxiosError
 * @property {AxiosResponse} response
 */
import axios from 'axios'
import adapter from 'axios-userscript-adapter'

axios.defaults.adapter = adapter

const managerHost = ['' /* 以文件形式调试 file://xxxxx */, 'ptm.rhilip.info', '']
const replace_css_url = require('replace-css-url')
const pkg = require('../../package.json')

function insertElementCss () {
  // 解决Element CSS中url使用 url(/....) 的形式引入，导致无法使用CDN
  let css = GM_getResourceText('element')
  css = replace_css_url(css, function (path) { // 以 data: 开头的base64编码图片应该不做替换
    return path.search('data:') === 0 ? path : `https://cdn.jsdelivr.net/npm/element-ui@${pkg.dependencies['element-ui']}/lib/theme-chalk/${path}`
  })
  GM_addStyle(css)
}

export { axios, managerHost, insertElementCss }
