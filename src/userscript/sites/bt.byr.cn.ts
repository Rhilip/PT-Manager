import {NexusPHP} from "@/userscript/sites/schema/nexusphp";
import {SiteConfig} from "@/interfaces/sites/AbstractSite";


export class BYRBT extends NexusPHP {
    getDefaultConfig(): SiteConfig {
        return {
            sid: "f7dc0d0e-c126-4e1f-90d8-395d261ff98d",
            name: "byrbt",
            host: "https://bt.byr.cn/",
        }
    }
}