const {compose,curry} = require('folktale/core/lambda')
const {toUpper,first} = require('lodash/fp')

//第一个参数是传入函数的参数个数
let f = curry(2,function(x,y){
    console.log(x+y)
})
f(3,4)
f(3)(4)

//函数组合
let f2 = compose(toUpper,first)
console.log(f2(['one','two','three']))