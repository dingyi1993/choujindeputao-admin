module.exports = {
  siteName: 'AntD Admin',
  copyright: 'Ant Design Admin  © 2018 zuiidea',
  logoPath: './logo.svg',
  apiPrefix: `${process.env.NODE_ENV === 'production' ? 'https://www.dingyi1993.com' : 'http://127.0.0.1:7001'}/api`,
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: './america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: './china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
