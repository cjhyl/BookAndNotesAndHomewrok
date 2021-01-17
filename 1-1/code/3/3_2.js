const fp=require('lodash/fp')
const {Maybe,Container} = require('./support')
let xs=Container.of(['do','ray','me','fa','so','la','ti','do'])
//实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let ex2=()=>{
    return xs.map(fp.first)
}
console.log(ex2()._value);