<h1 align="center">Welcome to shicishuo 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> 一个基于 Vue, Element, Express, MongoDB 和 ElasticSearch 构建的前后端分离的诗词网站

### 🏠 [Demo](https://shicishuo.rqcao.com)


## 客户端

### 目录结构

```$xslt
.
├── README.md
├── babel.config.js
├── dist 打包生成的目录
├── package.json
├── postcss.config.js
├── public
│   ├── beyond.jpg  酷功能里shishuoFM里默认的音乐图片
│   ├── beyond.mp3  酷功能里shishuoFM里默认的音乐文件
│   ├── favicon.ico 网站的图标
│   └── index.html  
├── src
│   ├── App.vue
│   ├── api
│   │   ├── http.js 前端统一请求封装
│   │   └── url.js  请求的url
│   ├── assets  资源文件
│   │   ├── 404.png
│   │   ├── bg1.jpg
│   │   ├── bg2.jpg
│   │   ├── bg404.jpg
│   │   ├── bg5.jpg
│   │   ├── logo.png
│   │   └── mylogo.png
│   ├── common
│   │   ├── js
│   │   │   ├── poemMethods.js  公共方法
│   │   │   └── webcam.js   shishuoFM里的调用摄像头
│   │   └── style
│   │       ├── index.scss  统一的样式
│   │       └── normalize.css
│   ├── components
│   │   ├── CoolExplorationCard.vue 酷功能的每个Card
│   │   ├── Footer.vue  底栏
│   │   ├── HelloWorld.vue
│   │   ├── PoemCard.vue    诗词的Card
│   │   ├── TagButton.vue   标签按钮
│   │   ├── TopBar.vue  顶栏
│   │   └── musicPlayer.vue shishuoFM的播放器组件
│   ├── element-variables.scss  element的一些默认css的修改
│   ├── main.js 
│   ├── plugins
│   │   └── element.js
│   ├── router
│   │   └── index.js    Vue-router
│   ├── store
│   │   └── index.js    Vuex
│   ├── utils
│   │   ├── axios.js    前端封装了axios，设置请求拦截器
│   │   └── websiteConfig.js    一些配置，git上没有，需要自己加上这个文件，后面会说里面的内容
│   └── views
│       ├── About.vue
│       ├── CoolFeature
│       │   ├── FlyingOrder.vue 飞花令页面
│       │   ├── shishuo_fm
│       │   │   └── HomePage.vue    shishuoFM页面
│       │   └── you_draw_i_guess    你画我猜
│       │       ├── Room.vue
│       │       ├── RoomList.vue
│       │       └── YouDrawIGuess.vue
│       ├── Home.vue
│       ├── NotFound.vue    404NotFound
│       ├── Search.vue  搜索页面
│       ├── poem
│       │   ├── CoolExploration.vue 酷功能
│       │   ├── DailyPoem.vue   每日一诗
│       │   ├── ExploreGoodPoetry.vue   探索好诗
│       │   ├── Library.vue 诗词大全
│       │   └── Tag.vue 标签页
│       └── user
│           ├── Login.vue   登录
│           ├── Profile.vue 个人中心
│           └── Register.vue    注册
├── tests
│   └── unit
│       └── example.spec.js
└── yarn.lock
```

### 安装

```sh
git clone git@github.com:imricky/shicishuo.git

cd client

yarn install
```

```sh
添加客户端配置文件

cd src/utils

touch websiteConfig.js
```

```javascript
// websiteConfig.js的内容:

const websiteConfig = {
  apiUrl: 'http://localhost:3000', // 后端的服务地址
  websocketUrl: 'http://localhost:1234', // websocket的地址
};
export default websiteConfig;
```

### 使用

```sh
yarn server

// 会启动localhost:8080端口
```

### 打包

```sh
yarn build
```

## 服务端

### 目录结构

