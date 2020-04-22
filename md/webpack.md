## webpack
-------

### 打包配置删除 console.log
```js
// npm install uglifyjs-webpack-plugin --save

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
      pure_funcs: ['console.log']
    }
  },
  sourceMap: config.build.productionSourceMap,
  parallel: true
})
drop_console 和 pure_funcs 的区别，drop_console 是把 console.log() 注释掉了，
而 pure_funcs 是把 console.log() 移除掉了。 
```

### DefinePlugin
* 在实际使用中， DefinePlugin 最为常用的用途就是用来处理我们开发环境和生产环境的不同。  
  比如一些 debug 的功能在生产环境中需要关闭、开发环境中和生产环境中 api 地址的不同
* 除 number 和 Boolean ，定义时需使用 JSON.stringify 转义
```js
plugins: [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify('development'),
    OBJ: JSON.stringify({"key": "value"}),
    ARRAY: JSON.stringify(["value1", "value2"]),
    ISPRODUTION: true,
    AGE: 12
  })
]
```

### EnvironmentPlugin
* EnvironmentPlugin 是一个通过 DefinePlugin 来设置 process.env 环境变量的快捷方式。
```js
new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])
// 等价于
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
})
```
* 带默认值使用 如果在 process.env 中对应的环境变量不存在时将使用指定的默认值
```js
new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEBUG: false
})
```

### ProvidePlugin
* 自动加载模块，而不必到处 import 或 require 
```js
// 使用 jQuery
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})

$('#item') // $ 自动被设置为 "jquery" 输出的内容
jQuery('#item')

// 使用 lodash map
new webpack.ProvidePlugin({
  _map: ['lodash', 'map']
});

// 使用 Vue.js
new webpack.ProvidePlugin({
  Vue: ['vue/dist/vue.esm.js', 'default']
});
```