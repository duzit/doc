******
### 内容
------

### window.onload
* 一般页面上的代码按照从上到下，从左到右的执行顺序。所以当js需要获取页面中的元素时，
  如果script标签写在元素的前面，需要加window.onload；如果放在元素的后面，则不需要加。
  如果script放在head里则需要加window.onload,
  放在body里不需要加。

### element组件自带方法经典传参
* 支持传多个参数
* @showContextMenu='(e) => treeRightClick(e, data, node)'

### css命名规范
* https://juejin.im/post/5b925e616fb9a05cdd2ce70d

### event.preventDefault()
* 该方法将通知web浏览器不要执行与事件关联的默认动作。例如如果type属性是‘submit’，
  在事件传播的任意阶段可以调用任意的事件句柄，通过调用发方法，可以阻止提交表单。

### v-if vs v-show
* v-if是真正的条件渲染，会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
* v-if也是惰性的，如果在初始渲染时条件为假，则什么也不做，直到条件第一次为真才开始渲染条件块
* v-show不管初始条件是什么，元素总会被渲染，并且只是简单的基于css进行切换
* 如果需要频繁地切换，使用v-show较好。如果在运行时条件很少改变，v-if更好。

### 数组方法
#### 改变原始数组
  * push() pop() shift() unshift() splice() sort() reverse() 

#### 保留原始数组 返回新数组
  * filter() concat() slice() 

### Vue响应式数据设置方法
#### 数组
```
data: {
  items: ['a', 'b', 'c']
}
* Vm.set(vm.items, indexOfItem, newValue)
* vm.$set(vm.items, indexOfItem, newValue)
* vm.items.splice(indexOfItem, 1, newValue)
```

#### 对象 
* 对于已创建的实例 Vue不能动态检测根级别的属性的添加或删除

```
data: {
  user: {
    name: 'Ben'
  }
}
Vue.set(vm.user, 'age', 28)
vm.$set(vm.user, 'age', 28)
```

* 如果需要添加多个属性，使用Object.assign()需注意，应该用两个对象的属性
  创建一个新的对象。

```
vm.user = Object.assign({}, vm.user, {
  age: 28,
  sex: 'men'
})
```

### Vue.nextTick()
* 在下次DOM更新循环结束以后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。

```
// 修改数据
vm.msg = 'Hello'
// DOM还未更新
Vue.nextTick(() => {
  // DOM更新了
})
```

### Vue v-model 修饰符
* .lazy 在change时而非‘input’时更新
` <input v-model.lazy='msg'> `

* .number 自动将输入的值转为数值类型
` <input v-model.number='age' type='number'> `

* .trim 自动过滤输入的首尾空白字符
` <input v-model.trim='msg'> `

### instanceof 
* instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置

#### 注意
* 如果表达式obj instanceof Foo返回true，并不意味着该表达式的返回值一直为true。
  因为Foo.prototype属性的值可能会变，改变后的值很可能不存在于obj的原型链上。比如
  借助非标准的__proto__伪属性是可以实现的。
  
```
let oo = new Car()
oo instanceof Car // true
oo instanceof Object // true
```

### axios添加请求头
* axios.get(url, {
    headers: {
      'Authorization': getToken() || '',
      'workspaceId': window.localStorage.factoryId || '',
      'factoryId': window.localStorage.factoryId || '',
      'checkFactory': true,
      'username': getUserName() || '',
    }
  })

### HTML5 存储
* sessionStorage: 大小上限为5Mb(不同浏览器会有差异)，页面关闭时清空。
* localStorage: 大小上限为5Mb(不同浏览器会有差异)，页面关闭时不会清空。
#### api
* setItem(key, value)
* getItem(key)
* removeItem(key)
* clear()

### git回退到某个版本
* git log命令查看所有的历史版本，获取某个历史版本的id，例如139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
* git reset --hard 139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96
* git push -f -u origin master
* 设置分支保护 branches -> project settings


### 禁用Chrome浏览器默认保存密码提示
* 大部分浏览器是根据表单域的type='password'判断密码域的，使用'动态设置密码域'方法解决
  el-input(
    v-model="facInitForm.dbPassword", 
    placeholder="请输入密码", 
    :type="inputType", 
    @focus="inputType = 'password'", 
    autocomplete="off")

### 数组遍历 判断条件成立及终止遍历 for of使用break
* for (const child of item.children) {
    if (this.getUserMenus(child.code)) {
      item.href = child.href
      break
    }
  }

