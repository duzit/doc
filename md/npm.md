## npm
---
[参考链接](https://mp.weixin.qq.com/s/GBkAXKteNdt2ZZqM6f_JBg)
### 执行顺序
* 并行任务，使用&符号  
`$ npm run script1.js & npm run script2.js`

* 串行任务，使用&&符号  
`$ npm run script1.js && npm run script2.js`

### .npmrc 
* 项目级 .npmrc 文件的作用域只在本项目下
```
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```
