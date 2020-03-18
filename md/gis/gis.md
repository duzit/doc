## gis 调试问题总结

### 需求
* 地图上显示图标。  
  根据数据不同状态显示不同图标，其中一种图标为动图效果  
  鼠标悬浮时图标有变化  
* 鼠标悬浮在图标上时有弹窗显示当前位置的信息。  
* 有两种类型的图标，点击按钮切换不同类型时，图标切换，且数据有更新。

### 参考(建议先看一遍)
* longyaoMap.vue 实际项目中gis文件
* lyx.html gis同学提供的demo

### 几个点
#### 图片资源引用
* 目前不支持本地相对路径引用，如1.png放在'./img/1.png'，  
  引用时src不能这样写： src: './img/1.png'。  
  支持base64和服务器地址方式，例如：  
  src: 'https://gis.unicloud.com/xiaoqu/lyx/1.png'   
  或者使用require()，例如：  

  ```
  let imgSrc = require('./img/1.png')
  src: imgSrc 

  ```

#### 动图效果实现（非gif）
* 需UI提供多帧图片，一般5-6帧，可参考./air.png。  
  实现方法参考./lyx.html或者longyaoMap.vue中的 airFlashStyles 的使用  
* 使用gif遇到的问题  
  gif一般有杂边，效果不是很好  
  git会影响弹窗的显示，有可能会在弹窗的上层，有遮罩

#### 根据不同状态显示不同图片
* gis封装方法 addVectorLayerFromGeojson 可注册回调函数，  
  longyaoMap.vue 中为 pointStyleFunction()，该函数中可根据属性值区分加载图片

#### 鼠标悬浮图片时更新图片
* gis提供hover事件注册回调方法 addMapHoverEvent()，style 属性为hover时改变图片样式的回调，  
  参考 longyaoMap.vue 中 pointBigStyleFunction()  

#### 鼠标悬浮图片时弹窗实现
* gis提供hover事件注册回调方法 addMapHoverEvent()， callbackFunction 属性为hover时回调，  
  可在该回调中添加弹窗，参考 longyaoMap.vue 中 popWindowPoll()，可自定义弹窗样式。  

#### 点击事件切换图片
* 因需求中有两种不同类型的图片，空气站和排污企业，每一类中有3个不同状态的图片。  
  在切换空气站和排污企业时，需切换不同类型的图片。gis给出的实现方法是，注册两个图层，  
  在响应事件中切换不同的图层。  
  longyaoMap.vue 中会发现有两个 addVectorLayerFromGeojson() 和 addMapHoverEvent()，  
  实际是注册了两个图层。默认显示某一个图层而隐藏另一个，然后在切换事件中转换。 

#### 刷新数据
* 参考 longyaoMap.vue 或者 lyx.html 中 refreshSource()方法

### tips
* 地图模拟数据， x（经度）， y（纬度） 值必须为数字，不能是字符串，且不能为空（null， undefined等），且 y 不能大于 90。
```
var pointData = [
  {"x":114.606529,"y":37.400788,"name":'scott',"temperature":36.5,"type":"air1"},
  {"x":114.606529,"y":37.340788,"name":'bill',"temperature":36.8,"type":"air"},
];
```

* longyaoMap.vue 中有两个变量 boundStyle ， layerStyleXZQ 的数据写在了./lymap.js