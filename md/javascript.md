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

