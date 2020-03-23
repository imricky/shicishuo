<h1 align="center">Welcome to shicishuo 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A poem website based on Vue, Element, Express, MongoDB and ElasticSearch

### 🏠 [Demo](https://shicishuo.rqcao.com)

### 🚀 [中文文档](https://github.com/imricky/shicishuo/blob/master/README_zh.md)


## Client

### Directory Structure

```$xslt
.
├── README.md
├── babel.config.js
├── dist 
├── package.json
├── postcss.config.js
├── public
│   ├── beyond.jpg  
│   ├── beyond.mp3  
│   ├── favicon.ico 
│   └── index.html  
├── src
│   ├── App.vue
│   ├── api
│   │   ├── http.js 
│   │   └── url.js  
│   ├── assets  
│   │   ├── 404.png
│   │   ├── bg1.jpg
│   │   ├── bg2.jpg
│   │   ├── bg404.jpg
│   │   ├── bg5.jpg
│   │   ├── logo.png
│   │   └── mylogo.png
│   ├── common
│   │   ├── js
│   │   │   ├── poemMethods.js  
│   │   │   └── webcam.js   
│   │   └── style
│   │       ├── index.scss  
│   │       └── normalize.css
│   ├── components
│   │   ├── CoolExplorationCard.vue 
│   │   ├── Footer.vue  
│   │   ├── HelloWorld.vue
│   │   ├── PoemCard.vue    
│   │   ├── TagButton.vue   
│   │   ├── TopBar.vue  
│   │   └── musicPlayer.vue 
│   ├── element-variables.scss  
│   ├── main.js 
│   ├── plugins
│   │   └── element.js
│   ├── router
│   │   └── index.js    
│   ├── store
│   │   └── index.js    
│   ├── utils
│   │   ├── axios.js    
│   │   └── websiteConfig.js    
│   └── views
│       ├── About.vue
│       ├── CoolFeature
│       │   ├── FlyingOrder.vue 
│       │   ├── shishuo_fm
│       │   │   └── HomePage.vue    
│       │   └── you_draw_i_guess    
│       │       ├── Room.vue
│       │       ├── RoomList.vue
│       │       └── YouDrawIGuess.vue
│       ├── Home.vue
│       ├── NotFound.vue    
│       ├── Search.vue  
│       ├── poem
│       │   ├── CoolExploration.vue 
│       │   ├── DailyPoem.vue   
│       │   ├── ExploreGoodPoetry.vue   
│       │   ├── Library.vue 
│       │   └── Tag.vue 
│       └── user
│           ├── Login.vue   
│           ├── Profile.vue 
│           └── Register.vue    
├── tests
│   └── unit
│       └── example.spec.js
└── yarn.lock
```

### Install

```sh
git clone git@github.com:imricky/shicishuo.git

cd client

yarn install
```

```sh
Add client profile

cd src/utils

touch websiteConfig.js
```

```javascript
const websiteConfig = {
  apiUrl: 'http://localhost:3000', // NodeJS Service Address
  websocketUrl: 'http://localhost:1234', // websocket Service Address
};
export default websiteConfig;
```

### Usage

```sh
yarn server

// It will start the localhost:8080 port
```

### Package

```sh
yarn build
```

## Server

### Directory Structure

```$xslt
.
├── app.js 
├── bin
│   └── www 
├── config
│   ├── db.js   
│   └── jwtSecret.js    There is no backend configuration file on GIT. You need to add it yourself
├── dao 
│   ├── commonDao.js    
│   ├── faceMusicDao.js 
│   ├── poemsDao.js 
│   ├── userDao.js  
│   └── youDrawIGuessDao.js
├── logs    
│   ├── error-2020-03-02.log
│   ├── exceptions.log
├── models  
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
├── routes  
│   ├── faceMusic.js
│   ├── index.js
│   ├── poems.js
│   ├── users.js
│   └── youDrawIGuess.js
├── utils   
│   ├── auth.js 
│   ├── elasticsearch.js    
│   ├── handledata.js   
│   ├── logger.js   
│   ├── mongo.js    
│   ├── socketio.js 
│   ├── spiderFlyingOrder.js    
│   └── tools.js    
├── views
│   ├── error.ejs
│   └── index.ejs
└── yarn.lock
```

### Install

```sh
cd server

yarn install
```


```sh
Add server profile

cd config/

touch jwtSecret.js
```

```javascript
const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'xxx', 
  md5: (pwd) => {
    const md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  secretKey: 'xxx',
  sha1Salt: 'xxx',

  faceApiSecretKey: 'xxx', // face++ Secret key
  elasticUrl: 'http://localhost:9200', // ElasticSearch
  neteaseUrl: 'http://localhost:5000', // Service of Netease cloud music，I deploy on port 5000.
  baseImageUrl: 'http://localhost:3000/image/', // static image 
};
```


### Usage

```sh
npm i -g pm2

pm2 start bin/www --watch  // It will start the localhost:3000 port
```


## MongoDB

### Version
```text
MongoDB shell version v4.2.2
```

### Import Data

```sh
MongoDB files are relatively large, I don't put it on GitHub. 

If you need the files, Please email me.


//mongorestore --db database_name path_to_bson_file
//You don't need to create a new database first, just enter the command at the command line
mongorestore --db poets databaseBackup/poets
```


## ElasticSearch

### Tips
```text
Elasticsearch is used in the project for full-text retrieval, so you need to deploy elasticsearch, The latest version is 7.x, but I use 6.2.4 which has a big gap.

If your installation is version 6.2.4, I can directly use the elasticdump tool to directly send you files (The files are relatively large, I don't put it on GitHub), you can send email to me to receive the files

But if you are installing version 7.x, you need to import mongodb data into elasticsearch. Please refer to one of my blogs for details

On normal startup, you will see the console print out 'all is well'. If the console is not started normally, 'elasticsearch cluster is down!' will be printed out

It only affect the use of search function
```


## Netease Api(music)

### Install
```sh
https://binaryify.github.io/NeteaseCloudMusicApi/#/
```


## TODO:
- [ ] 找回密码
- [ ] 个人设置页面，重置密码，设置个性签名和头像
- [ ] 诗词注释功能
- [ ] 诗词可视化
- [ ] 移除收藏
- [ ] 我的创作列表
- [ ] 创作中心
- [ ] 创作点赞按钮和统计


## Thanks
- [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)
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



## Author

👤 **imricky**

* Website: https://rqcao.com
* Github: [@imricky](https://github.com/imricky)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/imricky/shicishuo/issues). 

## Show your support

Give a ⭐️ if this project helped you!


***
🔔 If you have any questions, please email me！

