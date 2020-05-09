/**
 * let var 变量提升  start
 */
if (true) {
  var a = 1
  let b = 2
}
console.log("a:", a) // a = 1
// console.log("b:", b) // Uncaught ReferenceError: b is not defined

// --------------------
for (var i = 0; i < 5; i++) {
  
}
console.log("var -- for", i) // i = 5

for (let j = 0; j < 5; j++) {

}
// console.log("let -- for", j) // Uncaught ReferenceError: j is not defined

// --------------------
console.log("c:", c) // 如果没有下面的var c; 报错： Uncaught ReferenceError: c is not defined
// 如果定义var c; 这是打印的将是 undefined
var c;

var d = 1;
function foo() {
  // 如果这里的if语句存在 d为undefined
  // 如果不存在d为1
  if (false) {
    var d = 2 // 如果是var定义 d为undefined
    // let d = 2 // 如果是let定义 d为1
  }
  console.log("d:", d)
}

foo();

/**
 * let var 变量提升  end
 */

/**
 * const  start 
 */
// 声明时必须赋值 不然会报错
const AGE = 10;

let me = {
  name: "ben",
  age: 28
}

// 如果值是一个对象 可以修改对象的值
// 对象me的指针指向user user不感知me对象内容的变化
const user = me
console.log("user:", user)

me.age = 29
console.log("user -- modify:", user)

/**
 * const  end 
 */

/**
 * 解构赋值  start
 */
let [x, y, z] = [1, 2, 3]
console.log("x, y, z:", x, y, z) // x, y, z: 1 2 3

// 省略中间变量赋值
let [x1, , z1] = [1, 2, 3]
console.log("x1, z1:", x1, z1) // x1, z1: 1 3

let [x2, ...z2] = [1, 2, 3]
console.log("x2, z2:", x2, z2) // x1, z1: 1 [2, 3]

// 指定默认值
let [x3, y3, z3=4] = [1, 2]
console.log("x3, y3, z3:", x3, y3, z3) // x3, y3, z3: 1 2 4
// let [x3, y3, z3=4] = [1, 2, 3]
// console.log("x3, y3, z3:", x3, y3, z3) // x3, y3, z3: 1 2 3

let Obj = {
  a0: 1,
  b0: 2
}
let {a0, b0, c0} = Obj
console.log("a0, b0, c0:", a0, b0, c0) // a0, b0: 1 2 undefined

let {length} = "Ben"
console.log("length:", length) // length: 3

let [q, w, e] = "Ben"
console.log("q, w, e:", q, w, e) // q, w, e: B e n

 /**
  * 解构赋值  end
  */

/**
 * 字符串方法  start
 */
console.log('for...of遍历字符串')
for (let str of 'ben') {
  console.log(str)
}

console.log("Ben".includes("B")) // true
console.log("Ben".includes("A")) // false

console.log("Ben".startsWith("B")) // true
console.log("Ben".startsWith("a")) // false

console.log("Ben".endsWith("n")) // true
console.log("Ben".endsWith("B")) // false

/**
 * 字符串方法  end
 */

/**
 * Set  start
 */
let arr = new Set([1, 2, 3, 3])
console.log(arr) // Set(3) {1, 2, 3}
console.log(arr.size) // 3
console.log(arr.add(4)) // Set(4) {1, 2, 3, 4}
arr.delete(4)
console.log(arr) // Set(3) {1, 2, 3}
console.log(arr.has(5)) // false
console.log(arr.has(1)) // true
arr.clear()
console.log(arr) // Set(0) {}

/**
 * Set  end
 */

/**
  * function start
  */
// 函数默认值
console.log('function...')
function print( a = 2 ) {
  console.log(a)
}
print()

// 扩展运算符 ...获取其余参数
function printValues(val0, val1, ...values) {
  console.log(val0, val1)
  console.log(values.join('--'), '扩展运算符...')
}
printValues(1, 2, '参数1', '参数2', '参数3')
/**
  * function end
  */

/**
 * Array start
 */
console.log('array...')
// Array.from 从一个类似数组或可迭代对象创建一个新的、浅拷贝的数组实例
let str = 'abc'
console.log('str.length:', str.length)
let arrFrom = Array.from(str)
console.log('Array.from(str):', arrFrom)

// 使用fill()初始化数组
let arrFill = new Array(10)
console.log(arrFill, 'arrfill')
arrFill.fill('1', 0, arrFill.length)
console.log(arrFill, 'arrfill after fill()')


/**
 * Array end 
 */

/**
 * Symbol 
 */

let s = Symbol()
console.log(s, 'Symbol()') // 'symbol'

let s1 = Symbol('s1')
let s2 = Symbol('s2')
console.log(s1.toString())
console.log(s2.toString())

let sObj = {
  name: 'zhang'
}
let s3 = Symbol(sObj)
console.log(s3, 'sObj') // Symbol([object Object]) "sObj"

let s4 = Symbol('ben')
let s5 = Symbol('ben')
console.log(s4 === s5, 's4 === s5') // false

/**
 * weakmap 对象是一组键值对集合 其中的键是弱引用的 只能是对象，值是任意的
 * new WeakMap([iterable]) 
 * iterable 是一个数组（二维数组）或者其他可迭代的且其元素是键值对的对象， null 会被当做 undefined
 * 静静的等待垃圾回收机制执行，obj 所引用的对象就会被回收
 * WeakMap 可以帮你省掉手动删除对象关联数据的步骤，
 * 所以当你不能或者不想控制关联数据的生命周期时就可以考虑使用 WeakMap
 */
let wm0 = new WeakMap()
let wm1 = new WeakMap()

let wmO0 = {}
let wmO1 = [1, 2, 3]
let wmO2 = null
wm0.set(wmO0, 'wm')
console.log(wm0.get(wmO0), 'wm0.get(wmO0)') // 'wm'
wm1.set(wmO1, wmO1) 
console.log(wm1.get(wmO1), 'wm1.get(wmO1)') // [1, 2, 3]
console.log(wm1.has(wmO1), 'WeakMap.has()') // true
// wm1.set(wmO2, wmO2) // 报错 Invalid value used as weak map key