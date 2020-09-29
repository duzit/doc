### session
* 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
* 在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookies 的运行方式不同。
* 打开多个相同的URL的Tabs页面，会创建各自的sessionStorage。
* 关闭对应浏览器tab，会清除对应的sessionStorage。
