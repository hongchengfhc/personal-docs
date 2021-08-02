---
title: VueRouter原理实现
---

# VueRouter原理实现


```javascript
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

问题：创建 Vue 实例时传入的 router 的作用是什么？
* 会给 `vue` 实例注入两个属性
    * `$route` 路由规则 
    * `$router` 路由对象


## 01 动态路由
```javascript
{
    path: '/detail/:id',
    name: 'Detail',
    // 开启 props，会把 URL 中的参数传递给组件
    // 在组件中通过 props 来接收 URL 参数
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
}
```
* 在组件中获取这个 **id** 的方式
```javascript
// 方式1 通过当前路由规则，获取数据
$route.params.id

// 方式2 路由规则中开启 props 传参
export default {
    props: ['id']
}
```

## 02 嵌套路由
[![嵌套路由](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdc22d11c3ef4c1eb6abf02ddc7dede7~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/cLEsfA)

```javascript
// 嵌套路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'index',
        path: '',
        component: Index
      },
      {
        name: 'detail',
        path: 'detail/:id',
        props: true,
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
```

## 03 编程式导航
https://router.vuejs.org/zh/guide/essentials/navigation.html

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

--------


## `Hash` 和 `History` 模式的区别
https://router.vuejs.org/zh/guide/essentials/history-mode.html

### 1. 表现形式的区别
* `Hash` 模式 - 带 `#` 号
    * `https://music.163.com/#/playlist?id=3102961863`
* `History` 模式 - 需要服务端配合使用
    * `https://music.163.com/playlist/3102961863`


### 2. 原理区别
* `Hash` 模式是基于锚点，以及 `onhashchange` 事件
* `History` 模式是基于 `HTML5` 中的 `History API`
    * history.pushState() - IE10 以后才支持
    * history.replaceState()

**pushState方法和push方法的区别是 当我们调用push方法的时候，路径发生变化 ，这个时候会向服务器发送请求；而调用pushState不会发送请求，只会改变浏览器地址栏中的地址，并且把这个地址记录到历史记录里面来**


### 3. `History` 模式的使用
```javascript
const router = new VueRouter({
    mode: 'history',
    routes: []
})
```

* `History` 需要服务器的支持
* 因为在单页应用中，服务端不存在 `http://www.testurl.com/login` 这样的地址会返回找不到该页面
* 所以在服务端应该除了静态资源外都返回单页面应用的 `index.html`
 
**`History` 模式的 `Node.js` 服务器配置**

```javascript
const path = require('path')
// 导入处理 history 模式的模块
const history = require('connect-history-api-fallback')
// 导入 express
const express = require('express')

const app = express()
// 注册处理 history 模式的中间件
app.use(history())
// 处理静态资源的中间件，网站根目录 ../web
app.use(express.static(path.join(__dirname, '../web')))

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log('服务器开启，端口：3000')
})
```

**`History` 模式的 `nginx` 服务器配置**

* `nginx` 服务器的配置 (windows)
    * 从官网下载 `nginx` 的压缩包
    * 把压缩包解压到 c 盘根目录, c:\nginx-1.18.0 文件夹
    * 打开命令行，切换到目录 c:\nginx-1.18.0

```shell
# 启动
start nginx
# 重启
nginx -s reload
# 停止
nginx -s stop

# 处理 history 模式
location / {
  try_files $uri $uri/ /index.html;
}
# try_files 意思是 试着去访问一下这个文件
# $uri 当前请求的路径


```

## Vue Router 实现原理

###  Vue 前置知识
* 插件
* 混入
* Vue.observable()
* 插槽
* render 函数
* 运行时和完整版的 Vue

### 1. `Hash` 模式
* `URL` 中 `#` 后面的内容作为路径地址
* 监听 `hashchange` 事件
* 根据当前路由地址找到对应组件重新渲染

### 2. `History` 模式
* 通过 `history.pushState()` 方法改变地址栏
* 监听 `popstate` 事件
    * 当调用 `pushstate` 和 `replacestate` 不会触发该事件
    * 前进和后退才会触发
* 根据当前路由地址找到对应组件重新渲染

### 3. 模拟实现
[![回顾router使用代码](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07b903e09a6844e88e16f8a86bb0f4f0~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/cLsdun)


[![类图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3b4f28d0635467c9ac08ee950a2fad1~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/cLyQxJ)
### 实现 router-link
### Vue 的构建版本
* 运行时版：不支持 template 模板，需要打包的时候提前编译
* 完整版：包含运行时和编译器，体积比运行时版大 10KB 左右 ，程序运行的时候把模板转换成 render 函数
> vue-cli 创建的默认是运行时版

**[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.**

<font color="red">如何解决这个问题?</font>
* 使用完整版的 `Vue`
    * https://cli.vuejs.org/zh/config/#runtimecompiler
```javascript
// vue.config.js
module.exports = {
    runtimeCompiler: true
}
```
* 使用 `render`

```javascript
initComponents (Vue) {
    // 创建 router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          }
        }, [this.$slots.default])
      }
    })
  }
```


#### 实现 router-view

```javascript
initComponents (Vue) {
    // 创建 router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routerMap[self.data.current]
        return h(component)
      }
    })
  }
```

#### 实现 initEvent

```javascript
initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
```


## 完整代码如下

```javascript
let _Vue = null
class VueRouter {
  static install (Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2. 把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    // 创建 router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routerMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}

export default VueRouter

```