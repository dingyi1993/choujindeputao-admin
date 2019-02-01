module.exports = {
  siteName: '抽筋的葡萄后台',
  copyright: '抽筋的葡萄  © 2019 dingyi1993',
  logoPath: './logo.svg',
  apiPrefix: `${process.env.NODE_ENV === 'production' ? 'https://www.dingyi1993.com' : 'http://127.0.0.1:7001'}/api`,
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
}
