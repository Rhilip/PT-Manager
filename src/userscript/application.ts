import axios from "./lib/axios";
import store from "./lib/storage";

import {AxiosInstance} from "axios";
import GMStorage from "gm-storage";

export class Application {
    axios: AxiosInstance;
    store: typeof GMStorage;

    constructor() {
        this.axios = axios
        this.store = store
    }
}

const app = new Application()

Object.freeze(app)
export default app;