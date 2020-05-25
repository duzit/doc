

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










