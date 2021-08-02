
const sidebarCSS = () => {
  return [
    {
      title: '工具',
      collapsable: false,
      children: [
        ["三角形生成器", "三角形生成器"],
        ["小于12px的文字生成器", "小于 12px 的文字生成器"]
      ]
    },
    {
      title: '属性',
      collapsable: false,
      children: [
        { title: "滤镜 filter", path: "滤镜filter" },
        // { title: "flexbox", path: "flexbox" },
      ]
    },
    {
      title: "动",
      collapsable: false,
      children: [
        ["图片闪光", "图片闪光"]
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
        ["2021前端必读", "2021前端必读"],
        ["解决移动端300ms延迟点击的问题", '解决移动端300ms延迟点击的问题'],
        "使用apng动画的两种方式",
        "MessageChannel",
        "MutationObserver"
      ]
    },
    {
      title: '奇技淫巧',
      collapsable: false,
      children: [
        ["小干货演示", "小干货演示"]
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
        ["Vue响应式原理介绍", 'Vue响应式原理'],
        ["VueRouter原理实现", "VueRouter原理实现"],
        ["Vue虚拟DOM以及Diff算法", "Vue的Diff算法"]
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
      children: [
        ["前端工程化概述", "前端工程化概述"],
        ["前端脚手架工具", "前端脚手架工具"],
        ["前端自动化构建", "前端自动化构建"]
      ]
    },
    {
      title: 'Vue.js框架源码与进阶',
      collapsable: false,
      children: []
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
