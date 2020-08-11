import {AxiosInstance} from "axios";

const axios = require('axios')
const axiosGmxhrAdapter = require('axios-userscript-adapter')

axios.defaults.adapter = axiosGmxhrAdapter;

class Bridge {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios
    }
}

const bridge = new Bridge()

Object.freeze(bridge)

// @ts-ignore 置入全局对象中
unsafeWindow['__PTM_BRIDGE__'] = bridge