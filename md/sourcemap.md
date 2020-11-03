## sourcemap
---
### 什么是 sourcemap
* 是一个信息文件，里面存储着位置信息。转换后的代码的每一个位置，所对应的转换前的位置。  
  出错时将直接展示源码 而不是转换后的代码
### 缘由
* 大部分源码（尤其是各种函数库和框架）都要经过转换，才能投入生产环境，但在转换后的代码上定位错误非常不方便
### 参考链接
* http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
* https://www.webpackjs.com/configuration/devtool/