```$xslt
.
├── app.js 
├── bin
│   └── www node的启动文件
├── config
│   ├── db.js   MongoDB数据库配置
│   └── jwtSecret.js    后端的配置文件，git上没有，需要自己添加
├── dao 访问数据库
│   ├── commonDao.js    
│   ├── faceMusicDao.js 
│   ├── poemsDao.js 
│   ├── userDao.js  
│   └── youDrawIGuessDao.js
├── logs    winston日志
│   ├── error-2020-03-02.log
│   ├── exceptions.log
├── models  MongoDB的model
│   ├── commonModel.js
│   ├── faceMusicModel.js
│   ├── poemsModel.js
│   ├── userModel.js
│   └── youDrawIGuessModel.js
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes  相当于controller层
│   ├── faceMusic.js
│   ├── index.js
│   ├── poems.js
│   ├── users.js
│   └── youDrawIGuess.js
├── utils   
│   ├── auth.js 校验中间件
│   ├── elasticsearch.js    启动ElasticSearch
│   ├── handledata.js   处理诗词繁体转简体的独立方法
│   ├── logger.js   日志中间件
│   ├── mongo.js    MongoDB连接
│   ├── socketio.js websocket连接
│   ├── spiderFlyingOrder.js    飞花令的知乎爬虫（独立运行）
│   └── tools.js    公共方法
├── views
│   ├── error.ejs
│   └── index.ejs
└── yarn.lock
```

### 安装

```sh
cd server

yarn install
```


```sh
添加服务端配置文件

cd config/

touch jwtSecret.js
```

```javascript
const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'xxx', // xxx自行替换
  md5: (pwd) => {
    const md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  secretKey: 'xxx',
  sha1Salt: 'xxx',

  faceApiSecretKey: 'xxx', // face++ 的私有秘钥
  elasticUrl: 'http://localhost:9200', // ElasticSearch
  neteaseUrl: 'http://localhost:5000', // 网易云音乐的服务，我部署在5000端口
};
```


### 使用

```sh
npm i -g pm2

pm2 start bin/www --watch  // 会启动localhost:3000端口
```


## MongoDB

### 版本号
```text
MongoDB shell version v4.2.2
```

### 导入数据
MongoDB的文件比较大，没有上传到GitHub上，如果有需要，可以给我发送邮件。我把这些文件传给你
```sh
//mongorestore --db database_name path_to_bson_file


不用先新建数据库，直接命令行输入命令就可以了
mongorestore --db poets databaseBackup/poets
```


## ElasticSearch

### 说明
```text
项目中用到了ElasticSearch做全文检索，所以需要部署Elastic

ElasticSearch我本机使用的是6.2.4 最新版是7.x 有比较大的差距。

如果是你的安装的是6.2.4版本，那么我可以直接使用elasticdump工具直接给你文件（文件比较大，就不放GitHub了），可以给我发邮件

但是你安装的是7.x版本，那么需要自己把MongoDB的数据导入到ElasticSearch中，具体方式可以参考我的一篇博客

再把ElasticSearch起来就可以了。正常启动你会看到控制台打印出 'All is well'。没有正常启动控制台会打印出 'elasticsearch cluster is down!'

只会影响搜索功能的使用
```


## 网易云音乐的Api

### 说明
```text
诗说FM中使用到了网易云音乐的api获取歌曲，所以需要额外部署一个服务
```

### 安装
```text
我使用了这个api ：https://binaryify.github.io/NeteaseCloudMusicApi/#/

下载好了之后我把端口号改为了5000。

pm2 start app.js  就可以启动了
```


## 致谢
这个项目的诞生离不开：
- [Vue](https://cn.vuejs.org/)
- [MongoDB](https://www.mongodb.com/cn)
- [Element](https://element.eleme.cn/#/zh-CN)
- [ElasticSearch](https://www.elastic.co/cn/)
- [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/)
- [Vue-Socket.io](https://github.com/MetinSeylan/Vue-Socket.io)
- [ChatRoom](https://github.com/BothEyes1993/ChatRoom)
- [小专栏](https://xiaozhuanlan.com/)
- [Webcam.js](https://github.com/jhuckaby/webcamjs)
- [stackoverflow](https://stackoverflow.com/)


## 作者

👤 **imricky**

* Website: https://rqcao.com
* Github: [@imricky](https://github.com/imricky)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/imricky/shicishuo/issues). 

## Show your support

如果你觉得本项目对你有帮助，请给一个⭐~

***
如果有任何问题，欢迎给我发邮件。
如果想在服务器上部署，请参考我博客里的文章。

