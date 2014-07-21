 /*global fis */ 
fis.config.set('static','');
fis.config.set('app','/app');
var _DOMAIN='http://localhost:9000/public';

fis.config.merge({
    roadmap : {
        domain:_DOMAIN,
        path : [
		    {
			   reg : /^\/views\/(.*)$/i,
               id:'$1',
               release: '../${app}/views/$1'
			},
             {
               reg : /^\/libs\/(.*)$/i,
               id:'$1',
               release: '${static}/libs/$1'
             },
            /*{
                //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/(component_modules|components)\/([^\/]+)\/(\1\.(js|less|css))$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id为文件夹名
                id : '$2',
                release : '${static}/components/$2/$3'
            },*/
            {
                //modules目录下的其他文件
                reg : /^\/(component_modules|components)\/(.*)\.(js|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id是去掉modules和.js后缀中间的部分
                id : '$2',
                release : '${static}/components/$2.$3'
            },
            {
                //.mixin.less后缀的文件
                reg : /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release : false
            },
            {
                //其他js、css、less文件
                reg : /\.(js|css|less)$/,
                //less和css文件会做csssprite处理
                useSprite : true,
                //不要放到js资源表里
                useMap : false
            },
            {
                //readme文件，不要发布
                reg : /\/readme.md$/i,
                release : false
            },
            {
                //前端模板
                reg : '**.tmpl',
                //当做类html文件处理，可以识别<img src="xxx"/>等资源定位标识
                isHtmlLike : true,
                //只是内嵌，不用发布
                release : false
            },
            {
                //map.json没什么用，就不要发布了
                reg : /(map|bower|package).json/,
                release : false
            }
        ],
        ext : {
            //less输出为css文件
            less : 'css'
        }
    },
    modules : {//fis插件配置
        parser : {
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl : 'utc',
            //.less后缀的文件使用fis-parser-less插件编译
            less : 'less'
        },
        lint : {
            js : 'jshint'
        },
       // postpackager : 'seajs'
        postpackager : 'simple'
    },
    settings : {
        
        lint : {
            jshint : {
                //排除对lib和jquery、backbone、underscore的检查
                ignored : [ 'libs/**', /jquery|backbone|underscore/i ],
                //使用中文报错
                i18n : 'zh-CN'
            }
        },
        postprocessor : {
            jswrapper : {
                //用fis的js包装器，更方便书写
                type : 'amd'
            }
        },
        optimizer : {
            'uglify-js' : {
                mangle : {
                    //不要压缩require关键字，否则seajs会识别不了require
                    except : [ 'require' ]
                }
            }
        }
    }

});
fis.config.merge({
    deploy:{
       local:{
          to:'./local/public'
       },
       play:{
          to:'../public'
       }
    }
});

fis.config.set('settings.postpackager.simple.autoCombine', true);
