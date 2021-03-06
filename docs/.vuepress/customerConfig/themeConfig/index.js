
const frontEnd = require('./front-end')
const backEnd = require('./back-end')
const tool = require('./tool')
const blog = require('./blog')


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
          text: "前端文章",
          items: [
            { text: "Vue", link: "/front-end/vue/Vue响应式原理介绍" },
            { text: "JS", link: "/front-end/js/2021前端必读" },
            { text: "CSS", link: "/front-end/css/小于12px的文字生成器" }
          ]
        },
        {
          text: "前端笔记",
          items: [
            { text: "前端进阶训练", link: "/front-end/note/函数式编程" }
          ]
        }
      ]
    },
    {
      text: "后端",
      items: [
        {
          text: "NodeJs",
          link: "/back-end/nodejs/使用nvm和nrm安装并管理node.js开发环境"
        }
      ]
    },
    {
      text: "工具",
      link: "/tool/安装iTerm2&&OnMyZsh"
    },
    {
      text: "优秀博客",
      link: "/blog/npm-install原理分析"
    },
    {
      text: "生活"
    }
  ],
  sidebar: {
    '/front-end/css/': frontEnd.css,
    '/front-end/js/': frontEnd.js,
    '/front-end/vue/': frontEnd.vue,
    '/front-end/note/': frontEnd.note,
    '/back-end/nodejs/': backEnd.nodejs,
    '/tool/': tool.all,
    '/blog/': blog.all
  }
}
