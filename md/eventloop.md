## Event Loop 运行机制
* [参考](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
---

### 为什么 JavaScript 是单线程？
* 提高效率，作为浏览器脚本语言，js的主要用途是与用户交互，以及操作DOM。  
  否则会带来很复杂的同步问题，比如同时有两个线程，线程A在某个DOM上添加内容，线程B在这个DOM上删除内容，浏览器不知道应该以哪个线程为准。
* 为了利用多核CPU的计算能力，HTML5提出了web Worker标准，允许js创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。

### 任务队列
* 同步任务，主线程上排队执行的任务，只有前一个任务执行完毕，才执行下一个任务。
* 异步任务，不进入主线程，而进入任务队列，只有任务队列通知主线程某个异步任务可以执行了，该任务才会进入主线程执行。
* 只要主线程空了，就会读取任务队列。

### 事件和回调函数
* 任务队列是一个事件的队列，IO设备在完成一项任务后，就会在任务队列中添加一个事件，表示相关的异步任务可以进入执行栈了。  
  主线程读取任务就是读取里面的那些事件.
* 任务队列中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（鼠标点击，页面滚动等），只要指定了回调函数，这些事件发生时就会进入任务队列，  
  等待主线程读取。
* 任务队列是先进先出的数据结构。