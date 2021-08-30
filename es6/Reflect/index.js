
const obj = {}
Object.defineProperty(obj, 'name', { value: 'Ben' });
console.log(obj); // { name: 'Ben' }

// Object.defineProperty 无法定义属性时会抛出错误 所以防止报错写法如下
// try {
//   // 重复定义会报错
//   Object.defineProperty(obj, 'name', { value: 'hello' })
// } catch (error) {
//   console.log(error);
// }

// Reflect.defineProperty 返回 true false
if (Reflect.defineProperty(obj, 'name', { value: 12 })) {
  // ...
} else {
  console.log('define error');
}

const person = {
  name: 'Hello',
  age: 12,
  get fn() {
    return `${this.name}-${this.age}`;
  },
  nFn() {
    return `${this.name}-${this.age}`;
  }
};

const receiverObj = {
  name: 'Ben',
  age: 18
}

console.log('name' in person);
console.log('age' in person);
console.log('sex' in person);

console.log(Reflect.has(person, 'name'));
console.log(Reflect.has(person, 'sex'));

const p = new Proxy(person, {
  get: function(target, name) {
    console.log('get handler');
    return Reflect.get(target, name);
  }, 
  set(target, name, value) {
    console.log('set handler');
    return Reflect.set(target, name, value);
  }
})

p.name; // get handler
p.age = 14; // set handler
console.log(p); // { name: 'Hello', age: 14} 

console.log(Reflect.get(person, 'name')); // 'Hello'
console.log(Reflect.get(person, 'sex')); // undefined

const ret = Reflect.get(person, 'fn', receiverObj);
console.log(ret); // Ben-18
const ret2 = Reflect.get(person, 'nFn', receiverObj);
console.log(ret2); // Function

const setObj = {
  boo: 1,
  foo: 2,
  set fn(value) {
    return this.foo = value;
  }
}

Reflect.set(setObj, 'boo', 3);
console.log(setObj.boo); // 3

const setReceiver = {
  foo: 5
}

Reflect.set(setObj, 'fn', 4, setReceiver)
console.log(setObj.foo); // 2
console.log(setReceiver.foo); // 4

const ob = {
  a: 1
}

const handler = {
  set(target, name, value, receiver) {
    console.log('set');
    Reflect.set(target, name, value, receiver);
  },

  defineProperty(target, name, attr) {
    console.log('defineProperty');
    Reflect.defineProperty(target, name, attr);
  }
}

const o = new Proxy(ob, handler);

o.a = 2
// set
// defineProperty

function Hello(name, str) {
  console.log(name, str); // 2 'You'
  this.name = name;
} 

const ins = Reflect.construct(Hello, [2, 'You', 1, 3, 4])
console.log(ins.name); // 2