import {Common} from "@/userscript/sites/template/common";
import {SiteConfig} from "@/interfaces/sites/AbstractSite";

export class NexusPHP extends Common {
    getDefaultConfig(): SiteConfig {
        return {
            sid: '50e5b7cd-de98-4e50-99df-9d5ceceee2f6',
            name: 'nexusphp',
            host: 'https://www.example.com'
        }
    }
}