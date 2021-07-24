import { ISiteMetadata, IUserInfo, ETorrentBaseTagColor, ITorrentTag } from '@/shared/types';
import PrivateSite from '../schema/AbstractPrivateSite';
import Sizzle from 'sizzle';
import {
  findThenParseNumberString,
  parseSizeString
} from '@/shared/filter';

interface rawTorrent {
  added: string, // the date and time (in utc) the item was uploaded to site
  'author_info': string, // json object of id:name pairs
  bookmarked: string | null, // Datetime of when an item was bookmarked by the user (or null if not bookmarked)
  browseflags: number, // bit field of the different tags and flags on a torrent see [link pending] for more information
  cat: string, // the html display for the category based on the users preferences
  category: number, // specific category id the item is in
  catname: string, // the category the item is in
  comments: number, // number of comments users have added to the item
  dl: string, // user specific hash to download the torrent file. You can download by appending it to the url: /tor/download.php/
  filetypes: string, // concatenated string of file types
  'fl_vip': boolean, // if the item is freeleech and/or vip
  free: boolean, // if the item is freeleech or not
  id: number, // the id of the torrent itself. User can pull up the page via /t/{id}
  'lang_code': string, // the 3 letter ISO code for the language
  language: number, // the internal int for the language
  leechers: number, // number of leechers
  'main_cat': number, // the main category id this is in. 13 = AudioBooks, 14 = E-Books, 15 = Musicology, 16 = Radio
  'narrator_info': string, // json object of id:name pairs
  numfiles: number, // number of files in the torrent
  owner: number, // userid of the uploader
  'owner_name': string, // username of the uploader
  seeders: number, // number of seeders
  'series_info': string, // json object of id:name pairs
  size: string, // Size of the torrent
  tags: string,
  'times_completed': number, // number of users who have fully snatched the torrent
  title: string,
  vip: boolean, // if the item is vip or not
}

interface seedingResp {
  rows: {
    catname: string;
    catimg: string;
    category: string;
    id: string;
    title: string;
    comments: string;
    'last_seed': string;
    size: string;
    tags: string;
    browseFlags: string;
    free: string;
    vip: string;
    'times_completed': string;
    uploaded: string;
    downloaded: string;
    'complete_date': string;
    'complete_unix': string;
    seedtime: string;
    leechtime: string;
    OneToOne: string;
    'last_action': string;
    'last_action_unix': string;
    'start_date': string;
    'start_unix': string;
    finished: string;
    'to_go': string;
    seeders: string;
    leechers: string;
    uploaderName: string;
    uploadNameVis: string;
    uploaderID: string;
    personalFree: string;
    uploadPretty: string;
    downloadPretty: string;
    ratioColor: string;
    ratio: string;
    seedtimeColor: string;
    seedtimePretty: string;
    leechtimePretty: string;
    cat: string;
    dl: string;
    percentDone: number;
    'to_go_pretty': string;
    STG: string;
    author: {
      id: string;
      name: string;
      number: string;
      tab: string;
    }[];
    fileTypes: {
      id: string;
      name: string;
      number: string;
      tab: string;
    }[];
    fileTypesDisabled: {
      id: string;
      name: string;
      number: string;
      tab: string;
    }[];
  }[];
  success: boolean;
}

