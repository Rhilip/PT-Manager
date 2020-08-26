import axios from "./lib/axios";
import store from "./lib/storage";

import {AxiosInstance} from "axios";
import GMStorage from "gm-storage";

import {Site} from "@/common/interfaces/common";
import {CantInsertScriptError} from "@/common/interfaces/errors";

export default class Application {
    // 对象
    public axios: AxiosInstance;
    public store: typeof GMStorage;

    private managerHostname: string[] = [
        'ptm.rhilip.info',  // 默认公网域名
        'localhost'   //  本地调试域名
    ]

    constructor() {
        this.axios = axios
        this.store = store
    }

    // 辨别url，根据url判断是否应该页面的Application类型
    async init() {
        // Init Manager
        if (location.hostname === store.get('CONFIG_MANAGER_HOSTNAME')  // 与用户自定义hostname进行对比
            || this.managerHostname.includes(location.hostname)  // 默认的Hostname列表
        ) {
            return await this.initManagerPage()
        }

        // Init Insert
        return await this.initSupportSitePage()
    }

    // 管理页面注入脚本，该功能最为完善
    async initManagerPage() {
        // 首先 判断是不是在install页面，如果是的话，重定向到安装后的首页，即 '#/'
        if (location.hash === '#/install') {
            location.hash = '#/'
        }

        console.log('Insert PTM on Manager Page')
    }

    // 受支持的站点页面，注入部分管理脚本
    async initSupportSitePage() {
        // TODO 根据已添加的站点信息，添加对应的注入脚本
        const allSites: Site[] = store.get('CONFIG_ALL_SITES', [])
        for (let site of allSites) {
            console.log(site)
        }

        // 最后应该抛出一个错误，让try捕捉到，说明未在前面的站点配置项中搜索到该网址对应的配置
        throw new CantInsertScriptError('访问未被添加的站点网址或不是PT站点的网址')
    }
}