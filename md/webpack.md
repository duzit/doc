## webpack
-------

### 打包配置删除 console.log
```
npm install uglifyjs-webpack-plugin --save

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