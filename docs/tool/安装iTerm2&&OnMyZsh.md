---
title: 安装 iTerm2 && On My Zsh
---

# 安装 iTerm2 && Oh My Zsh

## 下载iTerm2 
https://iterm2.com/
## 下载  oh-my-zsh
```shell
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```
## 安装Powerline
如果你的终端能够正常执行pip指令，那么直接执行下面的指令可以完成安装

```shell
pip install powerline-status --user
```

如果没有，则先执行安装pip指令
```shell
sudo easy_install pip
```
## 安装字体库
将字体库下载下来 	https://github.com/powerline/fonts

### 将工程下载下来后cd到 `install.sh` 文件所在目录
### 执行指令安装字体库
1. 执行 ./install.sh 指令安装所有 `Powerline` 字体
2.安装完成后提示所有字体均已下载到 `/Users/superdanny/Library/Fonts` 路径下`All Powerline fonts installed to /Users/superdanny/Library/Fonts`

设置 `iTerm2` 的 Regular Font 和 Non-ASCII Font
Profiles -> Default -> Text -> Regular Font

我这里设置的是12pt Meslo LG S DZ Regular for Powerline

## 配色

**安装配色方案**

### 将配色方案下载下来	[https://github.com/altercation/solarized](https://github.com/altercation/solarized)

进入刚刚下载的工程的solarized/iterm2-colors-solarized 下双击 Solarized Dark.itermcolors 和 Solarized Light.itermcolors 两个文件就可以把配置文件导入到 iTerm2 里

### 配置配色方案
通过load presets选择刚刚安装的配色主题即可

Profiles -> Colors -> Load Presets...

## 使用agnoster主题
### 下载agnoster主题
下载主题 [https://github.com/fcamblor/oh-my-zsh-agnoster-fcamblor](https://github.com/fcamblor/oh-my-zsh-agnoster-fcamblor)

到下载的工程里面运行install文件,主题将安装到~/.oh-my-zsh/themes目录下

### 设置该主题

进入~/.zshrc打开.zshrc文件，然后将ZSH_THEME后面的字段改为agnoster。ZSH_THEME="agnoster"（agnoster即为要设置的主题）

## 增加指令高亮效果 zsh-syntax-highlighting

指令高亮效果作用是当用户输入正确命令时指令会绿色高亮，错误时命令红色高亮

```shell
cd ~/.oh-my-zsh/custom/plugins/

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

vi ~/.zshrc
```

打开.zshrc文件，找到plugins=(git)   
	plugins=(git zsh-syntax-highlighting)

然后在文件的最后一行添加：
```shell source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

执行命令使刚才的修改生效：
```shell
source ~/.zshrc
```

## 可选择、命令补全
跟代码高亮的安装方式一样，这也是一个zsh的插件，叫做zsh-autosuggestion，用于命令建议和补全。

```shell
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-autosuggestions
vi ~/.zshrc
```
添加 plugins=(
	git
	zsh-autosuggestions
	zsh-syntax-highlighting
)

## 获取.zshrc所在目录  
我这里是 /Users/macbook/.zshrc

Mac OS X中默认不存在~/.zshrc，因此您需要创建它。 ~/转换为用户的主目录，.zshrc是ZSH配置文件本身。

所以只需打开一个“终端”或“iTerm”窗口并像这样创建该文件;我正在使用nano作为文本编辑器，但随意使用您认为合适的文本编辑器：

nano ~/.zshrc
然后将ZSH_THEME值设置为您想要使用的任何值，如下所示：

ZSH_THEME="robbyrussell"

现在将文件保存在nano中，只需按 ctrl + X 。当它提示：

  
保存修改后的缓冲区（回答“否”会破坏更改）？

只需输入“Y”，然后你会得到一个看起来像这样的新提示;请注意路径/Users/jake/将匹配您当地用户的路径：

  
要写的文件名：/Users/jake/.zshrc

现在只需按 return ，文件将被保存，您现在将返回“终端”或“iTerm”中的命令行提示符。如果您现在退出“终端”或者“iTerm”然后打开一个新窗口，现在应该加载~/.zshrc设置。



附上作者的iTerm2的背景图

[图片链接](https://s1.ax1x.com/2020/03/20/86X3J1.jpg)

[iTerm2如何设置背景图片](https://jingyan.baidu.com/article/ca41422f7d5e801eae99edae.html)

[iTerm2如何分屏之后背景图不变？](https://segmentfault.com/q/1010000002617777)

![img](https://upload-images.jianshu.io/upload_images/19403677-f135459ee6dfd6c1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)