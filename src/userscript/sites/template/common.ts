import {
    AbstractSite,
    SearchTorrent,
    SearchTorrentFilter,
    SiteConfig,
    userProfile
} from "@/interfaces/sites/AbstractSite";
import store from "@/userscript/lib/storage";

export class Common implements AbstractSite {
    // 站点实例运行时配置
    protected config: SiteConfig;

    getDefaultConfig(): SiteConfig {
        return {
            sid: '870d1491-b5ed-4b51-913a-e261808c1662',
            name: 'common',
            host: 'https://www.example.com'
        }
    }

    constructor() {
        // 从GMStore中加载用户配置信息作为运行时
        this.config = {
            ...this.getDefaultConfig(),
            ...store.get('SITE:' + this.getDefaultConfig().sid, {})
        }
    }

    // 使用用户设置更新站点默认配置
    protected setConfig(config: Partial<SiteConfig>): void {
        delete config.sid  // 任何情况都不应该更改sid信息
        this.config = {...this.config, ...config}  // 更新运行时配置信息

        store.set('SITE:' + this.config.sid, this.config)  // 保存到GMStore中
    }

    // 恢复设置到脚本默认
    protected resetConfig(): void {
        this.setConfig(this.getDefaultConfig())
    }

    async getUserProfile(): Promise<userProfile> {
        throw new Error('暂不支持');
    }

    async searchTorrents(filter: SearchTorrentFilter): Promise<SearchTorrent[]> {
        throw new Error('暂不支持');
    }

    async dailyCheckSignIn(): Promise<Boolean> {
        throw new Error('暂不支持');
    }
}