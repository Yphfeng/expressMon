# N-Blog

## 网站的技术结构
* nodejs(express) + mongodb

## 运行说明
  1. npm install -g node-dev 安装node-dev,方便开发
  2. 在src/config 目录下新建 admin.js，在登陆后台时会用到
      ```
        module.exports = {
          name : 'xxx',
          pwd: 'xxxxxxx'
        }
      ```
  3. 安装mongodb，并启动
  4. npm start启动项目

## 网站的几个基础功能：

  * 博客功能
    * 后台文章发布
    * 前台文章倒叙展示，limit 15
    * 前台文章分类：类别，每个类别下的列表

## 效果展示
  * 博客首页
  - ![](./public/img/readme0.png)


## 想说的话
   这是一个纯技术性的个人博客，旨在学习nodejs，提高自己的综合能力
