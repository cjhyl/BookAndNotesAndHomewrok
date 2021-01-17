// module.exports={
//     foo:'123456'
// }

//不能在commonjs中通过require载入es module
// const mod = require('./esm.mjs')
// console.log(mod)


//加载模块函数
console.log(require)

//模块对象
console.log(module)

//导出对象别名
console.log(exports)

//当前文件绝对路径
console.log(__filename)

//当前文件目录
console.log(__dirname)
