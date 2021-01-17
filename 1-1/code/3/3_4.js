const fp=require('lodash/fp')
const {Maybe,Container} = require('./support')
//使用maybe重写ex4，不能有if语句
// let ex4 = function(n){
//     if(n){
//         return parseInt(n);
//     }
// }
let ex4 = function(n){
    return Maybe.of(n)
    .map(value=>n?n:null)//maybe中只判断了null和undefined，增加判断使其更符合之前代码逻辑
    .map(parseInt)
    ._value
}
console.log(ex4())
console.log(ex4(''))
console.log(ex4('6'))
console.log(ex4('a'))