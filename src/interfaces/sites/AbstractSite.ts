export interface AbstractSite {

    // 检查用户是否登录方法
    checkLogin: () => Promise<Boolean>;

    // 种子搜索方法
    searchTorrents: (filter: SearchTorrentFilter) => Promise<SearchTorrent[]>;

    // 用户信息获取方法
    getUserProfile: () => Promise<userProfile>;
}

export interface SearchTorrentExtraParams {
    [key: string]: string
}

// 搜索种子时请求的参数
export interface SearchTorrentFilter {
    keywords?: string,   // 搜索字符串
    params?: SearchTorrentExtraParams  // 其他搜索参数
}

export type TorrentDiscount = 'Free' | '2xFree' | '2xUp' | '2x50%' | '30%' | '50%' | 'Normal' | 'Other'

export type TorrentStatus =
    'downloading' // 正在下载
    | 'seeding' //  正在上传
    | 'downloaded' //  曾经下载过，但是目前未做种
    | 'unknown'  // 不明，可能未下载过也可能该站点不支持状态查询

// 搜索得到的种子结果
export interface SearchTorrent {
    title: string, // 主标题
    subTitle?: string,  // 副标题
    category?: string,   // 板块名称
    pageLink: string,  // 访问链接
    downloadLink: string,   // 下载链接
    size: number,   // 种子大小，未获取到请置0
    addTime: number,   // 种子添加时间戳（毫秒）
    uploader: string,   // 种子上传者，未获取到请置""

    seeders: number,   // 当前上传者人数
    leechers: number,  // 当前下载者人数
    completed: number,  // 当前完成人数
    comments?: number,  // 当前评论人数

    // 与该种子有关的用户状态
    discount: TorrentDiscount,      // 种子优惠类型
    status: TorrentStatus,     // 用户该种子下载状态
    process?: number,   //  用户下载进程 （0-100）
}

export interface userProfile {
    updatedAt: number,  // 上次更新时间戳

    username: string,  // 用户名
    levelName: string,  // 用户等级

    uploaded: number,   // 上传量
    downloaded: number,   // 下载量
    bonus?: number,   // 魔力值

    seeding?: {
        count: number,  // 做种数量
        size: number,  // 做种体积
    }, // 做种信息

    // 以下信息仅第一次获取信息时获取，后续应直接沿用
    id: number, // 用户id
    joinedAt: number,  // 加入站点时间戳
}