---
title: JS性能检测及优化
---

# 1. Performance工具


## 1. 为什么使用Performance
* GC的目的是为了实现内存空间的良性循环
* 良性循环的基石是合理使用
* 时刻关注才能确定是否合理
* Performance提供多种监控的方式


## 通过Performance时刻监控内存

### Performance使用步骤
* 打开浏览器输入目标网址
* 进入开发人员工具面板，选择性能
* 开启录制功能，访问具体界面
* 执行用户行为，一段时间后停止录制
* 分析界面中记录的内存信息

----------------------

## 2. 内存问题的体现

### 内存问题的外在表现
* 页面出现延迟加载或经常性暂停
* 页面持续性出现糟糕的性能
* 页面的性能随时间延长越来越差

----------------------

## 3. 监控内存的几种方式

### 界定内存问题的标准
* 内存泄露：内存使用持续升高
* 内存膨胀：在多数设备上都存在性能问题
* 频繁垃圾回收：通过内存变化图进行分析


### 监控内存的几种方式
1. 浏览器任务管理器
2. Timeline时序图记录
3. 堆快照查找分离DOM
    * 什么是分离DOM
        * 界面元素存活在DOM树上
        * 垃圾对象时的DOM节点
        * 分离状态的DOM节点
4. 判断是否存在频繁的垃圾回收
    * 为什么要确定频繁垃圾回收
        * GC工作时应用程序是静止的
        * 频繁且过长的GC会导致应用假死
        * 用户使用中感知应用卡顿
    * 如何确定频繁的垃圾回收
        * Timeline中频繁的上升下降
        * 任务管理器中数据频繁的增加减小

-----------------------

## 4. Performance总结
* Performance使用流程
* 内存问题的相关分析
* Performance时序图监控内存变化
* 任务管理器监控内存变化
* 堆快照查找分离DOM



# 2. 优化


## 1. 代码优化

### 如何精准测试 JavaScript性能
* 本质上就是采集大量的执行样本进行数学统计和分析
* 使用基于Benchmark.js的 https://jsperf.com/ 完成


### Jsperf使用流程
* 使用GitHub账号登录
* 填写个人信息（非必须）
* 填写详细的测试用例信息（title、slug）
* 填写准备代码（DOM操作时经常使用
* 填写必要有setup与teardown代码
* 填写测试代码片段

## 2. 全局变量
### 2.1 慎用全局变量
#### 为什么要慎用
* 全局变量定义在全局执行上下文，是所有作用域链的顶端
* 全局执行上下文一直存在于上下文执行栈，直到程序退出
* 如果某个局部作用域出现了同名变量则会遮蔽或污染全局

