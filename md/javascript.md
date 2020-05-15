## JavaScript
--------
### 数组对象
#### Array.from()
* Array.from(object, mapFunction, thisValue)
* from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
```
Array.from('123', (el) => el + 'a') // ["1a", "2a", "3a"]
Array.from([1, 2, 3]) // [1, 2, 3]
```

### forEach()
* 只能遍历数组，不能中断，没有返回值(或认为返回值是 undefined )

### 置换元素和非置换元素
* 置换元素  
  浏览器根据元素的标签和属性，来决定元素的具体显示内容  
  例如：浏览器根据<img>标签的src属性显示图片。根据标签的type属性决定显示输入框还是按钮。  
  <img><input><textarea><select><object>
* 非置换元素  
  浏览器中的大多数元素都是不可置换元素，即其内容直接展示给浏览器。  
  例如<label>标签，<p>标签里的内容会被浏览器直接显示给用户。

### DOM 事件流
* 事件捕获阶段
* 处于目标阶段
* 事件冒泡阶段

### css 可继承元素
* 所有元素可继承：visibility和cursor。
* 内联元素可继承：  
  letter-spacing、word-spacing、white-space、line-height、color、font、font-family、  
  font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
* 终端块状元素可继承：text-indent和text-align。
* 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image

### clientWidth
* ele.clientWidth = 宽度 + padding
* ele.offsetWidth = 宽度 + padding + border

### <embed> 
* 定义嵌入的内容，比如插件
* 必须有 src 属性