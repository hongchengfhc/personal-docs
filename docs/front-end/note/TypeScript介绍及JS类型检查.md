---
title: TS介绍及类型检查
---


1. `TypeScript` 大大提高代码的可靠程度
2. `JavaScript` 自有类型系统的问题

# 介绍TypeScript前先介绍一下类型检查

#### 介绍模块
1. 强类型与弱类型
2. 静态类型与动态类型
3. `JavaScript` 自有类型系统的问题
4. `Flow`静态类型检查方案
5. `TypeScript`语言规范与基本应用

## 1. 类型介绍
### 1. 强类型 vs 弱类型

1. 强类型:  语言层面限制函数的实参类型必须与形参类型相同

eg: 
```java
class Main {
    static void foo(int num) {
        System.out.println(num);
    }
    
    public static void main(String[] args) {
        Main.foo(100); // ok
        
        Main.foo("100"); // error "100" is a string
        
        Main.foo(Integer.parseInt("100 ")); // ok
    }
}
```

2. 弱类型：语言层面不会限制实参的类型
eg

```js
function foo(num) {
    console.log(num)
}
foo(100) // ok
foo('100') // ok
foo(parseInt('100')) // ok
```

> 由于这种强弱类型之分根本不是某个权威机构的定义;

> 强类型有更强的类型约束，而弱类型中几乎没有什么约束

##### 个人理解: 
1. 强类型语言中不允许什么问题的隐式类型转换
2. 弱类型语言则允许任意的数据隐式类型转换
3. 强类型不允许随意的隐式类型转换，而弱类型是允许的
4. 变量类型允许随时改变的特点，不是强毕竟类型的差异


### 2. 类型系统
> 静态类型与动态类型
1. 静态类型: 一个变量声明时它的类型就是明确的,声明过后，它的类型就不允许修改了
2. 动态类型：在运行阶段才能够明确变量类型，而且变量的类型随时可以改变
eg: 
```js
var foo = 100
foo = 'bar' // ok
console.log(foo)
```
**也可以说在动态类型语文中的变量没有类型，而变量中存放的值是有类型的**

