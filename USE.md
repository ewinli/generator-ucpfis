

## 简介

是基于Yeoman实现的一个generator，是一个创建webapp项目的前端框架。框架中主要包含play framework 1.2的项目结构和基于fis前端目录。

后端使用play框架进行开发，前端基于fis实现工作流程与打包流程。

##使用方法
###1.安装yo

```bash
$ npm install -g yo
```

####2.安装generator
```bash
$ npm install -g generator-ucpfis
```

####3.使用

```bash
$ yo ucpfis
```

##目录结构说明

```
-->app //play 项目的app目录
---->controllers //存放controller代码
---->views //存放页面模板代码

-->conf //存放play的配置文件

-->lib //存在play的jar库

-->public //存放fis打包编译后的代码

-->webapp //存放前端js,css,html模板等代码
---->components
---->libs
---->views


->fis-debug.bat
->fis-pack.bat
```



## License

MIT
