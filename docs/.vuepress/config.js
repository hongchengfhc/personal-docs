module.exports = {
  title: "程",
  description: "运营技术支持部 - 对外文档",
  dest: "dist",
  themeConfig: {
    ...require('./customerConfig/index').themeConfig
  },
  plugins: [
    require('./plugins/copy/index'),
    ['@vuepress/medium-zoom', {
      selector: '.body-content img',
      options: {
        marign: 16
      }
    }],
    // 美化相关
    ["vuepress-plugin-reading-progress"], //顶部进度条
    ["go-top"], // 悬挂猫返回顶部,yarn add -D vuepress-plugin-go-top
    ["element-ui"], // element-ui 插件
    ["flexsearch-pro"], // 搜索支持
    ["vuepress-plugin-mermaidjs"], // mermaid 支持 流程图
  ]
}