### axios 请求取消
* 使用 cancel token 取消请求
  1. 使用 CancelToken.source 工厂方法创建 cancel token 
    let cancelToken = axios.CancelToken()
    let source = cancelToken.source()
    axios.get('', {
      cancelToken: source.token
    })
      .then(() => {})
      .catch(() => {})
    
    <!-- 取消请求 参数可选 -->
    source.cancel('...')

  2. 通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token
    let cancelToken = axios.CancelToken()
    let cancel 
    axios.get('', {
      cancelToken: new cancelToken(function executor(c) {
        cancel = c 
      })
    })

    <!-- 取消请求 -->
    cancel()
* 可以使用同一个 cancel token 取消多个请求

### CSS代码技巧
#### 注意外边距折叠
* 与其他的大多数属性不同，上下的垂直外边距margin在同时存在时会发生外边距折叠，这意味着当一个元素的下边缘接触到另一个元素的
  上边缘时，只会保留两个margin值较大的那个。解决该问题的常规做法是上下的外边距统一使用margin-bottom。
#### 重置元素的CSS样式
* 不同浏览器对于各种元素的默认样式存在很大的差异，解决方法是在CSS开头为所有元素设置通用的CSS Reset重置代码。

  ```
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ```

#### 所有元素设置为border-box
* box-sizing的两个属性，context-box和border-box。
* context-box，一个div的宽度设为100px，padding设为10px，则这个元素将占用120px。
* border-box，padding和边框包含在元素的宽度或高度中，一个width:100px的border-box的元素，宽度就是100px，
  无论它的内边距和边框有多少。
