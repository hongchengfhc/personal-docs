---
title: Vue的Diff算法
---

# Vue的Diff算法

## `Vue` 的虚拟 `DOM` 参考了 `snabbdom`

-------


## 1. 什么是虚拟DOM Virtual DOM
* Virtual DOM(虚拟DOM)，是由普通的JS对象来描述DOM对象
* 真实DOM成员 - 属性太多
* 使用 Virtual DOM 来描述真实DOM
```javascript
{
    sel: "div",
    data: {},
    children: undefined,
    text: "Hello Virtual DOM",
    elm: undefined,
    key: undefined
}
```

## 2. 为什么要使用 Virtual DOM
* MVVM 框架解决视图和状态同步问题
* 模板引擎可以简化视图操作，没办法跟踪状态
* 虚拟DOM跟踪状态变化

**virtual-dom**的动机描述 -- 参考 github上的 virtual-dom
* 虚拟DOM可以维护程序的状态，跟踪上一次的状态
* 通过比较前后两次状态差异更新真实DOM



## 3. 虚拟DOM的作用
* 维护视图和状态的关系
* 复杂视图情况下提升渲染性能
* 跨平台
    * 浏览器平台渲染DOM
    * 服务端渲染 SSR (Nuxt.js/Next.js)
    * 原生应用(Weex/React Native)
    * 小程序(mpvue/uni-app)等

**虚拟DOM库**
* `Snabbdom`
    * Vue.js 2.x 内部使用的虚拟DOM就是改造的 Snabbdom
    * 大约 200SLOC(single line of code)
    * 通过模块可扩展
    * 源码使用 `TypeScript` 开发
    * 最快的 Virtual DOM 之一

* `virtual-dom`



## `Diff` 算法


```
快速记忆如下:
四种命中查找
1. 旧前新前
2. 旧后新后
3. 旧前新后
4. 旧后新前

3=> （此项发生了，那么旧前指向的节点，移动到旧后之后）
4=> （此项发生了，那么旧后指向的节点，移动的旧前之前）
```

* 开始和结束节点 - 【旧前新前、旧后新后】
[![xx](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d784fd73ce394612a4ccd167b0313d7b~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkSZp8)
* 旧开始节点 / 新结束节点 - 【旧前新后】
[![gkSgje.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6401ba31b0e499d81de9f4ec220ea89~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkSgje)
* 旧结束节点 / 新开始节点
[![gkSbjg.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6c9f2e39e0e44a089a0a547e1197206~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkSbjg)
* 非上述四种情况
[![gkPpCt.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f741a51fef6c4a7aad4f90a163248e5a~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkPpCt)
* 循环结束
    * 当老节点的所有子节点先遍历完(oldStartIdx < oldEndIdx)，循环结束
    * 新节点的所有子节点先遍历完(newStartIdx > newEndIdx)，循环结束

[![gkFHg0.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66638f077afa413bafc8cf19e33e4300~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkFHg0)


[![gkk1r8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0b17cfb5c3b44e5a51416ae15d92955~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gkk1r8)



四种命中查找

旧前与新前
旧后与新后
旧前与新后
旧后与新前

3=> （此项发生了，那么旧前指向的节点，移动到旧后之后）
```javascript
else if (sameVnode(oldStartVnode, newEndVnode)) {
    patchVnode(oldStartVnode, newEndVnode)
    api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.ele))
}
```

4=> （此项发生了，那么旧后指向的节点，移动的旧前之前）
```javascript
else if (sameVnode(oldEndVnode, newStartVnode)) {
    patchVnode(oldEndVnode, newStartVnode)
    api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
}
```

