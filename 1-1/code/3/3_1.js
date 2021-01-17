const fp=require('lodash/fp')
const {Maybe,Container} = require('./support')
let maybe = Maybe.of([5,6,1])
//使用fp.add(x,y)和fp.map(f,x)创建一个能让函子里的指增加的函数ex1
let ex1=(addNum)=>{
    return maybe.map(fp.map(fp.add(addNum)))
}
console.log(ex1(5)._value);