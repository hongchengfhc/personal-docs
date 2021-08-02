<template>
<div class="net-image-container">
  <div class="row">
    <div style="display: flex;">
      <a-input style="width: 50%" type="text" v-model="imageUrl" placeholder="请输入网络图片地址"></a-input>
      <img v-if="!errorImage" style="border: 2px solid #ddd; margin-left: 15px; width: 100px;height: auto;" :src="imageUrl">
    </div>

    <div style="margin-top: 10px;">
      <a-button type="primary" @click="getWH()">获取</a-button>
    </div>
  </div>
  <div class="row desc" style="margin-top: 10px;">结果：{{ data && JSON.stringify(data) }}</div>
</div>
</template>

<script>

export default {
  name: "networkImage",
  data () {
    return {
      imageUrl: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
      data: null,
      errorImage: false
    }
  },
  watch: {
    imageUrl: {
      handler () {
        this.getWH()
      },
      immediate: true
    }
  },
  methods: {
    async getWH () {
      try {
        this.errorImage = false
        const data = await this.getImgWH(this.imageUrl)
        this.data = data
      } catch (e) {
        this.errorImage = true
        this.data = null
      }
    },
    getImgWH(imgUrl) {
      const image = new Image();
      image.src = imgUrl;
      return new Promise(function(resolve, reject) {
          if (image.complete) {
          // 图片被缓存了
          resolve({
              width: image.width,
              heigh: image.height
          })
        } else {
            image.onload = function() {
              resolve({
                  width: image.width,
                  heigh: image.height
              })
            }
            image.onerror = function () {
              reject()
            }
        }
      })
    }
  }
}
</script>
