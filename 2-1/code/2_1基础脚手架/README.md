一、使用方法
1、安装 yarn
2、link指令 yarn link
3、执行指令 basecli



二、开发流程
（一）、先按照 "脚手架的工作原理" 教程操作：
1、yarn init初始化package.json
2、添加cli.js文件
3、添加#!/usr/bin/env node文件头
4、安装ejs插件，未安装inquirer询问插件
5、按照教程添加对模板文件的读取输出操作

（二）、遇到了教程中代码没有遇到的问题--"对于子文件夹读取的错误"，解决流程如下：
1、查找资料，找到了fs判断、创建文件夹的方法
//const isDir=fs.lstatSync(inputPath).isDirectory();//判断是否是文件夹
//fs.mkdir(outputPath,()=>{});//创建文件夹
2、整理逻辑，把读取和输出流程封装成两个函数，在读取函数中，判断是否文件夹，是则根据新目录递归执行读取函数，否则输出文件。
3、最后把模板中的目录、文件都正确输出了。
