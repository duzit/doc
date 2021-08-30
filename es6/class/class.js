// 生成实例对象的传统方法 是使用构造函数
function Foo(x, y, name = 'hello') {
  this.x = x;
  this.y = y;
  this.name = name;

  this.getInfo = () => {
    return this.name;
  }
}

// 箭头函数 this 指向 window 
// name = 'Ben';
Foo.prototype.getName = () => {
  return `name: ${this.name}`;
}

Foo.prototype.toString = function() {
  return `x: ${this.x}; y: ${this.y}`;
}

const foo = new Foo(1, 2, 'Moto');

console.log(foo.x); // 1
console.log(foo.y); // 2
// function 普通函数 this 指向该实例
console.log(foo.toString()); // x: 1; y: 2
// 箭头函数
console.log(foo.getName()); // name:
// 如果此时定义全局变量 name = 'Ben'
// console.log(foo.getName()); // name: Ben
// 定义在原型上的箭头函数 无法改变 this 指向
console.log(foo.getName.bind(foo)()); // name: 

console.log(foo.getInfo()); // 
// 改变 this 指向
// console.log(foo.getInfo.bind(foo)()); // Moto
// console.log(foo.getInfo.apply(foo)); // Moto
// console.log(foo.getInfo.call(foo)); // Moto


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.getString = this.getString.bind(this);
    this.getThis = () => this;
  }

  // 不需要使用 function 定义方法
  toString() {
    return `x: ${this.x}; y: ${this.y}`;
  }

  get prop() {
    console.log('getter');
    return 'prop';
  }

  set prop(value) {
    console.log('setter', value);
    // this.prop = value;
  }

  getString() {
    return this.toString();
  }
}

// ES6 类是另一种构造函数的写法
// 类的基本数据类型是函数 
console.log(typeof Point); // 'function'
// 类本身指向构造函数
console.log(Point === Point.prototype.constructor); // true

// 使用 class 时用 new 关键字 跟构造函数一样

const point = new Point(100, 200);
const str = point.toString();
console.log(str); // x: 100; y: 200

console.log(Point.prototype); // {constructor: ƒ, toString: ƒ}

// class 定义在原型上的方法 不可枚举 function 可以
const keys = Object.keys(Point.prototype);
console.log(keys); // []
console.log(Object.getOwnPropertyNames(Point.prototype)); // ["constructor", "toString"]

console.log(Object.keys(Foo.prototype)); // ["getName", "toString"]
console.log(Object.getOwnPropertyNames(Foo.prototype)); // ["constructor", "getName", "toString"]

console.log(point.hasOwnProperty('x')); // true
console.log(point.hasOwnProperty('y')); // true
console.log(point.hasOwnProperty('toString')); // false

console.log(foo.hasOwnProperty('getInfo')); // true

// 存取值 
console.log(point.prop);
// 'getter'
// 'prop'

point.prop = 'hello'; // 'setter hello'

// 存值函数和取值函数都是设置在属性的描述符（Descriptor）上
const descriptor = Object.getOwnPropertyDescriptor(Point.prototype, 'prop');
console.log('get' in descriptor); // true
console.log('set' in descriptor); // true

const { getThis, getString } = point;
// getString(); // Uncaught TypeError: Cannot read property 'toString' of undefined
// 绑定后 
console.log(getThis().getString()); // x: 100; y: 200

class Boo {
  static num = 1;

  #age = 0;

  up () {
    this.#age++;
    console.log(this.#age);
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    this.#age = value;
  }
}

Boo.count = 12

console.log(Boo.num); // 1
console.log(Boo.count); // 12

const boo = new Boo();
boo.up(); // 1
boo.up(); // 2
// boo.#age; // Error

console.log(boo.age); // 2
boo.age = 10;
console.log(boo.age); // 10
