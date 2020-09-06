import {AbstractSite, SearchTorrent, SearchTorrentFilter, userProfile} from "@/interfaces/sites/AbstractSite";

export class Common implements AbstractSite {
    /**
     * 每个模板/站点都必须设置sid，格式为UUIDv4
     * @url: https://www.uuidgenerator.net/version4
     */
    protected sid = '870d1491-b5ed-4b51-913a-e261808c1662';

    /**
     * 模板/站点 名称
     */
    protected name = 'common';

    async checkLogin(): Promise<Boolean> {
        return false;
    }

    getUserProfile(): Promise<userProfile> {
        throw new Error('暂不支持');
    }

    async searchTorrents(filter: SearchTorrentFilter): Promise<SearchTorrent[]> {
        throw new Error('暂不支持');
    }
}