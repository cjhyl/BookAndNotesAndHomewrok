#!/usr/bin/env node

//必须的文件头，Linux或macOS系统还得修改文件读写权限为755


//发起命令询问yarn add inquirer安装模块
const inquirer = require('inquirer');

const path=require('path')
const fs=require('fs')

//安装渲染文件引擎yarn add ejs
const ejs=require('ejs')

inquirer.prompt([
    {
        type:"input",
        name:"name",
        message:"project name?"
    }
])
.then(answers=>{
    const tmplDir=path.join(__dirname,'templates')
    const destDir=process.cwd()
    fs.readdir(tmplDir,(err,files)=>{
        if(err) throw err
        files.forEach(file=>{
            ejs.renderFile(path.join(tmplDir,file),answers,(err,rl)=>{
                if(err) throw err
                //输出文件
                fs.writeFileSync(path.join(destDir,file),rl)
            })
        })
    })
})