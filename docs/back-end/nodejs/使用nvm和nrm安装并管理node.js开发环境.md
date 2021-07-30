---
title: 使用nvm和nrm安装并管理node.js开发环境
---
在进行前端开发的时候，会安装多个版本的node.js，另外还会用到第三方源的管理工具npm,所以这里推荐两个工具来分别管理它们:  [nvm]([https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
) 和 [nrm]([https://github.com/Pana/nrm](https://github.com/Pana/nrm)
)

## 卸载已安装到全局的 node/npm
如果之前是在官网下载的 node 安装包，运行后会自动安装在全局目录，其中

node 命令在 /usr/local/bin/node ，npm 命令在全局 node_modules 目录中，具体路径为 /usr/local/lib/node_modules/npm

安装 nvm 之后最好先删除下已安装的 node 和全局 node 模块：

```shell
npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装

sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录
sudo rm /usr/local/bin/node #删除 node
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链
```

## 安装 nvm
### Mac 或 Linux 系统
可以使用下面的脚本安装: 
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
执行完成之后需要关闭当前的命令行，然后重新打开。如果出现`Unknown option: -c`错误，需要先[升级git到1.7.10以上版本](https://stackoverflow.com/a/27674776/1805493)。如果出现 `nvm: command not found` 错误的话，可以首先执行 `touch ~/.bash_profile` 命令创建bash_profile文件，然后执行 `source ~/.bash_profile`命令或关闭terminal窗口并重新打开一下即可。
Mac下推荐使用 [oh-my-zsh]([https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
) 代替默认的base shell

## 安装切换各版本 node/npm
```shell
nvm install stable #安装最新稳定版 node，现在是 5.0.0
nvm install 4.2.2 #安装 4.2.2 版本
nvm install 0.12.7 #安装 0.12.7 版本

# 特别说明：以下模块安装仅供演示说明，并非必须安装模块
nvm use 0 #切换至 0.12.7 版本
npm install -g mz-fis #安装 mz-fis 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v0.12.7/lib/mz-fis
nvm use 4 #切换至 4.2.2 版本
npm install -g react-native-cli #安装 react-native-cli 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v4.2.2/lib/react-native-cli

nvm alias default 0.12.7 #设置默认 node 版本为 0.12.7
```
## 使用.nvmrc 文件配置项目所使用的 node 版本
如果你的默认 node 版本（通过 nvm alias 命令设置的）与项目所需的版本不同，则可在项目根目录或其任意父级目录中创建 .nvmrc 文件，在文件中指定使用的 node 版本号，例如：
```shell
cd <项目根目录>  #进入项目根目录
echo 4 > .nvmrc #添加 .nvmrc 文件
nvm use #无需指定版本号，会自动使用 .nvmrc 文件中配置的版本
node -v #查看 node 是否切换为对应版本
```

## 使用 [nrm](https://github.com/Pana/nrm) 管理不同的npm源
众所周知的原因，国内使用原始的npm源速度非常慢，但使用别名也会出现很多不方便的地方，nrm由此产生，可以随意切换不同的npm源。

安装非常方便，使用 npm install nrm -g 进行安装，安装成功之后可以使用 nrm ls 查看源列表：
![nrmls-icon.png](https://z3.ax1x.com/2021/07/30/WXaHVH.png)

然后通过 nrm use cnpm 将npm源切换为cnpm，再使用 nrm ls 命令查看，可以发现源已经切换为 cnpm了：
![usecnpm-icon.png](https://z3.ax1x.com/2021/07/30/WXabad.png)
这样设置之后，以后使用npm命令进行安装或更新的时候，默认就使用cnpm源了，非常方便。
