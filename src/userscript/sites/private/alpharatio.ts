import { ISiteMetadata } from '@/shared/types'

export const siteMetadata: ISiteMetadata = {
  name: 'AlphaRatio',
  timezoneOffset: '+0000',
  description: '0day',
  url: 'https://alpharatio.cc/',
  tags: ['综合', '0day'],
  schema: 'GazelleJSONAPI',
  collaborator: 'enigamz',
  search: {
    categories: [
      {
        name: 'Category',
        key: 'filter_cat',
        options: [
          { value: 1, name: 'Tv/SD' },
          { value: 2, name: 'Tv/HD' },
          { value: 3, name: 'Tv/UHD' },
          { value: 4, name: 'Tv/DVDRip' },
          { value: 5, name: 'Tv/PackSD' },
          { value: 6, name: 'Tv/PackHD' },
          { value: 7, name: 'Tv/PackUHD' },
          { value: 8, name: 'Movie/SD' },
          { value: 9, name: 'Movie/HD' },
          { value: 10, name: 'Movie/UHD' },
          { value: 11, name: 'Movie/PackSD' },
          { value: 12, name: 'Movie/PackHD' },
          { value: 13, name: 'Movie/PackUHD' },
          { value: 14, name: 'Movie/XXX' },
          { value: 15, name: 'Bluray' },
          { value: 16, name: 'Anime/SD' },
          { value: 17, name: 'Anime/HD' },
          { value: 18, name: 'Games/PC' },
          { value: 19, name: 'Games/xBox' },
          { value: 20, name: 'Games/PS' },
          { value: 21, name: 'Games/Nin' },
          { value: 22, name: 'Apps/Windows' },
          { value: 23, name: 'Apps/MAC' },
          { value: 24, name: 'Apps/Linux' },
          { value: 25, name: 'Apps/Mobile' },
          { value: 26, name: '0day/XXX' },
          { value: 27, name: 'eBook' },
          { value: 28, name: 'AudioBook' },
          { value: 29, name: 'Music' },
          { value: 30, name: 'Misc' }
        ],
        cross: { mode: 'append' }
      }
    ]
  }
};
