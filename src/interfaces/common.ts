// 模板类型，所有模板均应在此注册
export type Template = 'CommonSite' | 'NexusphpSite'

// 站点基本信息，由系统侧定义
export interface SiteSchema {
    id: string,    // 模板ID （UUIDv4，如果是内置站点，则直接使用已定义的，不然则自动生成）
    template: Template,  // 模板类型
}

// 站点信息，由用户定义
export interface Site {
    id: string,    // 站点ID （UUIDv4，如果是内置站点，则直接使用已定义的，不然则自动生成）
    name: string,  // 站点名称 （可以让用户自定义，但提供默认）
    schema: Template | SiteSchema,  //
}

// 搜索设置
export interface SearchFilter {
    keywords: string,  // 搜索关键词
}

// 种子信息
export interface Torrent {

}

// 用户信息
export interface UserInfo {
    id: number,   // 用户Id
    name: string,  // 用户名
    levelName?: string,  // 用户等级
    uploaded?: number,  // 上传量
    downloaded?: number,  // 下载量
    seeding?: number,  // 当前做种数
    leeching?: number,  // 当前下载数
    seedingSize?: number,  // 做种体积
    bonus?: number,  // 魔力值
    messageCount?: number,  // 用户未读信息数
    lastUpdateAt?: number,  // 最后更新时间
}

// 站点底层方法，所有站点模板、站点实例均应实现该接口定义
export interface CommonSiteInterface {
    config: Site,

    /**
     * 登录检查方法（所有涉及网站的在此之前均应调用该方法进行检查登录状态
     *
     * @return Promise<boolean>
     * @throws NotLoggedError
     */
    isLoggedCheck(): Promise<boolean>

    /**
     * 搜索方法
     *
     * @param filter
     * @return Promise<Torrent[]>
     * @throws NotLoggedError
     * @throws ParsePageError
     */
    searchTorrents(filter: SearchFilter): Promise<Torrent[]>

    // 用户信息方法
    getUserInfo(): Promise<UserInfo>

    // 获得用户历史信息
    getUserInfoHistory(): Promise<UserInfo[]>
}

export const CommonSiteSchema: SiteSchema = {
    id: "61096d69-84f1-4401-8dd6-dfe660155f74",
    template: 'CommonSite'
}