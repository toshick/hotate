const { description } = require('../../package');

// const path = process.env.BASE || '/hotate/';
const path = 'hotate';

module.exports = {
  base: `/${path}/`,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ホタテかいぎ',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#fff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    search: false,
    repo: '',
    editLinks: false,
    docsDir: path,
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Event',
        link: `/event/`,
      },
      {
        text: 'Favorite',
        link: `/favorite/`,
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org',
      },
    ],
    sidebar: {
      [`/${path}/guide/`]: [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'using-vue'],
        },
      ],
    },
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
