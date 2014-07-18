/*jshint unused:false */
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var fs = require('fs'); 
var ncp = require('ncp').ncp;

//复制层级限制
ncp.limit = 16;

var copyFile = function (src, dest, root) {
  fs.createReadStream(path.join(root, src)).pipe(fs.createWriteStream(path.join(root, dest)));
}, copyDirectory = function(src, dest, root) {
  ncp(path.join(root, src), path.join(root, dest), function (err) {
    if (err) {
      console.log('There is something wrong when copy file of bower, directory:' + src);
    }
  });
};

var UcpfisGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.pkg = require('../package.json');

    this.on('end', function () {
        this.installDependencies({
          skipInstall: this.options['skip-install'],
          callback: this._injectDependencies.bind(this)
        });
    });
  },
   _injectDependencies: function () {
    //var destRoot = this.destinationRoot();
  },
  askFor: function () {
  
   // have Yeoman greet the user
   console.log(this.yeoman);
   
   var done = this.async();
  // var destRoot = this.destinationRoot();
  // var projectName=path.basename(destRoot);
   var prompts = [{
      name: 'projectName',
      message: 'Project name:',
      type:'input',
      validate:function(input){
          if(!input){
             return false;
          }else{
             return true;
          }
      }
    }, {
      name: 'version',
      message: 'Version(0.0.0)',
      default: '0.0.0',
      type:'input'
    }, {
      name: 'demo',
      message: 'Do you need demo ?(Y/n)',
      default: true,
      type:'confirm'
    }, {
      name: 'play',
      message: 'Is it a play project ?(Y/n)',
      default: true,
      type:'confirm'
    }, {
      name: 'libs',
      message: 'Select Components :',
      type: 'checkbox',
      choices:[
        {
          name:'zepto',
          value:'zepto',
          checked:true
        }, {
          name:'seajs',
          value:'seajs',
          checked:true
        }, {
          name:'ucelf',
          value:'ucelf',
          checked:true
        },{
          name:'jquery',
          value:'jquery',
          checked:false
        }
      ]
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.version = props.version;
      this.demo=props.demo;
      this.play=props.play;
      var libKeys = props.libs;
      for(var i in libKeys){
         if(libKeys[i]){
            this.libs[libKeys[i]]=true;
         }
      }
      done();
    }.bind(this));
  },

  app: function () {

    var projectName=this.projectName;
   
    this.mkdir(projectName);
    
    this.destinationRoot(projectName);

    this.directory('play-project','./');

    var basePath='webapp';

    this.mkdir(basePath);

    this.destinationRoot(basePath);

    this.mkdir('components');

    this.mkdir('libs');

    this.mkdir('views');

    this.template('_package.json', 'package.json');

    this.template('_bower.json', 'bower.json');

    this.template('_fis-conf.js', 'fis-conf.js');
  },
  play:function(){

  },
  components:function(){
     if(this.libs.ucelf){
        this.directory('components/ucelf','components/ucelf');
     }
     if(this.libs.zepto){
        this.directory('components/zepto','components/zepto');
     }
     if(this.demo===true){
         this.copy('components/main.js','components/main.js');
     }
  },
  libs: function () {
     if(this.libs.seajs){
        this.copy('libs/seajs/sea.js','libs/seajs/sea.js');
     }
     if(this.demo===true){
         this.directory('libs/style','libs/style');
     }
  },
  views:function(){
     if(this.demo===true){
        this.directory('views','views');
     }
  },
  runtime: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
  },
  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = UcpfisGenerator;
