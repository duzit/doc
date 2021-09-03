
console.log('Set init.');

const arrSet = new Set([1, 2, 3, 4, 1, 2, 3]);
console.log([...arrSet]); // [1,2,3,4]
console.log(arrSet.size); // 4

window.onload = function() {
  const eles = new Set(document.querySelectorAll('div'));
  console.log(eles.size); // 4
}

// 去重字符串
console.log([...new Set('aabbcc')].join('')); // abc

// keys values entries
const set = new Set([1, 3, 'a', 'name', false]);
const keys = set.keys();
const values = set.values();
const entries = set.entries();
console.log([...keys]); // [1, 3, "a", "name", false]
console.log([...values]); // [1, 3, "a", "name", false]
console.log([...entries]); // key value 完全相等

// forof 可直接遍历 set
for (const k of set) {
// for (const k of [...set]) {
  console.log(k);
}

// 交集 并集 差集 
const arr1 = new Set([1, 2, 3, 4])
const arr2 = new Set([5, 2, 3, 4])

const union = new Set([...arr1, ...arr2])
console.log([...union]);

const interset = new Set([...arr1].filter(i => arr2.has(i)))
console.log([...interset]);

// arr1 相对于 arr2 的差集
const diff = new Set([...arr1].filter(i => !arr2.has(i)))
console.log([...diff]);

// WeakSet
const aWs = [[1, 3], [2, 4]];
const ws = new WeakSet(aWs);
console.log(ws);

console.log(ws.has([1, 3]));