# ES6+
-----------
### Symbol
* 新的数据类型，表示独一无二的值。可以保证不会跟其他属性名冲突。
* Symbol 函数前不能使用 new ，这是因为生成的 Symbol 是一种数据类型，而不是对象。
* Symbol 函数可以接受一个参数，表示描述，容易区分。
* 如果 Symbol 函数的参数是一个对象，就会调用该对象的 toString() 方法，将其转为  
	字符串，然后才生成一个 Symbol 值
* Symbol 参数只是表示对当前 Symbol 值的描述，因此相同参数的函数返回值是不相等的
* Symbol 值不能与其他类型的值进行运算，但 Symbol 值可以显式转为字符串
* http://caibaojian.com/es6/symbol.html


