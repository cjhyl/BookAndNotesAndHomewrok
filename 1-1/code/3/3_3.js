const fp=require('lodash/fp')
const {Maybe,Container} = require('./support')
let safeProp=fp.curry(function(x,o){
    return Maybe.of(o[x]);
})
let user = {id:2,name:'Albert'};
//使用safeProp和fp.first获取用户名称的首字母
let ex3 = (obj)=>{
    return fp.first(safeProp('name')(obj)._value)
}
console.log(ex3(user));