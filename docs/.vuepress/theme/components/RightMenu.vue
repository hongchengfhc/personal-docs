<template>
  <div class="right-menu-wrapper">
    <div class="right-menu-margin">
      <div class="right-menu-content">
        <div
          :class="['right-menu-item', 'level'+item.level, { active: (item.slug === hashText || i === 0) }]"
          v-for="(item, i) in headers"
          :key="i"
        >
          <a :href="'#'+item.slug">{{item.title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
export default {
  data () {
    return {
      headers: [],
      hashText: ''
    }
  },
  mounted () {
    this.getHeadersData()
    this.getHashText()
    window.addEventListener('scroll', this.onscroll)
    this.$on('hook:destroyed', () => {
        window.removeEventListener('scroll', this.onscroll)
    })
    // this.$nextTick(() => {
    //   const hash = decodeURIComponent(this.$route.hash)
    //   const domAs = document.querySelectorAll('.right-menu-item a')
    //   for (let i = 0; i < domAs.length; i++) {
    //     console.log(domAs[i].getAttribute('href') == hash)
    //     if (domAs[i].getAttribute('href') == hash) {
    //       domAs[i].click()
    //     }
    //   }
    // })
  },
  watch: {
    $route () {
      this.headers = this.$page.headers
      this.getHashText()
    }
  },
  methods: {
    getHeadersData () {
      this.headers = this.$page.headers
    },
    getHashText () {
      this.hashText = decodeURIComponent(window.location.hash.slice(1))
    },
    rightSlidebarCss (key) {
      if (key) {
        document.querySelectorAll(".right-menu-item").forEach(x => {
          x.classList.remove('active')
        })
        const temp = document.querySelector(`.right-menu-item a[href="#${key}"]`)
        temp.parentElement.classList.add('active')
      }
    },
    onscroll: _throttle(function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const domH2s = document.querySelectorAll('.theme-antdocs-content h2')
      const domH3s = document.querySelectorAll('.theme-antdocs-content h3')
      const domHs = [].concat(...domH2s, ...domH3s)
      let currentDom = null
      for (let i = 0; i < domHs.length; i++) {
        const dom = domHs[i]
        if (dom.offsetTop > scrollTop) {
          continue
        }
        if (!currentDom) {
          currentDom = dom
        } else if (dom.offsetTop >= currentDom.offsetTop) {
          currentDom = dom
        }
      }
      if (currentDom) {
        this.rightSlidebarCss(currentDom.getAttribute('id'))
      }
    }, 10)
  }
}
</script>
<style lang="less">
@import '../styles/palette.less';
@import "../styles/wrapper.less";
.right-menu-wrapper {
    width: @rightMenuWidth;
    font-size: 0.9rem;
    width: 25%;
    .right-menu-margin {
        position: sticky;
        top: (@navbarHeight + 1rem);
    }
    .right-menu-content {
        max-height: 80vh;
        position: relative;
        overflow: hidden;
        &::-webkit-scrollbar-track-piece {
            background: none;
        }
        &::-webkit-scrollbar-thumb:vertical {
            background-color: hsla(0, 0%, 49%, 0.3);
        }
        &:hover {
            overflow-y: auto;
        }
        .right-menu-item {
            padding: 4px 15px;
            border-left: 0.13rem solid @borderColor;
            &.level3 {
                padding-left: 28px;
            }
            &.active {
                border-color: @accentColor;
                a {
                    color: @accentColor;
                    opacity: 1;
                }
            }
            a {
                color: @textColor;
                opacity: 0.75;
                display: block;
                width: (@rightMenuWidth - 30px);
                &:hover {
                    color: @accentColor;
                }
            }
        }
    }
}

@media (max-width: @MQMobile) {
  .right-menu-wrapper {
    display: none;
  }
}

@media (max-width: @MQNarrow) and (min-width: @MQMobile) {
  .right-menu-wrapper {
    display: none;
  }
}

</style>