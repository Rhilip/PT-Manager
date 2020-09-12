const axios = require('axios')
const axiosGmxhrAdapter = require('axios-userscript-adapter')

axios.defaults.adapter = axiosGmxhrAdapter;
axios.defaults.withCredentials = true;

export default axios;