## webpack
-------
### 概念
* webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler)。  
  当webpack处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，  
  其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。

### entry
* webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler)。  
  当webpack处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，  
  其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。
```js
module.exports = {
  entry: 'server.js'
}
```

### output
* output属性告诉webpack 在那里你输出它所创建的bundles，以及如何命名这些文件，默认值为./dist。  
  基本上， 整个应用程序结构都会被编译到指定的输出路径的文件中。  
  即使存在多个入口起点，但只指定一个输出配置。  
```js
const path = require(‘path’)

module.exports = {
  entry: './file.js',
  output: {
    path: path.resolve(__dirname, './dist'), // 目标输出目录path的绝对路径
    filename: 'xxx.js', // 用于输出文件的文件名
  }
}
```

### loader
* loader让webpack能够去处理那些非JavaScript文件(webpack自身只理解JavaScript)。  
  loader可以将所有类型的文件转换为webpack能够处理的 有效模块。  
  本质上，webpack loader 将所有类型的文件转换为应用程序的依赖图可以直接引用的模块。  
  loader的两个目标：
1. test属性，用于标识出应该被对应的loader进行转换的某个或某些文件。
2. use属性，标识进行转换时，应该使用哪个loader。
```js
const path = require(‘path’)

module.exports = {
	entry: './file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'xxx.js',
  }，
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
}

```
* 当碰到在require()或import语句中被解析为’.txt’的路径时， 打包之前，先使用‘raw-loader’转换一下。  
  loader用于对源代码进行转换，可以在import或者加载模块时预处理文件。  
  不同语言转换 TypeScript -> JavaScript  
  内联图像转换为data URL  
  在JavaScript文件中import css文件  
  首先要安装对应的loader  
  npm install –save-dev css-loader  
  npm install –save-dev ts-loader  
  然后在webpack配置文件中配置  
```js
module.exports = {  
	module: {
		rules: [
			{ test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
} 
```

### 插件(plugins)
* 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。  
  想要使用一个插件只需require()它，然后把它添加到plugins数组中。  
  在于解决loader无法解决的其他事。
```js 
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') // 通过npm安装
const webpack = require('webpack')
module.exports = {
	entry: './file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'xxx.js',
  }，
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({ template: './index.html' })
  ]
}
```

### 模式 mode
* development 将 process.env.NODE_ENV 的值设为 development  
  production 将 process.env.NODE_ENV 的值设为 production
```js 
module.exports = {
	mode: 'development', // production
}
```

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
// drop_console 和 pure_funcs 的区别，drop_console 是把 console.log() 注释掉了，
// 而 pure_funcs 是把 console.log() 移除掉了。 
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

### resolve.alias
* 创建 import 和 require 的别名，确保模块引用变得简单。
```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
```

### 配置 gzip 打包
```js
const CompresssionPlugin = require('compression-webpack-plugin')

config.plugins = [
  ...config.plugins,
  new CompressionPlugin({
    test: /\.js$|\.html$|\.css$/,
    deleteOriginalAssets: false // 是否删除原文件
  })
]
```
* 配合 nginx
```conf
server: {
  gzip on; # 是否开启gzip
  gzip_buffers 32 4K; #缓冲(压缩在内存中缓冲几块? 每块多大?)
  gzip_comp_level 6; #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
  gzip_min_length 100; #开始压缩的最小长度(再小就不要压缩了,意义不在)
  gzip_types application/javascript text/css text/xml; #对哪些类型的文件用压缩 如txt,xml,html ,css
  gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
  gzip_vary on; #是否传输gzip压缩标志
}
```

### externals 外部扩展
* 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```
```js
module.exports = {
  externals: {
    // jquery 表示应该排除 import $ from 'jquery' 中的 jquery 模块
    // 为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量
    jquery: "jQuery"
  }
}
```
```js
module.exports = {
  //...
  externals: [
    {
      // String
      react: 'react',
      // Object
      lodash : {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_' // indicates global variable
      },
      // Array
      subtract: ['./math', 'subtract']
    },
    // Function
    function(context, request, callback) {
      if (/^yourregex$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    // Regex
    /^(jquery|\$)$/i
  ]
};
```

### 合并多个 webpack 配置
* webpack-merge
```js
// webpack.prod.conf.js
const merge = require('webpack-merge')
// 基础配置
const baseWebpackConfig = require('./webpack.base.conf')
const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    // ...
  },
  output: {
    // ...
  },
  module: {
    // ...
  },
  plugins: [
    // ...
  ]
})
```

### webpack 打包速度提升
[链接](https://mp.weixin.qq.com/s/_qp4JDDwWwliEBr1IXKd8g)
#### 影响打包速度分析
* 搜索所有依赖模块 所需的搜索时间  
```js
// 编译代码的基础配置
module.exports = {
  // ...
  module: {
    // 项目中使用的 jquery 并没有采用模块化标准，webpack 忽略它
    noParse: /jquery/,
    rules: [
      {
        // 这里编译 js、jsx
        // 注意：如果项目源码中没有 jsx 文件就不要写 /\.jsx?$/，提升正则表达式性能
        test: /\.(js|jsx)$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 排除 node_modules 目录下的文件
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    // 设置模块导入规则，import/require时会直接在这些目录找文件
    // 可以指明存放第三方模块的绝对路径，以减少寻找
    modules: [
      path.resolve(`${project}/client/components`), 
      path.resolve('h5_commonr/components'), 
      'node_modules'
    ],
    // import导入时省略后缀
    // 注意：尽可能的减少后缀尝试的可能性
    extensions: ['.js', '.jsx', '.react.js', '.css', '.json'],
    // import导入时别名，减少耗时的递归解析操作
    alias: {
      '@compontents': path.resolve(`${project}/compontents`),
    }
  },
};
```

* 解析所有依赖模块 各种loader单线程处理  
  优化解析时间,多线程打包  
  thread-loader 放置在其他 loader 之前   
  为了防止启动 worker 时的高延迟，提供了对 worker 池的优化：预热
```js
const threadLoader = require('thread-loader');

const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  // 当 require('os').cpus() 是 undefined 时，则为 1
  workers: 2,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000
};

const cssWorkerPool = {
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 2,
  poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);


module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: jsWorkerPool
          },
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'thread-loader',
            options: cssWorkerPool
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
      // ...
    ]
    // ...
  }
  // ...
}
```
* 将所有依赖模块打包到一个文件 压缩时间
  webpack3 打包时加上 --optimize-minimize 或者  
```js
module.exports = {
    optimization: {
        minimize: true,
    },
}
```
  webpack4 默认内置 terser-webpack-plugin  
```js
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
```

* 二次打包时间 修改后需重新打包  
  cache-loader  
  保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader
 ```js
 module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};
 ```
  
