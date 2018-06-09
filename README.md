# danmaku_simplify
### 简易弹幕服务器及播放器
### 文件目录
middleware --接受发送消息模块
task --逻辑处理模块

### 主要功能
接受模块收到消息后 写redis队列 后端逻辑模块从redis队列里面取出 然后发送给发送模块

### 运行步骤
1.npm install
2.本地打开redis-server
3.运行app.js文件,运行sclient.js
    npm run start
    npm run sclient
4.安装资源
    bower install
5.在浏览器里访问http://127.0.0.1:3000/
6.选择命名空间房间看效果



### tip
1.redis 启动到后台
```
cd /etc/redis
redis-server /etc/redis/redis.conf
-----
cd /usr/local/etc/
redis-server /usr/local/etc/redis.conf
```



### 弹幕播放器
收发消息效果和 http://127.0.0.1:3000/chats/live/1#/  下相同