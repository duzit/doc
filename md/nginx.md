## nginx 配置相关
------
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