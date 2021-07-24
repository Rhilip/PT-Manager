import { ISiteMetadata } from '@/shared/types'

export const siteMetadata: ISiteMetadata = {
  name: 'AniSource',
  description: 'AniSource is a Public site for HD Anime raws.',
  timezoneOffset: '-0900',
  url: 'https://asnet.pw/',
  search: {
    keywordsParam: 'search',
    categories: [
      {
        name: 'Category',
        key: 'mode',
        options: [
          { name: 'All', value: '' },
          { name: 'Batches', value: 1 },
          { name: 'スカーRaws', value: 2 },
          { name: 'Raws-4U', value: 3 },
          { name: 'Audio-4U', value: 5 },
          { name: 'Leopard-Raws', value: 4 },
          { name: 'Other', value: 6 }
        ]
      }
    ]
  },
  selector: {
    search: {
      rows: { selector: 'div.torrents > div[class^="item"]' },
      id: { selector: ':self', attr: 'id', filters: [(q:string) => q.replace('item_', '')] },
      title: { selector: 'span.info > a', attr: 'title', filters: [(q:string) => q.replace(/^Download /, '')] },
      url: { selector: 'span.info > a', attr: 'href' },
      link: { selector: 'span.category > a', attr: 'href' },
      time: {
        selector: 'span.info > font:last-of-type',
        filters: [
          (q:string) => {
            // 2010-06-07 at 13:29 Central US (UTC -9:00)
            const rawDate = q.split(' | ')[0].replace('Date: ', '').split(' ');
            return `${rawDate[0]} ${rawDate[2]}`;
          }
        ]
      },
      size: {
        selector: 'span.info > font:last-of-type',
        filters: [
          (q:string) => q.split(' | ')[1].replace('Size: ', '')
        ]
      },
      comments: { text: 0, selector: 'span.stats font:contains("Comments: ") b' },
      category: { selector: 'span.category' }
    }
  }
};
