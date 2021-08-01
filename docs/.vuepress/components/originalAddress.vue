<template>
  <div class="original-address-container">
    <p class="tips">{{ tips }}</p>
    <a :src="link">
      <div class="left-icon">
        <img src="http://wx.qlogo.cn/mmhead/Q3auHgzwzM5qsXLW1dPyica6icaNFJZGDwTHCRuRRDO7x272vkmVnEWA/0" alt="">
      </div>
      <div class="right-content">
        <strong class="title">{{ title }}</strong>
        <p class="desc">{{ desc }}</p>
      </div>
      <div class="arrow">
        <img :src="arrow" alt="">
      </div>
    </a>
  </div>
</template>

<script>
/**
 * <ClientOnly>
  <originalAddress
    tips="以下文章来源于code秘密花园 ，作者ConardLi",
    icon="http://wx.qlogo.cn/mmhead/Q3auHgzwzM5qsXLW1dPyica6icaNFJZGDwTHCRuRRDO7x272vkmVnEWA/0",
    title="code秘密花园",
    desc="一个优质的前端号，基础、框架、算法、项目、面试...   总有你想要的。",
    link="https://mp.weixin.qq.com/s/izPqa7sn3bJ73iEJkUW64w"/>
</ClientOnly>
 */
export default {
  name: "originalAddress",
  props: {
    tips: {
      type: String
    },
    icon: {
      type: String,
      default: ""
    },
    title: String,
    desc: String,
    link: String
  },
  data () {
    return {
      arrow: `data:image/svg+xml;charset=utf8, %3Csvg width='10' height='20' viewBox='0 0 10 20' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M6.323 10.358l-.884.884L.623 6.426a.83.83 0 0 1 0-1.177L5.44.433l.884.884-4.52 4.52 4.52 4.521z' id='a'/%3E%3C/defs%3E%3Cuse fill='%23000' transform='rotate(-180 4.184 7.921)' xlink:href='%23a' fill-rule='evenodd' opacity='.3' /%3E%3C/svg%3E`
    }
  }
}
</script>

<style lang="less" scoped>
  .original-address-container {
    .tips {
      color: rgba(0,0,0,0.3);
    }
    a {
      position: relative;
      background: #ebebeb;
      height: 86px;
      padding: 20px 16px;
      margin-top: 15px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .left-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right-content {
      min-width: 0;
      .title {
        color: rgba(0,0,0,0.9);
        font-size: 17px;
        font-weight: 700;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        display: block;
      }
      .desc {
        color: rgba(0,0,0,0.5);
        font-size: 14px;
        padding-top: 4px;
        padding-right: 15px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }
    .arrow {
      position: absolute;
      right: 10px;
    }
  }
</style>
