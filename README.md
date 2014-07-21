
> [Yeoman](http://yeoman.io) generator

![](http://i.imgur.com/JHaAlBJ.png)

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
├─app
│  ├─controllers
│  └─views
│      ├─errors
│      └─index
├─conf
├─lib
├─public
│  ├─components
│  │  ├─style
│  │  │  └─icons
│  │  ├─ucelf
│  │  └─zepto
│  └─libs
│      └─seajs
└─webapp
    ├─components
    │  └─style
    │      └─icons
    ├─component_modules
    │  ├─ucelf
    │  └─zepto
    ├─libs
    │  └─seajs
    └─views
        ├─errors
        └─index
```
目录结构与说明：

``app``:
* ``app/controller``：存放play的controller文件
* ``app/views``：存放play的模板文件

``conf``:存放play的模板文件

``lib``:存放play的jar库

``public``:存放fis release后的前端组件

``webapp``:
* ``webapp/component_modules目录``： 存放公共的组件仓库，来自另一个仓库，``非当前项目代码``。
* ``webapp/components目录``： 存放当前项目组件
* ``webapp/views目录``：存放play模板源文件
* ``webapp/libs``：存放非模块化js文件
* ``webapp/package.json``：nodejs后端所需要的依赖描述文件，即npm的 [package.json](https://www.npmjs.org/doc/files/package.json.html) 文件
* ``webapp/fis-conf.js``：fis工具的配置文件，可指定项目名、项目版本、模块别名等构建信息

## 模块化开发[尚未支持]

* 模块目录
    * ``components`` 和 ``component_modules`` 目录下的文件文件均为模块化文件，不要将 ``非模块化`` 资源（主要是js）放到这些目录下
    * ``component_modules`` 目录下的模块可遵从 [component](https://github.com/component/component) 规范，提供 ``component.json`` 描述文件，component.json中的name属性为模块的别名。模块的存放规则为： ``component_modules/{模块名}/{模块版本}/**``
    * ``comopnents`` 目录下的模块为项目模块，无需服从component规范，文件存放规则为： ``component/{模块名}/**``。
* 模块id与别名（alias）
    * 每个js或css文件都有一个 ``完整id``
        * component_modules中文件的完整id形如：``component_modules/zepto/{版本号}/zepto.js``
        * components中文件的完整id形如：``{项目名}/{项目版本}/detail/detail.js``
    * 部分文件有别名
        * component_modules中的模块，如果有 ``component.json`` 描述文件，则component.json中main字段规定的文件，其别名为name字段的值
        * components中，如果文件名和目录同名，则将目录名作为别名记录

## 工具说明

###开发步骤

* 如果没有安装FIS，先安装FIS:
``` 
npm install -g fis
```
* play run 或 start 运行项目

* 运行fis-debug.bat打包前端文件

###fis-debug.bat说明
```
cd webapp
call fis release -d play -w
cd ..
```
表示打包但不压缩并把域名输出到doploy.play配置的目录下,开启watch模式，监听文件更改

###fis-pack.bat说明
```
cd webapp
call fis release -ompd play
cd ..
```
表示打包压缩，更改域名并对文件md5重命名到doploy.play配置的目录下

###fis-conf.js说明

```
/**配置静态资源的目录地址**/
var _DOMAIN='http://localhost:9000/public';

......

/**配置release输出的路径**/
fis.config.merge({
    deploy:{
       local:{
          to:'./local'
       },
       play:{
          to:'../'
       }
    }
});

```



## fis常用命令

### fis release [options]

release是一个非常强大的命令，它的主要任务就是进行代码的 编译 与 部署，它的参数囊括了前端开发所需的各种基础功能：

1. 添加 --watch 或 -w 参数，支持对项目进行增量编译，监听文件变化再触发编译

2. 添加 --live 或 -L 参数，支持编译后自动刷新浏览器。Liveload功能需要浏览器支持Web Socket功能，例如Chrome、Firefox、Safari等浏览器。

3. 添加 --dest [path|name] 或 -d 参数，来指定编译后的代码部署路径，支持发布到 本地目录、本地调试服务器目录、远程机器目录(需要配置)，它与--watch参数配合使用，可以让你的代码保存就上传！而且--dest值支持逗号分隔，这也就意味着，你 一次编译可以同时发布到本地以及多台远程机器上！

4. 添加 --md5 [level] 或 -m [level] 参数，在编译的时候可以对文件自动加md5戳，从此告别在静态资源url后面写?version=xxx的时代

5. 添加 --lint 或 -l 参数，支持在编译的时候根据项目配置自动代码检查

6. 添加 --test 或 -t 参数，支持在编译的时候对代码进行自动化测试

7. 添加 --pack 或 -p 参数，对产出文件根据项目配置进行打包

8. 添加 --optimize 或 -o 参数，对js、css、html进行压缩

9. 添加 --domains 或 -D 参数，为资源添加domain域名

详细文档:[http://fis.baidu.com/docs/beginning/getting-started.html](http://fis.baidu.com/docs/beginning/getting-started.html)


## License

MIT
