
const frontEnd = require('./front-end')



module.exports = {
  // logo: "/icons/icon-logo.png",
  logo: "https://vuepress.vuejs.org/hero.png",
  lastUpdated: '最后更新时间 ',
  repo: 'https://github.com/hongchengfhc/personal-docs.git',
  repoLabel: "查看源码",
  docsDir: 'docs',
  editLinks: true,
  docsBranch: "test",
  editLinkText: '帮助我改善这个页面',
  smoothScroll: false, // 关掉 锚点 动画
  backToTop: true,
  nav: [
    {
      text: "首页",
      link: "/"
    },
    {
      text: "前端",
      items: [
        {
          text: "Vue",
          link: "/front-end/vue/Vue响应式原理介绍"
        },
        {
          text: "JS",
          link: "/front-end/js/解决移动端300ms延迟点击的问题"
        },
        {
          text: "CSS",
          link: "/front-end/css/小于12px的文字生成器"
        }
      ]
    }
  ],
  sidebar: {
    '/front-end/css/': frontEnd.css,
    '/front-end/js/': frontEnd.js,
    '/front-end/vue/': frontEnd.vue
  }
}
