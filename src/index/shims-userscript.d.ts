// 对用户脚本暴露出来的对象进行类型定义
import {Application} from "@/userscript/main";

declare global {
    let __PTM_APP__: Application;
}
