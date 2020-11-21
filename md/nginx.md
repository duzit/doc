## nginx 配置相关
### 反向代理
1. 正向代理  
* 局域网中用户不能直接访问网络，只能通过代理服务器访问，这种叫正向代理。  
  代理服务器和用户被划为同一个Lan，（user +  proxy server）--> server
2. 反向代理  
* 客户端无法感觉代理，只需要把请求发送到反向代理服务器，由反向代理服务器选择目标服务器获取数据，  
  然后再返回给客户端。反向代理服务器 和 目标服务器 对外就是一个服务器，暴露的是代理服务器的地址，  
  隐藏了真实的服务器IP地址。

### 动静分离
* 将静态页面和动态页面分别交给不同的服务器解析，缓解单个服务器的压力。

### 负载均衡
```conf
upstream tomcatserver1 {  
  server 192.168.72.49:8080 weight=3;  
  server 192.168.72.49:8081;  
}   
  
server {  
  listen       80;  
  server_name  8080.max.com;  
  #charset koi8-r;  
  #access_log  logs/host.access.log  main;  
  location / {  
    proxy_pass   http://tomcatserver1;  
    index  index.html index.htm;  
  }  
} 
```