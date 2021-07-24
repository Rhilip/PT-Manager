import { ISearchFilter, ISiteMetadata } from '@/shared/types';
import BittorrentSite from '../schema/AbstractBittorrentSite';
import { AxiosRequestConfig } from 'axios';
import dayjs from '@/shared/dayjs';

export const siteMetadata: ISiteMetadata = {
  name: 'ACGsou',
  description: '简单动漫BT下载站全面为网友提供日本动画，漫画，电子书，动漫音乐，动漫游戏等优质资源的BT下载服务。',
  url: 'https://www.36dm.com/',
  legacyUrl: [
    'https://www.36dm.club/',
    'https://www.acgsou.com/'
  ],
  timezoneOffset: '+0800',
  search: {
    requestConfig: { url: '/search.php' },
    keywordsParam: 'keyword',
    categories: [
      {
        name: 'Category',
        key: 'sort_id',
        options: [
          { name: '所有', value: 0 },
          { name: '动画分类', value: 2 },
          { name: '动画分类 - 新番连载', value: 7 },
          { name: '动画分类 - 完整动画', value: 8 },
          { name: '动画分类 - 剧场版', value: 9 },
          { name: '动画分类 - DVDRIP', value: 10 },
          { name: '动画分类 - BDRIP', value: 11 },
          { name: '漫画分类', value: 3 },
          { name: '漫画分类 - 连载漫画', value: 12 },
          { name: '漫画分类 - 完整漫画', value: 13 },
          { name: '漫画分类 - 原版漫画', value: 14 },
          { name: '动漫音乐', value: 4 },
          { name: '动漫音乐 - 动画MV', value: 15 },
          { name: 'RAW/ISO', value: 5 },
          { name: '日剧', value: 20 },
          { name: '日剧 - 特摄片', value: 21 },
          { name: '其他资源', value: 6 },
          { name: '其他资源 - 其他动画', value: 16 },
          { name: '其他资源 - 声优视频', value: 17 },
          { name: '其他资源 - 动漫资讯', value: 19 },
          { name: '其他资源 - 游戏', value: 18 }
        ]
      }
    ]
  },
  selector: {
    search: {
      rows: { selector: 'tbody#data_list > tr' },
      id: {
        selector: 'td:nth-child(3) a',
        attr: 'href',
        filters: [
          (q: string) => q.match(/show-(.+)\.html/)![1]
        ]
      },
      title: { selector: 'td:nth-child(3) a' },
      url: { selector: 'td:nth-child(3) a', attr: 'href' },
      time: {
        selector: 'td:nth-child(1)',
        filters: [
          (q:string) => {
            // 2016/07/10
            // 01/21 18:00
            return dayjs(q, ['MM/DD HH:mm', 'YYYY/MM/DD']).valueOf();
          }
        ]
      },
      size: { selector: 'td:nth-child(4)' },
      seeders: { text: 1 },
      leechers: { text: 1 },
      category: { selector: 'td:nth-child(2)' }
    },
    detail: {
      link: { selector: 'div#torrent_files a', attr: 'href' }
    }
  }
};

// noinspection JSUnusedGlobalSymbols
export default class Acgsou extends BittorrentSite {
  protected override async transformSearchFilter (filter: ISearchFilter): Promise<AxiosRequestConfig> {
    const config = await super.transformSearchFilter(filter);
    config.url = filter.keywords ? '/search.php' : '1.html';

    return config;
  }
}