export const siteMetadata: ISiteMetadata = {
  name: 'MyAnonaMouse',
  description: 'Friendliness, Warmth and Sharing',
  url: 'https://www.myanonamouse.net/',
  tags: ['电子书', '有声书'],
  collaborator: ['tongyifan', 'Rhilip'],
  search: {
    /**
     * 更新为API接口
     * @docs: /api/endpoint.php/1/tor/js/loadSearchJSONbasic.php
     */
    keywordsParam: 'tor[text]',
    requestConfig: {
      url: '/tor/js/loadSearchJSONbasic.php',
      params: {
        'tor[srchIn][title]': true,
        'tor[srchIn][author]': true,
        'tor[srchIn][narrator]': true,
        'tor[searchType]': 'all',
        'tor[searchIn]': 'torrents',
        'tor[cat]': [0],
        'tor[browseFlagsHideVsShow]': 0,
        'tor[sortType]': 'default',
        'tor[startNumber]': 0
        // dlLink: 1  // include the url to download the torrent
      },
      responseType: 'json'
    }
  },
  userInfo: {
    process: [
      {
        requestConfig: { url: '/index.php' },
        fields: ['id', 'name', 'messageCount']
      },
      {
        requestConfig: { url: '/u/$userId$' },
        assertion: { id: 'userId' },
        fields: ['uploaded', 'downloaded', 'levelName', 'bonus', 'joinTime']
      }
    ]
  },
  selector: {
    search: {
      rows: { selector: 'data' },
      id: { selector: 'id' },
      title: { selector: 'title' },
      subTitle: { selector: 'tags' },
      url: { selector: 'id', filters: [(id: number) => `/t/${id}`] },
      link: { selector: 'id', filters: [(id: number) => `/tor/download.php?tid=${id}`] },
      time: { selector: 'added' },
      size: { selector: 'size' },
      author: { selector: 'owner_name' },
      category: { selector: 'catname' },
      seeders: { selector: 'seeders' },
      leechers: { selector: 'leechers' },
      completed: { selector: 'times_completed' },
      comments: { selector: 'comments' }
    },
    userInfo: {
      id: {
        selector: 'li.myInfo > a',
        attr: 'href',
        filters: [
          (query: string) => query.match(/(\d+)/)![1]
        ]
      },
      name: {
        selector: 'a#userMenu',
        filters: [
          (query: string) => query.replace('↓', '').trim()
        ]
      },
      messageCount: {
        selector: 'div#sbNotifs',
        elementProcess: (div: Document) => {
          let msgCount = 0;
          const msgAnothers = Sizzle('a.tmnb, a.tmn, a.tmng', div);
          msgAnothers.forEach(msgAnother => {
            const msgText = (msgAnother as HTMLElement).innerText.trim();
            msgCount += findThenParseNumberString(msgText);
          });
          return msgCount;
        }
      },
      uploaded: {
        selector: "td.rowhead:contains('Uploaded'):eq(0) + td",
        filters: [{ name: 'parseSize' }]
      },
      downloaded: {
        selector: "td.rowhead:contains('Downloaded'):eq(0) + td",
        filters: [{ name: 'parseSize' }]
      },
      levelName: {
        selector: "td.rowhead:contains('Class') + td"
      },
      bonus: {
        selector: 'a#tmBP',
        filters: [
          (query: string) => {
            const queryMatch = query.replace(/,/g, '').match(/Bonus: ([\d.]+)/);
            return (queryMatch && queryMatch.length >= 2) ? parseFloat(queryMatch[1]) : 0;
          }
        ]
      },
      joinTime: {
        selector: "td.rowhead:contains('Join'):contains('date') + td",
        filters: [
          (query: string) => query.split(' (')[0],
          { name: 'parseTime' }
        ]
      }
    }
  }
};

export default class myanonamouse extends PrivateSite {
  protected override parseTagsFromRow (row: rawTorrent): ITorrentTag[] {
    const tags: ITorrentTag[] = [];
    if (row.vip) {
      tags.push({ name: 'VIP', color: ETorrentBaseTagColor.VIP });
    }
    if (row.free) {
      tags.push({ name: 'Free', color: ETorrentBaseTagColor.Free });
    }

    return tags;
  }

  // userscript 模式下无法获取mamId Cookies，所以无法得到做种信息
  private async getUserSeedingInfo (userid: number): Promise<{ seeding?: number, seedingSize?: number }> {
    return { seeding: 0, seedingSize: 0 };
  }

  public override async flushUserInfo (lastUserInfo: Partial<IUserInfo> = {}): Promise<IUserInfo> {
    let userInfo = await super.flushUserInfo();

    if (userInfo.id && (!userInfo.seeding || !userInfo.seedingSize)) {
      userInfo = {
        ...await this.getUserSeedingInfo(userInfo.id as number),
        ...userInfo
      };
    }

    return userInfo;
  }
}
