//gulp入口文件


//基础任务
//基础任务调用 yarn gulp foo
exports.foo=(done)=>{
    console.log('foo task')
    done()//标识任务完成
}
//默认任务调用 yarn gulp
exports.default=(done)=>{
    console.log('default task')
    done()//标识任务完成
}

//gulp 4.0以前的基础任务调用 yarn gulp bar
const gulp = require('gulp')
gulp.task('bar',(done)=>{
    console.log('bar task')
    done()//标识任务完成
})



//组合任务
const {series,parallel} = require('gulp')
const task1=(done)=>{
    setTimeout(()=>{
        console.log('task1 working~')
        done()
    },1000)
}

const task2=(done)=>{
    setTimeout(()=>{
        console.log('task2 working~')
        done()
    },1000)
}

const task3=(done)=>{
    setTimeout(()=>{
        console.log('task3 working~')
        done()
    },1000)
}
//组合任务之串行
exports.cfoo=series(task1,task2,task3)
//组合任务之并行
exports.bfoo=parallel(task1,task2,task3)


//异步任务
//1、普通方式
exports.callback=(done)=>{
    console.log('callback task')
    done()
}
//错误处理
exports.callback_error=(done)=>{
    console.log('callback task')
    done(new Error('task error!'))
}
//2、promise方式
exports.promise=(done)=>{
    console.log('promise task')
    return Promise.resolve()
}
//promise error
exports.promise_error=(done)=>{
    console.log('promise task')
    return Promise.reject(new Error('promise task error'))
}
//3、async await方式
const timeout=(time)=>{
    return new Promise((rs)=>{
        setTimeout(rs,time)
    })
}
exports.async=async ()=>{
    await timeout(1000);
    console.log('async task')
}
//4、流stream方式
const fs=require('fs')
exports.stream=()=>{
    const readStream=fs.createReadStream('package.json')
    const writeStream=fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    return readStream
}
// exports.stream=(done)=>{
//     const readStream=fs.createReadStream('package.json')
//     const writeStream=fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream)
//     readStream.on('end',()=>{
//         done()
//     })
// }