// 各种类型均可作为键
const a = new Map();

const symbol = Symbol('a')
a.set(symbol, 'hello symbol')

const obj = {
  name: 'hello',
  age: 12
}
a.set(obj, 'this is object')

console.log(a.size); // 2
console.log(a.get(symbol)); // hello symbol
console.log(a.get(obj)); // this is object

const key = 'seKey';
a.set(key, 'key')

console.log(a.has(key));  // true
a.delete(key)
console.log(a.has(key)); // false

const items = [
  [1, 2],
  [3, 4]
]

const set = new Set(items)
console.log([...set]);

const m2 = new Map([
  ['name', 'ben'],
  ['age', 12]
])

console.log(m2.size); // 2
console.log(m2.has('name')); // true
console.log(m2.get('name')); // ben

// Set Map 都可用来生成新的 Map
const o1 = [
  ['title', 'hello'],
  ['name', 'Ben']
]

const set2 = new Set(o1)
const map2 = new Map(set2)
console.log(map2.get('title')); // hello

const m3 = new Map(o1)
const m4 = new Map(m3)
console.log(m4.get('name')); // Ben

const m5 = new Map()
const k1 = ['name']
const k2 = ['name']

m5
  .set(k1, '111')
  .set(k2, '222')

console.log(m5.get(k1)); // 111
console.log(m5.get(k2)); // 222

// Map 转 数组
const mTa = [
  [1, 'a'],
  [2, 'b'],
  [3, 'c']
]

const m6 = new Map(mTa)

console.log([...m6.keys()]); // [1, 2, 3]
console.log([...m6.values()]); // ['a', 'b', 'c']
console.log([...m6]);

// Map.forEach()
m6.forEach((value, key, map) => {
  console.log(`key: ${key}, value: ${value}`);
})

// forEach 绑定 this
const reporter = {
  conLog: function(key, value) { // 这里不能使用箭头函数
    console.log(`key: ${key}, value: ${value}`);
  }
} 

m6.forEach(function (value, key, map) { // 这里不能使用箭头函数
  this.conLog(key, value)
}, reporter)

