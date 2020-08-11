// 对用户脚本暴露出来的对象进行类型定义
import {Application} from "@/userscript/application";

declare global {
    let __PT_MANAGER__: Application;
}