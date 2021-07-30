<script>
import { isActive, hashRE, groupHeaders } from '../util'

export default {
  functional: true,

  props: ['item', 'sidebarDepth'],

  render (h,
    {
      parent: {
        $page,
        $site,
        $route,
        $themeConfig,
        $themeLocaleConfig
      },
      props: {
        item,
        sidebarDepth
      }
    }) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive
    const link = item.type === 'external'
      ? renderExternal(h, item.path, item.title || item.path)
      : renderLink(h, item.path, item.title || item.path, active)

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      1
    ].find(depth => depth !== undefined)

    const displayAllHeaders = $themeLocaleConfig.displayAllHeaders
      || $themeConfig.displayAllHeaders

    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
      //  && item.level > 2
    } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path) && item.level > 2) {
      // 1. 在这里加上条件  && item.level > 2 slidebar不渲染md中的h标签，但右侧滑动时不跟着选中
      // 2. 修改方式2，将.sidebar .sidebar-sub-headers 加属性 display: none
      const children = groupHeaders(item.headers)
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    } else {
      return link
    }
  }
}

function renderLink (h, to, text, active, level) {
  const component = {
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    attrs:{
      title: text
    },
    class: {
      active,
      'sidebar-link': true
    }
  }

  if (level > 2) {
    component.style = {
      'padding-left': level + 'rem'
    }
  }

  return h('RouterLink', component, text)
}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, active, c.level - 1),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}

function renderExternal (h, to, text) {
  return h('a', {
    attrs: {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    class: {
      'sidebar-link': true
    }
  }, [text, h('OutboundLink')])
}
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar .sidebar-sub-headers {
  padding-left: 1rem;
  font-size: .875rem;
  display: none; // 让左边不显示 .md 文件中的 h2 h3 标题
}

.sidebar-links {
  > li > a.sidebar-link {
    margin-top: 0.25rem;
    line-height: 2;
  }
}

a.sidebar-link {
  font-size: .875rem;
  font-weight: 400;
  display: inline-block;
  color: rgba(0,0,0,.65);
  padding: 0.4rem 1.5rem 0.4rem 2.5rem;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-right: 3px solid @accentColor;
    transform: scaleY(0.0001);
    opacity: 0;
    transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    content: '';
  }

  &:hover {
    color: @accentColor;
  }

  &.active {
    color: @accentColor;
    background-color: fade(@accentColor, 10%);

    &::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  // .sidebar-group & {
  //   padding-left: 2rem;
  // }

  .sidebar-sub-headers & {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-right: none;

    &.active {
      background-color: transparent;

      &::after {
        transform: scaleY(0.0001);
        opacity: 0;
      }
    }
  }
}

@media (max-width: @MQMobile) {
  a.sidebar-link {
    &.active {
      &::after {
        right: auto;
        left: 0;
      }
    }
  }
}
</style>
