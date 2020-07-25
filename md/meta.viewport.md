## meta viewport 
---
### viewport 概念
* 移动设备上，viewport 是浏览器（app的webview）用来显示网页的那一部分区域。
* 考虑到移动设备的分辨率相对于桌面电脑来说都比较小，为了能在移动设备上显示传统的左面浏览器设计的网站，  
  移动设备的浏览器都会把 viewport 默认设为较大的值（980px 或 1024px ）。但带来的后果就是浏览器会出现横向滚动条。  
  因为浏览器可视区域的宽度是比这个默认的 viewport 的宽度要小的。
### 三个 viewport 理论
* layout viewport 浏览器默认的，宽度大于浏览器可视区域的宽度，可以通过 document.documentElement.clientWidth 获取
* visual viewport 浏览器可视区域，可通过 window.innerWidth 获取
* ideal viewport 不同设备拥有不同的 ideal viewport。例如 iPhone 的是 320px，那么 css 中 320px 就代表 iPhone 屏幕的宽度
### 利用 meta 标签对 viewport 进行控制
* 移动设备默认的 viewport 是 layout viewport ，开发需要是 ideal viewport ，通过以下转换
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
