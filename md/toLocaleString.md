## toLocaleString
* 返回日期对象的字符串，locales 和 options 可以指定使用哪种规则格式化字符串
```js
let date = new Date()
date.toLocaleString() // "2020/9/30 下午5:18:56"
date.toLocaleDateString() // "2020/9/30"
date.toLocaleString('en-US') // "9/30/2020, 5:18:56 PM"

```

### 转换成千分制
```js
let num = 123456
num.toLocaleString() // '123,456'
```

