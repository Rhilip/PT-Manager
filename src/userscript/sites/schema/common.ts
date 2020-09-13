import {
    AbstractSite,
    SearchTorrent,
    SearchTorrentFilter,
    SiteConfig,
    userProfile
} from "@/interfaces/sites/AbstractSite";
import store from "@/userscript/lib/storage";
import {NotSupportError} from "@/interfaces/errors";

export abstract class Common implements AbstractSite {
    config: SiteConfig;

    constructor() {
        // 从GMStore中加载用户配置信息作为运行时
        this.config = {
            ...this.getDefaultConfig(),
            ...store.get('SITE:' + this.getDefaultConfig().sid, {})
        }
    }

    abstract getDefaultConfig(): SiteConfig;

    getConfig(): SiteConfig {
        return this.config;
    }

    setConfig(config: Partial<SiteConfig>): void {
        delete config.sid  // 任何情况都不应该更改sid信息
        this.config = {...this.config, ...config}  // 更新运行时配置信息

        store.set('SITE:' + this.config.sid, this.config)  // 保存到GMStore中
    }

    resetConfig(): void {
        this.setConfig(this.getDefaultConfig())
    }

    async getUserProfile(): Promise<userProfile> {
        throw new NotSupportError('暂不支持');
    }

    async searchTorrents(filter: SearchTorrentFilter): Promise<SearchTorrent[]> {
        throw new NotSupportError('暂不支持');
    }

    async dailyCheckSignIn(): Promise<Boolean> {
        throw new NotSupportError('暂不支持');
    }
}