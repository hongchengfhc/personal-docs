
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
        ["解决移动端300ms延迟点击的问题", '解决移动端300ms延迟点击的问题'],
        "使用apng动画的两种方式"
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

const sidebarNote = () => {
  return [
    {
      title: 'JavaScript 深度剖析',
      collapsable: false,
      children: [
        ['函数式编程', '函数式编程'],
        ['异步编程', '异步编程'],
        ['MyPromise', 'MyPromise'],
        "ESMAScript新特性",
        "TypeScript介绍及JS类型检查",
        "JS性能优化及垃圾回收",
        "JS性能检测及优化"
      ]
    },
    {
      title: '前端工程化实战',
      collapsable: false,
      children: []
    },
    {
      title: 'Vue.js框架源码与进阶',
      collapsable: false,
      children: [

      ]
    }
  ]
}


const all = {
  css: sidebarCSS(),
  js: sidebarJS(),
  vue: sidebarVUE(),
  note: sidebarNote()
}

module.exports = all;
