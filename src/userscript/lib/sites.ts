import {ISiteMetadata} from "@/shared/types/site";

type supportModuleType = 'schema' | 'public' | 'private'
type siteName = `${supportModuleType}/${string}`

const supportList: Record<string, { siteMetadata: ISiteMetadata, default?: any }> = {};

const context = require.context('../sites', true, /\.ts$/);

context.keys().forEach(async (value) => {
    const moduleName = value.replace(/^\.\//, '').replace(/\.ts$/, '');

    if (!moduleName.startsWith('schema')) { // 'schema/Abstract' 不应该被任何形式的导入和引用，也不会被构造
        supportList[moduleName] = await context(value);
    }
});

export default class Sites {


    get ctx() {
        return context;
    }

    get supportList() {
        return supportList;
    }

    get allSiteMetaData() {
        return Object.keys(supportList).map(key => this.getSiteMetaData(key))
    }

    get enabledSite(): Set<string> {
        return new Set(GM_getValue('enable_sites',[]));
    }

    getSiteMetaData(key: string) {
        return {...supportList[key].siteMetadata, type: key.split('/')[0], key}
    }

    flushEnabledSite(enabledSites: Set<string>) {
        GM_setValue('enable_sites', Array.from(enabledSites));
    }

    enableSite(siteName: siteName) {
        const site = this.enabledSite;
        site.add(siteName);
        this.flushEnabledSite(site);
    }

    disableSite(siteName: siteName) {
        const site = this.enabledSite;
        site.delete(siteName);
        this.flushEnabledSite(site);
    }

    async getSite(siteName: siteName) {
        const siteModule = supportList[siteName];
        // eslint-disable-next-line prefer-const
        let {siteMetadata: siteMetaData, default: SiteClass} = siteModule;

        if (!siteMetaData.schema) {
            siteMetaData.schema = siteName.includes('private') ? 'AbstractPrivateSite' : 'AbstractBittorrentSite';
        }

        /**
         * 如果该模块没有导出 default class，那么我们认为我们需要从基类继承
         * 并覆写基类的的 siteMetaData 信息
         */
        if (!SiteClass) {
            const schemaModule = await context(`./schema/${siteMetaData.schema}.ts`);
            SiteClass = schemaModule.default;
        }

        // @ts-ignore
        return new SiteClass({}, siteMetaData);
    }
}
