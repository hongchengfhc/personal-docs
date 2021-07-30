---
title: ESMAScript新特性
---

# ESMAScript 新特性

## 1. ECMAScript 概述
### @Web环境
[![653Zc9.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/195cf00ad60f40e6a5949af4e5634643~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/653Zc9)

### @Node.js
[![653K76.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00315f7faf01474fb049ea4e92b2e297~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/653K76)


### ECMAScript 版本
[![6531hD.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c999f48b428740f4ba33289c9628f4ab~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6531hD)

## 2. ES2015 let 与块级作用域，以及const

### let
```js
使用var 导致变量提升
console.log(foo); // undefine;
var foo = 'zce';
// 官方的bug不叫bug，叫特性
```

```js
console.log(foo);
let foo = 'zce';
```

### const 恒量/常量
> 在let的基础上增加了只读属性，声明过后不允许再被修改
- `const` 它所声明的成员不能被修改，只是说我们不允许在声明了过后重新去指向一个新的内存地址，并不是说我们不允许修改恒量中的属性成员

```js
// 不允许以下情况
const name = 'zce';
name = 'jack';

const name;
name = 'zce';

// 下面的代码是允许的
const obj = {};
obj.name = 'zce' 

// 下面是不允许的
const obj = {};
obj = {};

```

## 3. ES2015 模板字符串

### 模板字符串字面量 Template literals

```js
const str = `hello es2015, this is a string`
console.log(str)

// 支持多行
const str = `hello es2015, 

this is a string`
console.log(str)


const name = 'tom'
const msg = `hey, ${name}  ${1 + 1}`
console.log(msg)

```


### 模板字符串标签函数 Tagged templates

```js

const str = console.log`hello world`

const name = 'tom'
const gender = true
function myTagFunc (strings, name, gender) {
    console.log(strings, name, gender)
}
const result = myTagFunc`hey, ${name} is a ${gender}.`



const name = 'tom'
const gender = true
function myTagFunc (strings, name, gender) {
    console.log(strings, name, gender)
    return strings[0] + name + strings[1] + gender + strings[2]
}
const result = myTagFunc`hey, ${name} is a ${gender}.`
console.log(result)



```


### 字符串的扩展方法
- includes()
- startsWith()
- endsWith()

```js
const message = 'Error: foo is not defind.'

console.log(
    message.startsWith('Error'),
    message.endsWith('.'),
    message.includes('foo')
)

```


## 4. ES2015 数组和对象的解构

### 数组中的解构

```js
const arr = [100, 200, 300]

const [foo, bar, baz] = arr
console.log(baz)

const [, , baz] = arr
console.log(baz)


const [foo, ...rest] = arr
console.log(rest)

const [foo] = arr
console.log(foo)

const [foo, bar, baz, more] = arr
console.log(more) // undefine


const [foo, bar, baz, more = 'default value'] = arr
console.log(more) // default value

```

### 展开数组 Spread
```js
const arr = ['foo', 'bar', 'baz']
console.log.apply(console, arr)

console.log(...arr)

```

### 对象的解构 Destructuring

```js
const obj = { name: 'zce', age: 18}

const { name, age } = obj
console.log(name)

// 以下会出现变量名冲突，但obj解构必须 使用name 所以解决方案如下
const name = 'tom'
const { name } = obj
console.log(name)

// 解决方案
const { name: objName  } = obj
console.log(objName)


```

## 5. ES2015函数的参数



### 参数默认值 Default parameters

```js
function foo(enable) {
    enable = enable == undefine ? true : enable
    console.log('foo invaked - enable:');
    console.log(enable)
}

foo(true)


// 只能是调用的时候没有传参数或者传undefine时
function foo(enable = true) {
    console.log('foo invaked - enable:');
    console.log(enable)
}
foo(false)

// 带有默认值的形参一定要在最后
function foo(name, enable = true) {
    console.log(name, enable)
}
foo('xxx')

// 不过在浏览器环境试出结果  可以如下
function foo(name = true, enable) {
    console.log(name, enable)
}
foo(undefined, 200)

```

### 剩余参数 Rest parameters

```js

console.log(1, 2, 3, 4)


funciton foo() {
    console.log(arguments)
}

// 只能出现在最后一位，只能出现一次
funciton foo(...args) {
    console.log(...args) // [1, 2, 3, 4]
}
foo(1, 2, 3, 4)



```
## 6. 箭头函数

### 箭头函数 Arrow functions
> 程序员专用字体 Fira Code

```js

function inc(number) {
    return number + 1
}
console.log(inc(100))


const inc = n => n + 1
console.log(inc(100))

// 简化了回调函数的书写

const arr = [1,2,3]
arr.filter(function(item) {
    return item % 2
})

arr.filter(i => item % 2)
```

### 箭头函数与this
```js
const person = {
    name: 'tom',
    sayHi: function() {
        console.log(this.name)
    }
}

person.sayHi(); // tom

const person = {
    name: 'tom',
    sayHi: () =>  {
        console.log(this.name)
    }
}


person.sayHi(); // undefined

const person = {
    name: 'tom',
    sayHi: function() {
        setTimeout(function() {
            console.log(this.name)
        })
    }
}
person.sayHi(); // undefined

const person = {
    name: 'tom',
    sayHi: function() {
        setTimeout(() => {
            console.log(this.name)
        })
    }
}
person.sayHi(); // tome

```
## 7. 对象 及 字面量增强


### 对象及字面量增强 Enhanced object literals

```js
const bar = '345'
const obj = {
    foo: 123,
    // bar: bar
    bar,
    
    // method: function() {
        
    // }
    method() {
        
    }
};

// 新增计算属性名
const obj = {
    [Math.random()]: 300
}
```

### 对象扩展方法

#### Objet.assign
* 将多个源对象中的属性复制到一个目标对象中
```js
const source1 = {
    a: 123,
    b: 123
}
const target = {
    a: 456,
    b: 456
}
const result = Object.assign(target, source1)
console.log(target)
console.log(target == result) // true

// 作用 可以用来复制一个对象


```

##### Object.is

```js
console.log(
 0 == false,
 0 === false,
 +0 === -0,
 NaN == NaN,
 Object.is(+0, -0),
 Object.is(NaN, NaN)

)
```

## 8. ES2015 Proxy


### Proxy 代理对象

> Vue2.0 Object.defineProperty()

```js
const person = {
    name: 'zce',
    age: 20
}

const personProxy = new Proxy(person, {
    get (target, property) {
        console.log(target, property)
        return target[property]
    },
    set (target, property, value) {
        target[property] = value
    },
})

console.log(personProxy.name)
```

### Proxy 对比 defineProperty
- defineProperty 只能监视属性的读写
- Proxy 能够监视到更多对象操作

```js
const person = {
    name: 'zce',
    age: 20
}

const perxonProxy = new Proxy(person, {
    deleteProperty (target, property) {
        delete target[property]
    }
})
```

handler方法 | 触发方式
---|---
get | 读取某个属性
set | 写入某个属性
has | in 操作符
deleteProperty | delete 操作符
getPrototypeOf | Object.getPrototypeOf()
setPrototypeOf | Object.setPrototypeOf()
isExtensible | Object.isExtensible()
preventExtensions | Object.perventExtensions()
getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()
defineProperty | Object.defineProperty()
ownKeys | Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()
apply | 调用一个函数
construct | 用 new 调用一个函数

* Proxy 更好的支持数组对象的监视
> defineProperty对数组的操作是 重写数组的操作方法

```js
const list = []
const listProxy = new Proxy(list, {
    set (target, property, value) {
        console.log(target, property, value)
        target[property] = value;
        return true;
    }
})
```
* Proxy是以非侵入的方式监管了对象的读写



## 9. Reflect、Promise、Class


### Reflect 统一的对象操作API
> 属于一个静态类

~~new Reflect()~~

- `Reflect` 内部封闭了一系列对对象的底层操作
- `Reflect` 成员方法就是 `Proxy` 处理对象的默认实现


```js
    const obj = {
        foo: '123'
    }
    // 当第二个处理对象没传时，底层默认使用Reflect上的方法
    const proxy = new Proxy(obj, {
        get (target, property) {
            return Reflect.get(target, property)
        }
    })
```
#### 推出`Reflect`的意义
- 统一提供一套用于操作对象的API

```js
const obj = {
    name: 'zce',
    age: 18
}
// console.log('name' in obj)
// delete obj['age']
// Object.keys(obj)

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
```

### Promise
> 解决了传统异步编程中回调函数嵌套过深的问题

在JavaScript异步编程课程中详情分析了

### class 类

```js
function Person(name) {
    this.name = name;
}
Person.prototype.say = function() {
    console.log(`he, my name is ${this.name}`)
}

// class
class Person {
    constructor(name) {
        this.name = name;
    }
    
    say () {
        console.log(`hi, my name is ${this.name}`)
    }
}
const p = new Person('tom')
p.say()

```

### 实例方法 vs 静态方法
> ES2015中新增添加静态成员的 static 关键词


```js

class Person {
    constructor(name) {
        this.name = name;
    }
    
    say () {
        console.log(`hi, my name is ${this.name}`)
    }
    static create(name) {
        return new Person(name)
    }
}

const tom = Person.create('tom')
tom.say()
```

### 类的继承 extends
```js
class Person {
    constructor(name) {
        this.name = name;
    }
    
    say () {
        console.log(`hi, my name is ${this.name}`)
    }
    static create(name) {
        return new Person(name)
    }
}

class Student {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    hello() {
        super.say()
        console.log(`my school number is ${this.number}`)
    }
}
const s = new Student()
s.hello()
```



## 10. Set Map Symbol

### Set 数据结构 （集合）

```js

const s = new Set()
s.add(1).add(2).add(2).add(3)

console.log(s)
s.forEacm(i => console.log(i))

for (let i of s) {
    console.log(i)
}

console.log(s.size)

console.log(s.has(100))

console.log(s.delete(3))

s.clear()

// 可以去重数组
const arr = [1,2,1,3,4,1]
const result = new Set(arr)
console.log(result)

// 如果想再得到一个数组
const result = Array.from(new Set(arr))
const result = [...new Set(arr)]


```

### Map 数组结构 
> 健值对类型，可以用任意类型的数据作为健

```js

// obj key只能是字符串 或 Symbol
const obj = {}
obj[true] = 'value'
obj[123] = 'value'
obj[{a: 1}] = 'value'
console.log(Object.keys(obj))

const m = new Map()
const tom = {name: 'tom'}
m.set(tom, 90)
console.log(m)
console.log(m.get(tom))

m.has()
m.delete()
m.clear()

m.forEach((value, key) => {
    console.log(value, key)
})


```

### Symbol
> 表示一个独一无二的值
* 目前主要的作用就是为对象添加独一无二的属性名

```js
const cache = {}

// a.js ======
cache['foo'] = Math.random()

// b.js ======
cache['foo'] = '123'

console.log(cache)

// 表示一个独一无二的值
const s = Symbol()
console.log(Symbol() == Symbol())
console.log(Symbol('foo'))

// 对象中的key允许使用Symbol 所以有两种数据结构

const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = '456'

// a.js ===========
const name = Symbol()
const person = {
    [name]: 'zce',
    say() {
        console.log(this[name])
    }
}
person.say()
```

*****
* 截止到ES2019，一共定义了7种数据 类型，未来会增加一个BigInt类型，目前还处在stage-4阶段，标准化就是8种数据类型


#### Symbol 补充

```
// 唯一性
console.log(
    Symbol('foo') == Symbol('foo')
)
// false

const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
s1 == s2 // true

// 不是字符串会转成字符串
console.log(
    Symbol.for(true) == Symbol.for('true')
)
// true

console.log(Symbol.iterator)
console.log(Symbol.hasInstance)

const obj = {}
console.log(obj.toString())

// 自定义
const obj = {
    [Symbol.toStringTag]: 'XObject'
}

const obj = {
    [Symbol()]: 'symbol value',
    foo: 'normal value'
}
for (var key in obj) {
    console.log(key) // foo
}
console.log(Object.keys(obj)) // ['foo']
console.log(JSON.stringify(obj)) // {foo: 'normal value'}

// 可以获取对象当中Symbol类型的key 名
console.log(Object.getOwnPropertySymbols(obj))


```

# 11. for…of 循环、迭代器、生成器、ES Modules

### for...of 循环
> 以后会作为遍历所有数据结构的统一方式

```js
const arr = [100, 200, 300, 400]

for (const item of arr) {
    console.log(item) // 拿到的是每个元素
}

// for of 可以使用关键词 break 终止循环
// arr.forEach 无法终止遍历的


const s = new Set(['foo', 'bar'])
for (const item of s) {
    console.log(item)
}

const m = new Map()
m.set('foo',l '123')
m.set('bar', '345')
// 可以改为这样
// for (const item of m) {
for (const [key, value] of m) {
    console.log(item) // ['foo', '123'] ['bar', '345'] 
}


```

#### 可迭代接口
> ES中能够表示有结构的数据类型越来越多
> 实现Iterable接口就是 for...of的前提

* 给obj实现迭代接口 Iterable (yi te rui bo er)

```js
// 
// Symbol.iterator (yi te rui te er)
/*
const obj = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return {
                    value: 'zce',
                    done: true
                }
            }
        }
    }
}
*/
/*
{
    value: 'zce',
    done: true
}
迭代结果接口 IterationResuklt
*/
const obj = {
    store: ['foo', 'bar', 'baz'],
    [Symbol.iterator]: function() {
        let index = 0
        const self = this
        return {
            next: function() {
                const result = {
                    value: self.store[index],
                    done: index >= self.store
                }
                index++
                return result
            }
        }
    }
}
for (const item of obj) {
    console.log('循环体')
}

```
#### 迭代器模式


```js
// 迭代器设计模式

// 场景： 你我协同开发一个任务清单应用

// 我的代码 =================
/*
const todos = {
    left: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语']
}

// 你的代码 =================
for (const item of todos.life) {
    console.log(item)
}
for (const item of todos.learn) {
    console.log(item)
}
*/
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    [Symbol.iterator]: function() {
        const all = [...this.life, ...this.learn]
        let index = 0
        return {
            next: function() {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
                
            }
        }
    }
}

// 你的代码 =================
for (const item of todos) {
    console.log(item)
}
```


### 生成器 Generator (jie le rui te er)

```js

function * foo() {
    console.log('zce')
    return 100
}
const result = foo()
console.log(result.next()) 
// zce 
// { value: 100, done: true }



function *foo() {
    console.log('111')
    yield 100
    
    console.log('222')
    yield 200
}
const generator = foo()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

```

##### 生成器应用场景

```js
// 案例1： 发号器
function * createIdMaker() {
    let id = 1
    while(true) {
        yield id++
    }
}

const idMaker = createIdMaker()

console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)


// 案例2： 使用 Generator 函数实现 iterator 方法
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    [Symbol.iterator]: function() {
        const all = [...this.life, ...this.learn]
        for (const item of all) {
            yield item
        }
        // let index = 0
        // return {
        //     next: function() {
        //         return {
        //            value: all[index],
        //            done: index++ >= all.length
        //        }
                
        //    }
        //}
    }
}

```


### ES Modules
> 语言层面的模块化标准

### ESMAScript 2016
> 小版本更新
* 新增`Array.prototype.includes`

```js
const arr = ['foo', 1, NaN, false];
// 以前的有个问题就是不能查找到NaN
console.log(arr.indexOf(NaN))
console.log(arr.includes('foo'))
console.log(arr.includes(NaN))
```

* 指数运算符

```javascript
// 以前的
console.log(Math.pow(2, 10))

// new
console.log(2 ** 10)
```

### ESMAScript 2017
> 小版本

* Object.values
* Object.entries
* Object.getOwnPropertyDescriptors
* String.prototype.padStart / String.prototype.padEnd
* 在函数参数中添加尾逗号
* Async / Await

```js
const obj = {
    foo: 'value1',
    bar: 'value2'
}
// Object.values
console.log(Object.values(obj))

// Object.entries
console.log(Object.entries(obj))
for (const [key, value] of Object.entries(obj)) {
    console.log(key, value) // foo value1 | bar value2
}
// 将对象转成Map
new Map(Object.entries(obj))

// Object.getOwnPropertyDescriptors
// 获取对象当中属性的完整信息
const p1 = {
    firstName: 'Lei',
    lastName: 'wang',
    get fullName() {
        return this.firstName + ' ' + this.lastName
    }
}

const p2 = Object.assign({}, p1)
p2.firstName = 'zce'
console.log(p2.fullName)
console.log(p2) // { firstName: 'zce', lastName: 'Wang', fullMame: 'Lei Wang' }
const descriptors = Object.getOwnPropertyDescriptors(p1)
const p2 = Object.defineProperties({}, descriptors)
p2.firstName = 'zce'
console.log(p2.fullName) // zce wang

// String.prototype.padStart / String.prototype.padEnd

const books = {
    html: 5,
    css: 16,
    javascript: 128
}
for (const [name, count] of Object.entries(books)) {
    console.log(`${name.padEnd(16, '-')} | ${count.toString().padStart(3, '0')}`)
}
/*
html------------ | 005
css------------- | 016
javascript------ | 128
*/

// 在函数参数中添加尾逗号
const arr = [
    100,
    200,
    300,
]


```

#### Async / Await
> 使用Promise的语法糖

