import {AxiosInstance} from "axios";

const axios = require('axios')
const axiosGmxhrAdapter = require('axios-userscript-adapter')
const GMStorage = require('gm-storage')

axios.defaults.adapter = axiosGmxhrAdapter;

class Bridge {
    axios: AxiosInstance;
    store: typeof GMStorage;

    constructor() {
        this.axios = axios
        this.store = new GMStorage()
    }
}

const bridge = new Bridge()

Object.freeze(bridge)

// @ts-ignore 置入全局对象中
unsafeWindow['__PTM_BRIDGE__'] = bridge