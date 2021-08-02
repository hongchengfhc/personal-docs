---
title: pm2启动Scripts命令
---

# pm2启动Scripts命令

## 使用方式

```json
"scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env EXPRESS_NODE_ENV=dev EXPRESS_PORT=3000 nodemon ./bin/www --exec babel-node",
    "sit": "cross-env EXPRESS_NODE_ENV=sit nodemon ./bin/www --exec babel-node",
  }
```

### 简单用法
1. npm run dev
2. pm2 start npm -- run dev

以上使用是等效的
```shell
#启动 npm run sit
pm2 start npm --watch --name nickname -- run sit

#eg: pm2 start npm --watch --name h5toolsit -- run sit
#其中 --watch监听代码变化，--name 重命令任务名称，-- run后面跟脚本名字

```


### 为什么需要使用PM2
- 因为node.js 是单进程，进程被杀死后整个服务就跪了，所以需要进程管理工具，但是pm2 远远不止这些。

- 介绍
PM2 是一个带有负载均衡功能的 Node 应用的进程管理器。 当你要把你的独立代码利用全部的服务器上的所有 CPU，并保证进程永远都活着，0 秒的重载， PM2 是完美的。

### 特性
1. 内建负载均衡（使用Node cluster 集群模块）
2. 后台运行
3. 0秒停机重载(维护升级的时候不需要停机).
4. 具有Ubuntu和CentOS 的启动脚本
5. 停止不稳定的进程（避免无限循环）
6. 控制台检测
7. 提供 HTTP API
8. 远程控制和实时的接口API ( Nodejs 9.模块,允许和PM2进程管理器交互 )


### 全局安装

```shell
npm install -g pm2
```

### 查看详细状态信息

```shell
pm2 show (appname | id)
```

![状态图片](https://s2.ax1x.com/2019/10/25/Kw96AI.png)

--------
### 查看所有启动的进程列表

```shell
pm2 list |  pm2 ls
```

![列表图片](https://s2.ax1x.com/2019/10/25/KwCAgO.png)

--------
### 监控每个node进程的cpu的内存使用情况

```shell
pm2 monit
```

![monit图片](https://s2.ax1x.com/2019/10/25/KwCuVA.png)

--------
### 显示所有进程的日志信息

```shell
pm2 logs
```

![日志图片](https://s2.ax1x.com/2019/10/25/KwC328.png)

--------

### 常用命令

```shell
npm install pm2 -g     # 命令行安装 pm2 
pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                              # 也可以把'max' 参数传递给 start
                              # 正确的进程数目依赖于Cpu的核心数目
pm2 start app.js --name my-api # 命名进程
pm2 list               # 显示所有进程状态
pm2 monit              # 监视所有进程
pm2 logs               #  显示所有进程日志
pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程
pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0             # 停止指定的进程
pm2 restart 0          # 重启指定的进程
pm2 startup            # 产生 init 脚本 保持进程活着
pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
pm2 delete 0           # 杀死指定的进程
pm2 delete all         # 杀死全部进程
```


[更多用法]([https://juejin.im/post/5be406705188256dbb5176f9](https://juejin.im/post/5be406705188256dbb5176f9)
)