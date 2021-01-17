#!/usr/bin/env node

//必须的文件头，Linux或macOS系统还得修改文件读写权限为755

const path=require('path')
const fs=require('fs')

//安装渲染文件引擎yarn add ejs
const ejs=require('ejs')

const tmplDir=path.join(__dirname,'templates')
const destDir=process.cwd()

function outputFile(inputPath,outputPath){
    ejs.renderFile(inputPath,(err,rl)=>{
        if(err) throw err
        //输出文件
        fs.writeFileSync(outputPath,rl)
    })
}
function readFile(tmplDir,destDir){
    fs.readdir(tmplDir,(err,files)=>{
        if(err) throw err
        files.forEach(file=>{
            const inputPath=path.join(tmplDir,file);
            const outputPath=path.join(destDir,file);
            const isDir=fs.lstatSync(inputPath).isDirectory();//判断是否是文件夹
            if(isDir){
                //是文件夹则创建文件夹并按新文件夹读取文件
                fs.mkdir(outputPath,()=>{
                    readFile(inputPath,outputPath)
                });
            }else{
                //是文件则直接输出
                outputFile(inputPath,outputPath);
            }
        })
    })
}

readFile(tmplDir,destDir)
