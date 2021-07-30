
const sidebarCSS = () => {
  return [
    {
      title: '工具',
      collapsable: false,
      children: [
        {
          title: "小于 12px 的文字生成器", path: '小于12px的文字生成器'
        }
      ]
    }
  ]
}

const sidebarJS = () => {
  return [
    {
      title: '实用',
      collapsable: false,
      children: [
        ["解决移动端300ms延迟点击的问题", '解决移动端300ms延迟点击的问题']
      ]
    }
  ]
}

const sidebarVUE = () => {
  return [
    {
      title: 'Vue响应式',
      collapsable: false,
      children: [
        ["Vue响应式原理介绍", 'Vue响应式原理']
      ]
    }
  ]
}

const all = {
  css: sidebarCSS(),
  js: sidebarJS(),
  vue: sidebarVUE()
}

module.exports = all;
