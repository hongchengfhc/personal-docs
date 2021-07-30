---
title: Vue响应式原理
tags:
  - Vue
---

## 数据驱动 
* 数据响应式
    * 数据模型仅仅是普通的JavaScript对象，而当我们修改数据时，视图会进行更新，避免了繁琐的DOM操作，提高开发效率
* 双向绑定
    * 数据改变，视图改变；视图改变，数据也随之改变
    * 我们可以使用 `v-model` 在表单元素上创建双向数据绑定
* 数据驱动是Vue最独特的特性之一
    * 开发过程中公需要关注数据本身，不需要关心数据是如何渲染到视图


### 数据响应式原理Vue2
https://cn.vuejs.org/v2/guide/reactivity.html

### 数据响应式原理Vue3
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
* 从零实现Vue3.0响应式源码 https://www.bilibili.com/video/BV1AQ4y1K7r2

-------------------
**观察者模式 和 订阅发布者模式**

[![czp6jx.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c81e7151e8140f4afb82ced769d1e0c~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/czp6jx)
### 发布订阅模式 - publish-subscribe pattern
> 订阅者、发布者、信号中心

```javascript
// 简单实现
// 事件触发器
    class EventEmitter {
      constructor () {
        // { 'click': [fn1, fn2], 'change': [fn] }
        this.subs = Object.create(null)
      }

      // 注册事件
      $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
      }

      // 触发事件
      $emit (eventType) {
        if (this.subs[eventType]) {
          this.subs[eventType].forEach(handler => {
            handler()
          })
        }
      }
    }

    // 测试
    let em = new EventEmitter()
    em.$on('click', () => {
      console.log('click1')
    })
    em.$on('click', () => {
      console.log('click2')
    })

    em.$emit('click')
```

### 观察者模式
* 观察者（订阅者） - Watcher
    * update(): 当事件发生时，具体要做的事情
* 目标（发布者） - Dep
    * subs数组：存储所有的观察者
    * addSub(): 添加观察者
    * notify(): 当事件发生，调用所有观察者的 update() 方法
* 没有事件中心

```javascript
// 发布者-目标
    class Dep {
      constructor () {
        // 记录所有的订阅者
        this.subs = []
      }
      // 添加订阅者
      addSub (sub) {
        if (sub && sub.update) {
          this.subs.push(sub)
        }
      }
      // 发布通知
      notify () {
        this.subs.forEach(sub => {
          sub.update()
        })
      }
    }
    // 订阅者-观察者
    class Watcher {
      update () {
        console.log('update')
      }
    }

    // 测试
    let dep = new Dep()
    let watcher = new Watcher()

    dep.addSub(watcher)

    dep.notify()
```

---------
## 解析

[![cz9V54.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/673a90c876184f2bb0a6846d7b9bda72~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/cz9V54)

#### vue.js
    * 功能
        * 负责接收初始化的参数（选项）
        * 负责把 `data` 中的属性注入到 `Vue` 实例，转换成 `getter/setter`
        * 负责调用 `observer` 监听 `data` 中所有属性的变化 
        * 负责调用 `compiler` 解析指/差值表达式
    * 结构
        * 属性
            * $options
            * $el
            * $data
        * 方法
            * _proxyData()
### observer.js
    * 功能
        * 负责把 `data` 选项中的属性转换成响应式数据
        * `data` 中的某个属性也是对象，把该属性转换成响应式数据
        * 数据变化发送通知
    * 结构
        * 属性
            * 无
        * 方法
            * walk(data)
            * defineReactive(data, key, value)
```javascript


class Observer {
    
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        // 1. 判断data是否是对象
        if (!data || typeof data != 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(obj, key, val) {
        let that = this
        // 如果val是对象，把val内部的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                return val
            },
            set (newValue) {
                if (newValue == val) {
                    return
                }
                val = newValue
                that.walk(newValue)
                // 发送通知
            }
        })
    }
}
```

### compiler.js
* 功能
    * 负责编译模板，解析指令/差值表达 式
    * 负责页面的首次渲染
    * 当数据变化后重新渲染视图
* 结构
    * 属性
        * el
        * vm
    * 方法
        * compile(el)
        * compileElement(node)
        * compileText(node)
        * isDirective(attrName)
        * isTextNode(node)
        * isElementNode(node)

```javascript
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // 将 v-text --> text
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })

  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn(node, this.vm[key])
  }

  // 处理 v-text 指令
  textUpdater(node, value) {
    node.textContent = value
  }
  // 处理 v-model
  modelUpdater(node, value) {
    node.value = value
  } 

  // 编译文本节点，处理差值表达式
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType == 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType == 1
  }
}
```

### dep.js
[![gS30zR.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f5304b696fe4f9496f39d065593bdcb~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gS30zR)

```javascript
class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }

  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发送通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}


// observer.js
defineReactive(obj, key, val) {
    let that = this
    // 负责收集依赖，并发送通知
    let dep = new Dep()
    // ...
    Object.defineProperty(obj, key, {
      get() {
        // ...
        // 收集依赖
        Dep.target && Dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        // ...
        // 发送通知
        dep.notify()
      }
    })
  }
```


### watcher.js
[![gS8Hj1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91001d37e28e481587a2ddfe714bca95~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gS8Hj1)

```javascript

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // key 是data中的属性名称
    this.key = key;
    // 回调函数负责更新视图
    this.cb = cb

    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会调用addSub

    this.oldValue = vm[key]
    Dep.target = null
  }

  // 当数据发生变化 的时候更新视图
  update () {
    let newValue = this.vm[this.key]
    if (this.oldValue == newValue) {
      return
    }
    this.cb(newValue)
  }
}
```

#### watcher的收集需要在 compiler 当中
* `compileText`
```javascript
// 编译文本节点，处理差值表达式
compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建 watcher
      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal
      })
    }
  }
```
* `textUpdater` 和 `modelUpdater`
```javascript
// 处理 v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // 处理 v-model
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
  } 
```


### 双向绑定
```javascript
// 处理 v-model
  modelUpdater(node, value, key) {
    node.value = value
    // ...
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  } 
```

## 总结
[![gST2WT.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fb2a028c9f54d3d899e7d5c85eb5a63~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/gST2WT)