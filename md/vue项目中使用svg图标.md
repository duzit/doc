## Vue项目中使用svg小图标，可修改大小颜色

### 获取svg文件上下文，并注册全局组件
```js
// src/icons/index.js 同级目录下有个svg文件夹存放所有的svg文件
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
```

### @/components/SvgIcon 文件内容
```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

### svg-sprite-loader 安装及配置
``` npm install svg-sprite-loader ```
```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg-icon')
      .test(/\.(svg)(\?.*)?$/)
      .include
      .add([path.resolve(__dirname, 'src/icons')])
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule('svg')
      .exclude
      .add([path.resolve(__dirname, 'src/icons')])
  }
}
```

### 使用 svg-icon 组件
```js
// header-icon 可定义 font-size color 等
// header 为svg文件的命名
<svg-icon class="header-icon" icon-class="header"></svg-icon>
```

### 注意
* UI提供的svg文件不能自填充颜色，如 fill: #A9AEB5,在svg文件中搜索 fill ，如果有颜色填充则删除。