<template>
  <main class="page">
    <slot name="top" />

    <div class="content-wrapper">
      <div class="body-content">
        <Content class="theme-antdocs-content" />
        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
      </div>
      <RightMenu v-if="showRightMenu" />
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import RightMenu from './RightMenu.vue'

export default {
  components: { PageEdit, PageNav, RightMenu },
  props: ['sidebarItems'],
  computed: {
    showRightMenu () {
      const { $frontmatter, $themeConfig, $page } = this
      const { sidebar } = $frontmatter
      return (
        $themeConfig.rightMenuBar !== false &&
        $page.headers &&
        ($frontmatter && sidebar && sidebar !== false) !== false
      )
    }
  }
}
</script>

<style lang="less">
@import '../styles/palette.less';
@import "../styles/wrapper.less";
.page {
  padding-bottom: 2rem;
  display: block;
  background: @bodyBgColor;
  .content-wrapper {
    position: relative;
    display: flex;
    max-width: @contentWidth;
    margin: 0 auto;
    .body-content {
      width: 75%;
      padding: 0 2rem;
    }
  }
}
@media (max-width: @MQMobile) {
  .page {
    margin-top: -@navbarHeight;
  }
  .content-wrapper {
    display: unset!important;
  }
}
@media (max-width: @MQNarrow) {
  .page .content-wrapper .body-content {
    width: 100%;
  }
}
</style>
