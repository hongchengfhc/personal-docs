---
title: 使用apng动画的两种方式
---
1. apng-canvas
2. apng-js




### 1. 使用apng-canvas做apng动画
使用起来代码简单，容易理解；但是监听动画的过程。

##### APNG
APNG 全称是 Animated Portable Network Graphics ， 是 PNG 格式的动画扩展。APNG 的第1帧为标准PNG图像，剩余的动画和帧速等数据放在PNG扩展数据块里。这里有点类似于视频的关键帧，关键帧有完整的图像信息，而两个关键帧之间只保留了变化的信息。
简单来说，APNG 支持全彩和透明，无杂边问题.

但并不是所有软件都支持APNG。

Android上有```APNG View```等，iOS上有```APNGKit```等

而Web上，Firfox和Safari是支持APNG，Chrome是支持WebP的。

所以我们要在Web上使用APNG可以使用Canvas

#### Canvas & APNG
我们可以使用 [apng-canvas](https://github.com/davidmz/apng-canvas)库。

#### 举例
```
APNG.ifNeeded().then(function() {
    var images = document.querySelectorAll(".apng-image");
    for (var i = 0; i < images.length; i++) APNG.animateImage(images[i]);
});
```
```APNG``` 这个对象是```apng-canvas```这个库提供的，```ifNeeded()```函数是用来判断浏览器是否支持APNG。

```APNG.animateImage()```是需要传入一个 Image Element，之后就交给Canvas去处理了。



### 2. 使用apng-js做apng动画
注：底部有作者 apng.vue的组件源码作参考
##### apng-js

[apng-js](https://github.com/davidmz/apng-js) 官方[demo](https://davidmz.github.io/apng-js/)

##### 使用方式
```
import parseAPNG from 'apng-js';

const apng = parseAPNG(buffer);
if (apng instanceof Error) {
    // handle error
}
// work with apng object
```
```parseAPNG```的参数是一个ArrayBuffer类型，比起apng-canvas的使用要较为复杂一些。
在这里我就举一下我之前的做法：

我们需要的是加载本地和远端的apng图片来进行动画操作.

因为最终参数需要一个ArrayBuffer类型的，而我们只有一张图片的url，因此需要进行转换。
经过测试得出转换步骤如下：

1. 先去请求这张图片以返回类型设为blob类型
```
// 加载图片资源，得到blob类型的值
loaderURL(url) {
  function createXmlHttpRequest() {
    if (window.ActiveXObject) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }
  return new Promise((resolve) => {
    let xhr = createXmlHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (res) {
      if (this.status == 200) {
        var blob = this.response;
        resolve(blob);
      }
    }
    xhr.send();
  })
}
```

2. 将blob转换成ArrayBuffer类型
```
// 将blob转换成buffer
blobToArrayBuffer(blob) {
  return new Promise((resolve) => {
    // Blob 转 ArrayBuffer
    let reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = function() {
      console.log(reader.result)
      resolve(reader.result)
    }
  })
}
```

3. 可以使用apng-js的parseAPNG得到apng对象，通过该对象可以获得动画播放器player
```
var apng = parseAPNG(buffer);
apng.getPlayer(canvas.getContent('2d')).then(player => {
    // 调用播放动画
    player.play();
})
```
player对象中有
* play --  playback started;
* frame -- frame played (frame number passed as event parameter);
* pause --  playback paused;
* stop -- playback stopped;
* end -- playback ended (for APNG with finite count of plays).
通过官方文档可看出，我们可以监听整个动画的事件。
官方demo中监听代码片段
![img](https://z3.ax1x.com/2021/07/30/WXdGz6.jpg)



作者apng.vue源码
```vue
<template lang="pug">
  .apng-div(ref="apng-div" v-if="src")
    canvas(ref="apng-canvas")
</template>

<script>
// require('./../libs/apng-canvas.min.js')
import parseAPNG from 'apng-js'

export default {
  mixins: [commonMixin],
  data() {
    return {
      remVal: 1
    }
  },

  props: {
    width: {
      type: String | Number,
      required: true
    },
    height: {
      type: String | Number,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },

  mounted() {
    this.remVal = (document.documentElement.clientWidth > 540 ? 540 : document.documentElement.clientWidth) / 375
    let canvas = this.$refs['apng-canvas'];
    this.loaderURL(this.src).then(blob => {
      console.log(blob)

      this.blobToArrayBuffer(blob).then(arrayBuffer => {
        let apng = parseAPNG(arrayBuffer);
        canvas.width = apng.width;
        canvas.height = apng.height;
        let scale = this.width * this.remVal / apng.width
        canvas.style = 'zoom: ' + scale;
        apng.getPlayer(canvas.getContext('2d')).then(player => {
          player.play();
        })
      })
    })
  },
  methods: {
    calc(val) {
      return this.remVal * val;
    },
    blobToArrayBuffer(blob) {
      return new Promise((resolve) => {
        // Blob 转 ArrayBuffer
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function() {
          console.log(reader.result)
          resolve(reader.result)
        }
      })
    },
    loaderURL(url) {
      function createXmlHttpRequest() {
        if (window.ActiveXObject) {
          return new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
          return new XMLHttpRequest();
        }
      }
      return new Promise((resolve) => {
        let xhr = createXmlHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "blob";
        xhr.onload = function (res) {
          if (this.status == 200) {
            var blob = this.response;
            resolve(blob);
          }
        }
        xhr.send();
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```