#### 类型安全分为 `强类型` 和 `弱类型`
#### 类型检查分为 `静态类型` 和 `动态类型`
如下图
[![6fUjc4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac1925adb7414225aca91db0345d7e7f~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6fUjc4)

#### 2.1 JavaScript 类型系统特征
> `弱类型` 且 `动态类型`

<font color="red">**js的类型用一个词描述：【`任性`】**</font> 缺失了类型系统的可靠性 --> <font color="red">`不靠谱`</font>

##### ? 为什么JavaScript不是强类型 / 静态类型
```
1. 早前的 JavaScript 应用简单
2. JavaScript 没有编译环节
3. 选择为 弱类型 / 动态类型
4. 在大规模应用下，这种【优势】就变成了短板
```

#### 弱类型的问题
> 举例

```js
// 01
const obj = {}
obj.foo()
// 报错要等到运行阶段才能发现类型异常
// ======================
// 02
function sum(a, b) {
    return a + b
}
console.log(sum(100, 100)) // 200
console.log(sum(100, '100')) // 100100
// ======================
// 03
const obj = {}
obj[true] = 100 // 会自动转换成字符串

console.log(obj['true'])
```

#### 强类型的优势
1. 错误更早暴露
2. 代码更智能，编码更准确
3. 重构更牢靠
4. 减少不必要的类型判断
5. ......


## 2. Flow js的类型检查工具

#### Flow 
> JavaScript的类型的检查器

**Flow只是一个小工具，So Easy**
```js
// 类型注解
function sum (a: number, b: number) {
    return a + b
}
sum(100, 50) // ok
sum('100', 50) // error
```


#### 快速上手

```js
// 安装 yarn add flow-bin --dev

// 增加.flowconfig文件 yarn flow init
/*
.flowconfig
[ignore]
[include]
[libs]
[lints]
[options]
[strict]
*/

// 使用的时候需要在文件顶上增加 @flow，并且需要关闭掉vscode的语法校验
// @flow
function sum (a, b) {
    return a + b
}

// 终端使用命令检查 
// 执行 yarn flow
// 停止 yarn flow stop
```

#### 编译
* 写好的js文件没办法用node执
```js
// 所以安装 yarn add flow-remove-types --dev

// 执行 yarn flow-remove-types [文件目录] . -d [输出目录]

```
##### 尝试使用babel
```
// @babel/core 核心模块
// @babel/cli cli工具，可以让我们在命令行中直接使用babel命令去完成编译
// @babel/preset-flow --dev
// 安装
// yarn add @babel/core @babel/cli @babel/preset-flow --dev

// 2. 添加babel的配置文件 .babelrc
/*
// .babelrc
{
    "presets": ["@babel/preset-flow"]
}

*/
// 执行命令 yarn babel src -d dist

```

#### 开发工具插件 Flow Lanugage Support
> 让错误直接在开发工具上显示出来

* 下载插件 Flow Lanugage Support


#### 类型推断 Type Inference

```js
/**
* 类型推断
* @flow
*/
function square (n) {
    return n * n
}
square('100') // 这里用了字符串,flow会推导出 n*n是错误的
```
#### 类型注解 Type Annotations
```
// 1. 函数的参数上以及返参
funcion square(n:  number): number {
    return n * n
}
// 2. 变量
let num: number = 100;

// 3. 没有返回值标记成void
function say(): void {}
```
#### 原始类型 Primitive Types

```js
let a: string = 'foobar'

let b: number = Infinity // NaN // 100

let c: boolean = true

let d: null = null

let e: void = undefined

let f: symbol = Symbol()
```

#### 数组类型 Array Types
```js
// 泛型
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 元组
const f00: [string, number] = ['foo', 100]
```

#### 对象类型 Object Types

```js
const obj1: {foo: string, bar: number} = { foo: 'string', bar: 100 }

const obj2: {foo?: string, bar: number} = {bar: 100}  // foo可选

const obj3: {[string]: string} = {}
obj3.key1 = 'value1'
obj3.key2 = 'value2'
```

#### 函数类型 Function Types
```js

function foo(callback: (string, number) => void) {
    callback('string', 100)
}

foo(function(str, n) {
    // str => string
    // n => number
})
```
#### 特殊类型

```js

// 字面量类型
const a: 'foo' = 'foo' // a变量只能为 foo字符串

const type: 'success' | 'warning' | 'danger' = 'success'

const b: string | number = 100 // 'string'

type StringOrNumber = string | number

const c: StringOrNumber = 'string' // 100

// maybe 类型
const gender: ?number = null // undefined // number
// 上面等价于下面这个
const gender: number | null | void = undefined // null // number

```

#### Mixed & Any 任意类型
```js
// mixed 就是所有类型 ==> string | number | boolean | ....
function passMixed(value: mixed) {
    
}
passMixed('string')
passMixed(100)

// -----------------------

function passAny(value: any) {
    
}
passAny('string')
passAny(100)

// 区别是  any是弱类型  mixed是强类型
function passMixed(value: mixed) {
    value.substr(1)
    value * value
    // 这里会提示报错
    // 改成下面
    if (typeof value == 'value') {
        value.substr(1)
    }
    if (typeof value == 'number') {
        value * value
    }
}
passMixed('string')
passMixed(100)

// -----------------------

function passAny(value: any) {
    value.substr(1)
    value * value
}
passAny('string')
passAny(100)

```

### 类型小结
* 官方文档 https://flow.org/en/docs/types/
* 第三方类型手册 https://www.saltycrane.com/cheat-sheets/flow-type/latest/

#### 运行环境API -> 内置对象
```js
const element: HTMLElement | null = document.getElementById('app') // 这里必须传字符串 传数字会提示报错

// https://github.com/facebook/flow/blob/master/lib/core.js
// https://github.com/facebook/flow/blob/master/lib/dom.js
// https://github.com/facebook/flow/blob/master/lib/bom.js
// https://github.com/facebook/flow/blob/master/lib/cssom.js
// https://github.com/facebook/flow/blob/master/lib/node.js

```

## 3. TypeScript

### TypeScript JavaScript的超集 (superset)
> 任何一种JavaScript运行环境都支持
* 功能更为强大，生态也更健全、更完善
* 开源框架使用ts Angular / Vue.js3.0
* TypeScript -- 前端领域中的第二语言


[![6h2r1s.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e031654f7294489a96eb58c458182d75~tplv-k3u1fbpfcp-zoom-1.image)](https://imgtu.com/i/6h2r1s)

TypeScript属于渐进式
#### 缺点

1. 语言本身多了很多概念
2. 项目初期，TypeScript会增加一些成本

******************************
### 快速上手

```shell
yarn init --yes

yarn add typescript --dev

yarn tsc xxxx.ts

```
```
// 可以完全按照 JavaScript 标准语法编写代码
```
#### 配置文件
> yarn tsc --init 生成一个tsconfig.json

```js
compilerOptions
    target: 编译之后的ES版本
    module: 输出的代码采用什么样的方式进行模块化
    lib: 指定所引用的标准库 ["ES2015", "DOM"]
    outDir: 设置编译结果输出到的文件夹 dist
    rootDir: 配置我们源代码的文件夹 src
    sourceMap: 是否开启源代码映射
    strice: 是否开启严格模式
需要直接运行tsc命令编译整个项目
yarn tsc
```
#### 原始类型 Primitive Types
```
const a: string = 'foobar'

const b: number = 100 // NaN Infinity

const c: boolean = true // false
// 以上是在非严格模式下均可设置为 null

const e: void = undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol()
```
#### 标准库声明
> 就是内置对象所对应的声明

#### 中文错误信息
```
const error: string = 100
```

#### 作用域问题
> 两个.ts文件使用相同变量量会提示错误

* 解决就是用单独的作用域，可以使用 `export {}`

#### Object 类型 Object Types
> 不单指对象

```ts
const foo: object = {} // [] // function() {}

// 可以这样定义指定为对象 可以用接口
const obj = {foo: number } = { foo: 123 }
```

#### 数组类型 Array Types

```js
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]

// -------------------------

function sum(...args: number[]) {
    return args.reduce((prev, current) => prev + current, 0)
}
sum(1, 2, 3)

```

#### 元组类型 Tuple Types
> 明确元素数量以及每个元素类型的一个数组，类型不必要完全相同

```js
const tuple:  [number, string] = [18, 'string']

tuple[0]
tuple[1]

const [age, name] = tuple

// ------------------------

```

#### 枚举类型 Enum Types
1. 给一组数值去分别取上更好理解的名字
2. 一个枚举中只会存在几个固定的值，并不会出现超出范围的可能性

```js
enum OrderStatus {
    WaitPay = 0,
    Pay = 1,
    Cancel = 2
}

// 枚举的值可以是字符串
enum OrderStatus {
    WaitPay = 'waitPay',
    Pay = 'pay'
}
// 会被编译成以下代码
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["WaitPay"] = "waitpay";
    OrderStatus["Pay"] = "pay";
})(OrderStatus || (OrderStatus = {}));

// 如果枚举的值是数值的，可以这样取 OrderStatus[0]

// 在enum 的前面加上 const
const enum OrderStatus {
    WaitPay = 0,
    Pay
}
// 编译的时候会去掉枚举相关的信息，只留下 0 , 1 , 3
```

#### 函数类型 Function Types
> 输入输出类型限制

```js
function func1(a: number, b: number): string {
    return 'func1'
}
// 可选参数 可以设置 a?: number

// -------------------------
// 函数的表示式
const func2: (a: number, b: number) => string = function(a: number, b: number): string {
    return 'func2'
}
```

#### 任意类型 Any Types
> 不会有任何的类型检查

```js
function stringify(value: any) {
    return JSON.stringify(value)
}
```

#### 隐式类型推断 Type Inference
> 建议为每个变量添加明确的类型

```js
let age = 18 // 推断为age: number

age = 'string' // 会报错

let foo; // 推断为any
foo = 100
foo = 'string'
// 都是可以的

```

#### 类型断言 Type assertions
> 

```js
// 假定这个 nums 来自一个明确的接口
const nums = [110, 120, 119, 112]

const res = nums.find(i => i > 0) // 推导出res 为 number | undefined

// 我们需要告诉Ts,这就是一个number类型
const num1 = res as number
const num1 = <number>res  // JSX 下不能使用
```


#### 接口 Interfaces
> 一种规范，约定

```js

interface IPost {
    title: string;
    content: string
}

function printPost(post: IPost) {
    console.log(post.title)
    console.log(post.content)
}
```
* 可选成员、只读成员

```js
interface IPost {
    title: string;
    content: string;
    subtitle?: string // 可选参数  string | undefined
    readonly summary: string // 不允许修改
}

// 动态成员
interface Cache {
    [prop: string]: string
}
```

#### 类
> 用来描述一类具体对象的抽象成员
1. ES6以前， 函数 + 原型 模拟实现类
2. ES6开始 JavaScript中有了专门的class
3. TypeScript 增强了class 的相关语法

##### 1. 基本使用

```ts
class Person {

    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string) {
        console.log(`I am ${this.name} , ${msg}`)
    }
}
```
##### 2. 访问修饰符
1. private 私有属性，只能在内部用this访问
2. public public 公有成员
3. protected 受保护的  不能在外部访问

**protected在子类中使用this是可以访问到的**

##### 3. 只读属性
> 在访问修饰符后面加上 readonly

```js
// 比如
public readonly name: string;
```
##### 4. 类与接口
```
// 规定协议 

interface Eat {
    eat(food: string): void
}

interface Run {
    run(distance: number): void
}

class Person implements Eat, Run {
    eat(food: string): void {

    }
    run(distance: number): void {

    }
}

class Animal implements Eat, Run {
    eat(food: string): void {

    }
    run(distance: number): void {

    }
}
```

##### 5. 抽象类
> 抽象类使用 关键字 abstract

```js
export {} // 确保跟其它示例没有成员冲突
abstract class Animal {
    eat(food: string): void {
        console.log('呼噜呼噜的吃' + food)
    }
    // 定义抽象方法
    abstract run (distance: number): void
}

class Dog extends Animal {
    run(distance: number): void {
        console.log('四脚爬行', distance)
    }
}
const d = new Dog()
```
##### 6. 泛型 Generics
> 定义函数或接口、类的时候没有指定具体的类型，等到我们使用的时候再去指定具体类型的特征

```typescript
function createArray<T>(length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value)
    return arr
}
const res = createArray<string>(3, 'foo')

```
##### 7. 类型声明 Type Declaration
> 为了兼容普通的js模块

```typescript
import { camelCase } from 'lodash'

declare function camelCase (input: string): string
const res = camelCase('hello typed') // 在这里函数没有提示，需要声明 如上

```
**引用第三方模块，如果模块中不包含类型声明文件，就需要自己声明**

