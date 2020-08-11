// 对用户脚本暴露出来的对象进行类型定义
import {AxiosInstance} from "axios";

type Bridge = {
    axios: AxiosInstance;
};

declare global {
    let __PTM_BRIDGE__: Bridge;
}