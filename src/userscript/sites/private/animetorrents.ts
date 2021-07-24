import { ISiteMetadata } from '@/shared/types';
import urlparse from 'url-parse';
import { findThenParseSizeString } from '@/shared/filter';
import Sizzle from 'sizzle';

export const siteMetadata: ISiteMetadata = {
  name: 'AnimeTorrents',
  timezoneOffset: '+0000',
  description: 'Definitive Source For Anime And Manga',
  url: 'https://animetorrents.me/',
  tags: ['动漫'],
  search: {
    keywordsParam: 'search',
    requestConfig: {
      url: '/ajax/torrents_data.php',
      params: {
        total: 146, // Not sure what this is about but its required!
        SearchSubmit: '',
        page: 1,
        searchin: 'filename'
      },
      headers: {
        'x-requested-with': 'XMLHttpRequest'
      }
    },
    categories: [
      {
        name: 'Category',
        key: 'cat',
        options: [
          { value: 1, name: 'Anime Movie' },
          { value: 6, name: 'Anime Movie HD' },
          { value: 2, name: 'Anime Series' },
          { value: 7, name: 'Anime Series HD' },
          { value: 5, name: 'Hentai (censored)' },
          { value: 9, name: 'Hentai (censored) HD' },
          { value: 4, name: 'Hentai (un-censored)' },
          { value: 8, name: 'Hentai (un-censored) HD' },
          { value: 13, name: 'Light Novel' },
          { value: 3, name: 'Manga' },
          { value: 10, name: 'Manga 18+' },
          { value: 11, name: 'OVA' },
          { value: 12, name: 'OVA HD' },
          { value: 14, name: 'Doujin Anime' },
          { value: 15, name: 'Doujin Anime 18+' },
          { value: 16, name: 'Doujin Music' },
          { value: 17, name: 'Doujinshi' },
          { value: 18, name: 'Doujinshi 18+' },
          { value: 19, name: 'OST' }
        ]
      }
    ]
  },
  userInfo: {
    process: [
      {
        requestConfig: { url: '/' },
        fields: ['id', 'name', 'messageCount']
      },
      {
        requestConfig: { url: '/user-profile.php' },
        assertion: { id: 'uid' },
        fields: ['uploaded', 'downloaded', 'levelName', 'bonus', 'joinTime']
      },
      {
        requestConfig: {
          url: '/ajax/user-active-torrents.php',
          headers: {
            'x-requested-with': 'XMLHttpRequest'
          }
        },
        assertion: { id: 'uid' },
        fields: ['seeding', 'seedingSize']
      }
    ]
  },
  selector: {
    search: {
      rows: { selector: 'table.dataTable:last > tbody > tr:gt(0)' },
      id: {
        selector: "a[href*='torrent-details.php?torid=']",
        attr: 'href',
        filters: [
          (query: string) => urlparse(query, true).query.torid
        ]
      },
      title: { selector: "a[href*='torrent-details.php?torid=']" },
      subTitle: { text: '' },
      url: { selector: "a[href*='torrent-details.php?torid=']", attr: 'href' },
      link: { selector: "a[href*='/download.php?torid=']", attr: 'href' },
      time: {
        selector: 'td:nth-of-type(5)',
        filters: [{ name: 'parseTime', args: ['dd MMM yy'] }] // FIXME 需要检查
      },
      size: { selector: 'td:nth-of-type(6)' },
      author: { selector: 'td:nth-last-child(1)' },
      category: {
        selector: 'td:nth-of-type(1) a',
        attr: 'href',
        filters: [
          (query: string) => urlparse(query, true).query.cat
        ]
      },
      seeders: {
        selector: 'td:nth-of-type(8)',
        filters: [
          (query:string) => {
            const connections = query.split('/');
            return connections[0];
          }
        ]
      },
      leechers: {
        selector: 'td:nth-of-type(8)',
        filters: [
          (query:string) => {
            const connections = query.split('/');
            return connections[1];
          }
        ]
      },
      completed: {
        selector: 'td:nth-of-type(8)',
        filters: [
          (query:string) => {
            const connections = query.split('/');
            return connections[2];
          }
        ]
      },
      // comments: {}  // FIXME 旧版参数不知道第几列，所以就算了
      tags: [
        { name: 'Free', selector: "img[alt='Gold Torrent']" },
        { name: '2xUp', selector: "img[alt='2x Multiplier Torrent']" },
        { name: '50%', selector: "img[alt='Silver Torrent']" }
      ]
    },
    userInfo: {
      // page: '/'
      id: {
        selector: ["a[href*='/user-profile.php?uid=']:first"],
        attr: 'href',
        filters: [(query: string) => urlparse(query, true).query.uid]
      },
      name: {
        selector: ["a[href*='/user-profile.php?uid=']:first"]
      },
      messageCount: {
        selector: ["a[href='user-messages.php']"],
        filters: [{ name: 'parseNumber' }]
      },
      // page: '/user-profile.php?uid=$user.id$'
      uploaded: {
        selector: ["tr.dataOdd > td:contains('Uploaded') + td:first"],
        filters: [{ name: 'parseSize' }]
      },
      downloaded: {
        selector: ["tr.dataOdd > td:contains('Downloaded') + td:first"],
        filters: [{ name: 'parseSize' }]
      },
      levelName: {
        selector: ["tr.dataOdd > td:contains('Rank') + td:first"]
      },
      bonus: {
        selector: ["tr.dataOdd > td:contains('Bonus Points') + td:first"],
        filters: [{ name: 'parseNumber' }]
      },
      joinTime: {
        selector: "tr.dataOdd > td:contains('Join date') + td:first",
        filters: [
          (query:string) => query.split(' [')[0],
          { name: 'parseTime' }
        ]
      },
      // page: '/ajax/user-active-torrents.php?uid=$user.id$'
      seeding: {
        selector: ':self',
        elementProcess: (doc: Document) => {
          const trAnothers = Sizzle('tr:not(:eq(0))', doc);
          return trAnothers.length;
        }
      },
      seedingSize: {
        selector: ':self',
        elementProcess: (doc: Document) => {
          let seedingSize = 0;
          const trAnothers = Sizzle('tr:not(:eq(0))', doc);
          trAnothers.forEach(trAnother => {
            const sizeAnother = Sizzle('td:eq(2)', trAnother);
            seedingSize += findThenParseSizeString((sizeAnother[0] as HTMLElement).innerText.trim());
          });
          return seedingSize;
        }
      }
    }
  }
};