```js
// 1. 片段1
var i, str = ''
for (i = 0; i < 100000; i++) {
    str += i
}

// 2. 片段2 效率更好
for (let i = 0; i < 1000; i++) {
    let str = ''
    str += i
}
```
[![6oUbSP.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0c3b338d9374197a13a71344c3b226f~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6oUbSP)

### 2.2 缓存全局变量
将使用中无法避免的全局变量缓存到局部

```HTML
<input type="button" value="btn" id="btn1">
<input type="button" value="btn" id="btn2">
<input type="button" value="btn" id="btn3">
<input type="button" value="btn" id="btn4">
<p>111</p>
<input type="button" value="btn" id="btn5">
<input type="button" value="btn" id="btn6">
<p>222</p>
<input type="button" value="btn" id="btn7">
<input type="button" value="btn" id="btn8">
<p>333</p>
<input type="button" value="btn" id="btn9">
<input type="button" value="btn" id="btn10">
```
```js
function getBtn() {
    let oBtn1 = document.getElementById('btn1')
    let oBtn3 = document.getElementById('btn3')
    let oBtn5 = document.getElementById('btn5')
    let oBtn7 = document.getElementById('btn7')
    let oBtn9 = document.getElementById('btn9')
}

function getBtn2() {
    let obj = document
    let oBtn1 = obj.getElementById('btn1')
    let oBtn3 = obj.getElementById('btn3')
    let oBtn5 = obj.getElementById('btn5')
    let oBtn7 = obj.getElementById('btn7')
    let oBtn9 = obj.getElementById('btn9')
}
```
[![6oUWLD.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62083ddc59a84fc9abb492f8073fdcd2~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6oUWLD)

## 3. 通过原型新增方法
> 在原型对象上新增实例对象需要的方法

```js
var fn1 = function() {
    this.foo = function() {
        console.log(11111)
    }
}
let f1 = new fn1()

var fn2 = function() {}
fn2.prototype.foo = function() {
    console.log(11111)
}
let f2 = new fn2()
```
[![6odsv6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c35413e5af448aab3141557772da2d7~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6odsv6)

## 4. 避开闭包陷阱
#### 闭包特点
* 外部具有指向内部的引用
* 在“外”部作用域访问“内”部作用域的数据
```js
function foo() {
    var name = 'lg'
    function fn() {
        console.log(name)
    }
    return fn
}
var a = foo()
a()
```
#### 关于闭包
* 闭包是一种强大的语法
* 闭包使用不当很容易出现内存泄露
* 不要为了闭包而闭包

```js
function foo() {
    var el = document.getElementById('btn')
    el.onclick = function () {
        console.log(el.id)
    }
    
    el = null // 在这里加上，可以避免内存泄露，但这样在运行过程中会报错
}
foo()
// 以上就出现了闭包陷阱
```

## 5. 避免属性访问方法使用
### 5.1 JavaScript中的面向对象
* JS不需属性的访问方法，所有属性都是外部可见的
* 使用属性访问方法只会增加一层重定义，没有访问的控制力

```js
function Person() {
    this.name = 'icoder'
    this.age = 18
    this.getAge = function() {
        return this.age
    }
}
const p1 = new Person()
const a = p1.getAge()

function Person() {
    this.name = 'icoder'
    this.age = 18
}
const p2 = new Person()
const b = p2.age

```
[![6TcuT0.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ddc8be5873448d7a4dbcdc46220401c~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6TcuT0)

### 5.2 For循环优化
[![6Tcq7q.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9816c7efd12c4b9790acf476cf8fd46c~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6Tcq7q)
#### 5.2.1 采用最优循环方式

```js
var arrList = new Array(1, 2, 3, 4, 5)

// 最快
arrList.forEach(function(item) {
    console.log(item)
})

// 其次
for (var i = arrList.length; i; i--){
    console.log(arrList[i])
}

// 最慢
for (var i in arrList) {
    console.log(arrList[i])
}
```

### 6. 文档碎片优化节点添加

#### 6.1 节点添加优化
> 节点的添加操作必然会有回流和重绘
* 回流：规模尺寸，布局，隐藏等改变
* 重绘：只影响元素外观
https://www.jianshu.com/p/e081f9aa03fb


[![6T2bF0.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d10a0b70ff2a4bdb82bf7f600cd62219~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6T2bF0)

#### 6.2 克隆优化节点操作

```html
<p id="box1">old</p>
```
```js
// 执行结果 29387
function (var i = 0; i < 3; i++) {
    var op = document.createElement('p')
    op.innerHTML = i
    document.body.appendChild(op)
}

// 执行结果  31740
var oldP = document.getElementById('box1')
function (var i = 0; i < 3; i++) {
    var op = oldP.cloneNode(false)
    op.innerHTML = i
    document.body.appendChild(op)
}


```
#### 6.3 直接量替换`Object`操作

```js
// 执行结果 703,598,776
var a = [1, 2, 3]

// 执行结果 714,136,415
var arr = new Array(3)
arr[0] = 1
arr[1] = 2
arr[2] = 3

```

### `代码优化总结：`
1. 慎用全局变量
2. 缓存全局变量
3. 通过原型新增方法
4. 避开装饰陷阱
5. 避免属性访问方法使用
6. `for`循环优化
7. 文档碎片优化节点添加