* 将所有元素都设为border-box，可以轻松改变元素的大小，而不必担心padding或者边框值影响元素。
#### 保持选择器的低权重
* 选择器的权重大小规格
  ID(#id) > Class(.class) > Type(header)

### DOM
* DOM代表着加载到浏览器窗口的当前网页
* D document  O object  M model

### 基本类型和引用类型
* 基本类型
  > number 
  > string
  > boolean
  > null
  > undefined
  > symbol(es6)
* 引用类型(对象类型)
  > object 
  > array
  > function 
  > ...
* boolean string number 可以调用toString()等对象原型上的方法
  原因是js引擎在解析下面语句时，会把这三种基本类型解析为包装对象，而包装对象是引用类型，可以
  调用Object.prototype上的方法。
  > true.toString() // 'true' 
  > NaN.toString() // 'NaN'
  > 'abc'.toString() // 'abc'
* 基本类型和引用类型的不同点
  > 基本类型存储的是值，引用类型存储的是一个指向对象真实内存地址的指针。
  > js所有的函数语句都是在执行栈中执行的，所有的变量也是在执行栈中保存着值和引用。基本类型就存储在栈内存中，
    保存的是实际的值，引用类型存储在堆内存中，在栈中只保存着变量指向内存地址的指针。

### 当 el-form 表单内只有一个 el-input 输入框时，在输入框内回车就会触发表单的提交事件
* 在 el-form 上加上 @submit.native.prevent 属性就可以阻止回车提交事件

### 获取某月的第一天和最后一天
```
function getFirstLastDay(month, flag) {
  let number = flag ? 1 : 0
  let date = new Date()

  let firstDay = new Date(date.getFullYear(), date.getMonth() - number - (month - 1 || 0), number)
  let y = firstDay.getFullYear()
  let m = firstDay.getMonth() + 1
  let d = firstDay.getDate()

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  return y + '-' + m + '-' + d
}
```

### nginx 反向代理与负载均衡
* 反向代理

  > 个人电脑无法访问服务器集群，必须通过第三方服务器才能访问，但我们不知道哪一台服务器提供的
    服务。

  > proxy_pass

  ```
  server {
    listen 8080;
    location / {
      proxy_pass http://10.0.0.16:8080
    }
  }
  ```

* 负载均衡

  > 当用户访问网站时，先访问一个中间的服务器，再让这个中间服务器在服务器集群中选择一个压力较小
    的服务器，这样便分担了服务器的压力。

  > upstream 模块实现

  ```
  http {
    upstream demo {
      ip_hash; // 如果第一次访问该服务器后就记录，之后再访问都是该服务器了
      server 10.0.0.16;
      server 10.0.0.17;
    }
    server {
      listen 8080;
      location / {
        proxy_pass http://demo
      }
    }
  }
  ```

### 7个有用的Vue开发技巧
* https://mp.weixin.qq.com/s/SKf3ImexLe_2AN7HNKNw3w
* https://juejin.im/post/5ce3b519f265da1bb31c0d5f

### 设置指定行隐藏显示
```
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3; // 行数
-webkit-box-orient: vertical;
```
### MVVM
* model-view-viewmodel
  MVVM最早由微软提出，借鉴桌面应用程序MVC思想，在前端页面中，把Model用纯JavaScript对象表示，View负责显示，
  两者做到了最大限度的分离。
  把Model和View关联起来就是ViewModel，负责把Model的数据同步到View显示出来。还负责把View的修改同步回Model。
  设计思想：关注Model的变化，让MVVM框架自动更新DOM的状态，从而把开发者从操作DOM的繁琐步骤中解脱出来。

### apply call bind
* call

```
let user = {
  name: 'Bruce Lee',
  WhatIsYourName: function() {
    console.log(this.name)
  }
}

user.WhatIsYourName() // Bruce Lee

let user2 = {
  name: 'Ben'
}
user.WhatIsYourName.call(user2) // Ben
```

* apply 使用数组指定参数

```
let user = {
  greet: 'Hello',
  greetUser: function(userName) {
    console.log(this.greet + ' ' + userName)
  }
}

let greet1 = {
  greet: 'NiHao'
}

user.greetUser.call(greet1, 'Ben') // NiHao Ben
user.greetUser.apply(greet1, ['Ben']) // NiHao Ben
```

* bind 可以为函数绑定this值，然后作为一个新的函数返回

```
let user = {
  greet: 'Hello',
  greetUser: function(userName) {
    console.log(this.greet + ' ' + userName)
  }
}

let greetHaLou = user.greetUser.bind({ greet: 'HaLou' })
let greetNiHao = user.greetUser.bind({ greet: 'NiHao' })
greetHaLou('Tom') // HaLou Tom
greetNiHao('Tom') // NiHao Tom
```

### 打包后的chunk-vendors.xxx.js文件中含有es6语法
* android低版本加载es6语法失败，使用babel-loader转义后依然存在es6

```
module: {
  rules: [{
    test: /\.js$/,
    // loader: 'babel-loader',
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
    exclude: /node_modules/
  }]
}
```

* 使用 transpileDependencies 包含 @pillarjs 后依然存在es6，可以是其他依赖中还是会有es6的写法，
  排查后发现代码中有单独引用element-ui组件，
  `import ElDialog from 'element-ui/packages/dialog'`
  最后加上 element-ui/src
  `transpileDependencies: ['@pillarjs', 'element-ui/src'],`

* transpileDependencies，默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

### h5页面调用
* 引用dsbridge.js
* 注册回调方法

```
dsBridge.register('submit', () => {
  return this.updateOrderStatus()
})
```

* 在回调函数中调用app接口

```
let toastData = "{\n" +
"    \"app_key\":\"UNICLOUD\",\n" +
"    \"version\":\"1.0.1\",\n" +
"    \"data\":{\n" +
"        \"tips\":\"校验格式有误\"\n" +
"    }\n" +
"}\n";
dsBridge.call("UIApi.toast", toastData, function(info) {

})
```

* h5页面容器设置，项目代码中设置了html，body的最小宽度1400px，
  会影响h5页面的宽度，判断如果窗口宽度小于500px时不设置html和
  body的最小宽度。如果项目没有html和body的最小宽度或其他设置，
  h5页面设置宽高100%即可。

```
@media screen and (min-width: 500px) {
  html,
  body {
    min-width: 1400px;
  }
}
```

* vant版本影响组件使用，项目instal vant版本是最新的，表单组件
  使用的是低版本，代码逻辑取值会报错，回退低版本解决。

### require.context
* require.context(directory, useSubdirectories = false, regExp = /^\.\//)
  directory: 要搜索的文件夹目录
  Boolean: 是否搜索子目录
  regExp: 匹配文件的正则表达式
* require.context("./test", false, /\.test\.js$/);
 （创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。

### 字体颜色渐变
```
.description {
  font-size: 18px;
  font-weight: bold;
  background:linear-gradient(0deg,rgba(8,167,249,1) 0%, rgba(183,245,253,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
```

### element.scrollInfoView() 让当前元素滚动到浏览器窗口的可视区域内
#### 参数
> alignToTop Boolean
  true 元素的顶部将和其所在滚动区的可视区域的顶端对齐
  false 元素的底端将和其所在滚动区的可视区域的底端对齐
> scrollInfoViewOptions 包含以下属性的对象
  behavior 定义动画过渡的效果
    auto smooth
  block 定义垂直方向的对齐
    start center end nearest
  inline 定义水平方向的对齐
    start center end nearest

### 本地使用monaco-editor遇到的问题
> vue.config.js添加配置

```
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  transpileDependencies: ['@pillarjs'],
  chainWebpack: config => {
    config
      .plugin('monaco-editor')
      .use(CopyWebpackPlugin, [['node_modules/monaco-editor/min/']]);
  },
};
```

> 引用monaco-editor目录地址

```
Vue.use(MonacoEditor, {
  url: `${location.origin}/vs`
})
```

### 拖拽 改变顺序
> https://github.com/SortableJS/Vue.Draggable

### flex-shrink
> flex-shrink 属性只能是一个 <number>，不为负值，值越大，收缩越大。
> 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，
  其收缩的大小是依据 flex-shrink 的值。

### 根据当前节点的id，查询出所有父级节点
```
export function getParent(data2, nodeId2) {
  let arrRes = [];
  if (data2.length == 0) {
    if (!!nodeId2) {
      arrRes.unshift(data2)
    }
    return arrRes;
  }
  let rev = (data, nodeId) => {
    for (var i = 0, length = data.length; i < length; i++) {
      let node = data[i];
      if (node.id == nodeId) {
        arrRes.unshift(node)
        rev(data2, node.parent_id);
        break;
      } else {
        if (!!node.children) {
          rev(node.children, nodeId);
        }
      }
    }
    return arrRes;
  };
  arrRes = rev(data2, nodeId2);
  return arrRes;
}
```

### window.history 
> history.back() 浏览器后退功能相同
> history.forward() 浏览器向前功能相同
> history.go(n) 接收一个整数作为参数，移动到该整数指定的页面
  go(1) == forward()
  go(-1) == back()
  go(0) 刷新当前页面

### el-autocomplete
```
<el-autocomplete
    v-model="state4"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="((item)=>{handleSelect(item, index)})"
    // 写个闭包就可以了，index表示第几个组件
></el-autocomplete>
```

### vue 如何获取拉回数据后图片的高度
```
<img
  :src="userInfo.profilePicture"
  alt
  class="img-picture"
  v-if="userInfo.profilePicture"
  ref="myImg"
  @load="imageFn"
>
 imageFn() {
  console.log(this.$refs.myImg.offsetHeight);
  console.log(this.$refs.myImg.offsetWidth);
 },
```

### 如何设置body背景色，height:100%,不生效
```
同时设置html，body的高度
html,body{
  height:100%；
} 
或
body{
  height: 100vh; // 代表占屏幕100%
}
```

### 设置input 文本框的 placeholder 的颜色
```
input::-webkit-input-placeholder{
  color:rgba(144,147,153,1);
}
```

### hasOwnProperty 
> 返回一个布尔值，指示对象自身是否具有指定的属性
```
let object = {
  name: ''
}
object.hasOwnProperty('name') // true
object.hasOwnProperty('code') // false
```

### 指定安装element-ui版本
> npm i element-ui@2.6.3

### 本地起生产环境 serve 
> npm i -g serve 全局安装
  启动命令 serve  在dist目录启动

### 审查项目的 webpack 配置
> vue inspect --mode production > production.js
> vue inspect > output.js

### npm 查看和设置源
> npm config get registry
> npm config set registry http://10.0.53.132/artifactory/api/npm/npm/

### filter() 创建一个新数组，
```
let newArray = arr.filter(callback(element, index, array), thisArg)
callback 
  用来测试数组中的每个元素的函数，返回true标识通过测试，并保留该元素。false则不保留
  element 当前正在处理的元素
  index 索引
  array 调用了filter的数组本身
thisArg
  执行callback时，用于this的值
```

### 紫光云npm源配置
> http://10.0.53.147/pages/viewpage.action?pageId=8127733

### 新增菜单 路由 
> baseConfig\src\views\layout\components\Sidebar\index.vue  routerMap
> baseConfig\src\permission.js  pathFnMap

### 左侧菜单完全显示
* 问题现象：菜单展开过多时不能完全显示展开的菜单
```
.el-scrollbar__wrap {
  height: calc(100% - 60px)
}
```

### 调用浏览器打印功能
* window.print()

### font-variant  small-caps 小型大写字母

### text-transform 属性控制文本的大小写 
* capitalize 以大写字母开头
* uppercase 大写
* lowercase 小写
