<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar
      v-if="shouldShowNavbar"
    />

    <!-- <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    /> -->

    <Sidebar
      :items="sidebarItems"
      v-if="shouldShowSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home ref="home" v-if="$page.frontmatter.home" />

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>

    <a-back-top v-if="$themeConfig.backToTop"/>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  // data () {
  //   return {
  //     isSidebarOpen: false
  //   }
  // },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          // 'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {

    // 处理首页设置背景图片后

    if (this.$refs.home && this.$refs.home.$el) {
      const refHomeEl = this.$refs.home.$el
      const backgroundImage = getComputedStyle(refHomeEl, null)['backgroundImage']
      if (this.$route.path !== '/') {
        refHomeEl.style['backgroundImage'] = 'unset'
      }
      this.$router.afterEach((to, from) => {
        if (to.path !== '/') {
          refHomeEl.style['backgroundImage'] = 'unset'
        } else {
          refHomeEl.style['backgroundImage'] = backgroundImage
        }
      })
    }
  },

  // mounted () {
    // this.$router.afterEach(() => {
    //   this.isSidebarOpen = false
    // })
  // },

  // methods: {
    // toggleSidebar (to) {
    //   this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    //   this.$emit('toggle-sidebar', this.isSidebarOpen)
    // },

    // side swipe
    // onTouchStart (e) {
      // this.touchStart = {
      //   x: e.changedTouches[0].clientX,
      //   y: e.changedTouches[0].clientY
      // }
    // },

    // onTouchEnd (e) {
      // const dx = e.changedTouches[0].clientX - this.touchStart.x
      // const dy = e.changedTouches[0].clientY - this.touchStart.y
      // if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      //   if (dx > 0 && this.touchStart.x <= 80) {
      //     this.toggleSidebar(true)
      //   } else {
      //     this.toggleSidebar(false)
      //   }
      // }
    // }
  // }
}
</script>
