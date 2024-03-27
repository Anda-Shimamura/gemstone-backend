# gemstone

一款基于Vue3，Node.js设计的网页小游戏，游戏玩法是通过购买宝石赚取利润，通过提示进行逻辑推理，投资收益期望更高的宝石以赚取更多金币。游戏提供了用户注册与登录、查看交易详情、用户排名等功能。  

本项目包含后端部分，如您需要查阅前端部分，请参阅gemstone仓库  

测试服务器ip地址为192.168.0.102，如您需要请修改。  

## 文件介绍：

### index.js:  

  后端所有逻辑代码，完成前端注册、登录、投资的请求响应，并管理数据库 
  
### RandomAPI.js  

  接口模块，生成随机数返回给前端  
    
### models/user.js 

  规定mongoDB中user集合存储数据的类型  

### db/db.js  

  执行mongoDB连接后一次完整回调的模块  

### config/config.js 

  规定mongoDB连接ip和端口号以及数据库名称
  
## 使用技术栈：

前端：Javascript(ES6), Vue3, Axios  

后端：Node.js, Express, Mongo, Mongoose  


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
node index.js
```


