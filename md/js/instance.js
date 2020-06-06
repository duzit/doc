

// JSON.stringify()
console.log('JSON.stringify()---');

console.log(JSON.stringify({})) // {}
console.log(JSON.stringify(true)); // 'true'
console.log(JSON.stringify('foo')); // "foo"
console.log(JSON.stringify({name: 123})); // {"name":123}
console.log(JSON.stringify([1, 2, 3, 'www'])); // [1,2,3,"www"]
// 不显示 undefined
console.log(JSON.stringify({
  a: undefined,
  b: 2
})); // {"b":2}
// undefined 显示为 null 
console.log(JSON.stringify([undefined, 2, 'hello'])); // [null,2,"hello"]
let stringifyObj = {
  name: 'hello',
  age: 11
}
// 第二个参数为 function 
console.log(JSON.stringify(stringifyObj, function(key, value) {
  if (typeof value === 'string') return undefined
  return value
})) // {"age":11}
// 不改变原数据
console.log(stringifyObj); // {name: "hello", age: 11}

// 第二个参数为数组  指示显示的属性
console.log(JSON.stringify(stringifyObj, ['name'])); // {"name":"hello"}
console.log(JSON.stringify(stringifyObj, ['age'])); // {"age":11}

// 第三个参数为数字 控制显示
console.log(JSON.stringify(stringifyObj, null, 9));
// {
//          "name": "hello",
//          "age": 11
// }
console.log(JSON.stringify(stringifyObj, null, 4));
// {
  //     "name": "hello",
  //     "age": 11
  // }
console.log(JSON.stringify(stringifyObj, null, "**"));
// {
//   **"name": "hello",
//   **"age": 11
// }
console.log(JSON.stringify(stringifyObj, null, "\t"));
// {
// 	"name": "hello",
// 	"age": 11
// }

// Object.keys()
console.log('Object.keys()---');
console.log(Object.keys([2, 3, 4])); // ["0", "1", "2"]
console.log(Object.keys({
  0: 'a',
  1: 'b',
  2: 'c'
})); // ["0", "1", "2"]
console.log(Object.keys({
  4: 'a',
  1: 'b',
  2: 'c'
})); // ["1", "2", "4"]
console.log(Object.keys({
  name: 'qw',
  age: 10
})); // ["name", "age"]
console.log(Object.keys({})); // []

// Object.is()
console.log(0 == ' '); // true
console.log(null == undefined); // true
console.log([1] == true); // true
console.log(NaN == NaN); // false

console.log(Object.is(0, ' ')); // false
console.log(Object.is(null, undefined)); // false
console.log(Object.is([1], true)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is([], [])); // false
console.log(Object.is(0, -0)); // false
console.log(Object.is(0, +0)); // true
console.log(Object.is(-0, -0)); // true
console.log(Object.is({ a: 1 }, { a: 1 })); // false

// 参数检查
const isRequired = () => { throw new Error('params is required.') }
const print = (num = isRequired()) => { console.log(`params is ${num}`); }
print(10) // params is 10
// print() // Error
print(null) // params is null

// 从数组中删除虚假值
let deleteNullEle = [1,2,3,0,null,undefined]
console.log(deleteNullEle.filter(Boolean)); // [1,2,3]

// 合并多个对象
let obj1 = { name: 'zs', age: 10 }
let obj2 = { id: '001', num: 99 }
console.log({...obj1, ...obj2}); // {name: "zs", age: 10, id: "001", num: 99}

//  禁用右键
{/* <div class="main" oncontextmenu="return false"></div> */}

// 检查数字是否为 2 的幂
const isNumPowerOfTwo = num => !!num && (num & (num - 1)) == 0
console.log(isNumPowerOfTwo(3)); // false
console.log(isNumPowerOfTwo(4)); // true









