const _ = require('lodash');
const array = [1,2,3,4,5];

console.log(array);
console.log(_.reverse(array));


function getArea(r){
    console.log(r);
    return Math.PI*r*r;
}

// let getAreaTemp=_.memoize(getArea)
// console.log(getAreaTemp(4));
// console.log(getAreaTemp(4));
// console.log(getAreaTemp(4));
// console.log(getAreaTemp(4));

function memoize(fn){
    let cache={};
    return function(){
        let key=JSON.stringify(arguments);
        cache[key] = cache[key] || fn.apply(this,arguments);
        return cache[key];
    }
}

let getAreaTemp=memoize(getArea)
console.log(getAreaTemp(4));
console.log(getAreaTemp(4));
console.log(getAreaTemp(4));
console.log(getAreaTemp(4));



//普通函数
function checkAge(min,age){
    return age>min;
}
console.log(checkAge(18,16));
console.log(checkAge(18,22));
console.log(checkAge(20,24));
//柯里化函数--使用了闭包
// function checkAgeKl(min){
// return function(age){
// return age>min;
// }
// }
var checkAgeKl=min=>(age=>age>min)
var checkAge18=checkAgeKl(18);
var checkAge20=checkAgeKl(20);
console.log(checkAge18(16));
console.log(checkAge18(22));
console.log(checkAge20(24));


const match=_.curry((reg,str)=>str.match(reg));
const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

console.log(haveSpace('hello Wolrd'),haveSpace('helloWolrd'));
console.log(haveNumber('hello Wolrd'),haveSpace('hello Wolrd,2020'));

const filter = _.curry((fn,arr)=>arr.filter(fn));
const findSpace = filter(haveSpace);
const findNumber = filter(haveNumber);

let ary1=['a','b','hello world'];
let ary2=['helloworld,2020'];

console.log(findSpace(ary1),findSpace(ary2))
console.log(findNumber(ary1),findNumber(ary2))


//组合函数结合柯里化
const trace = _.curry((tag,v)=>{
console.log(tag,v);
return v;
})

const split = _.curry((sep,str)=>_.split(str,sep))

const map = _.curry((fn,array)=>_.map(array,fn))

const join = _.curry((sep,array)=>_.join(array,sep))

const f = _.flowRight(join('-'),trace('map后'),map(_.toLower),trace('split后'),split(' '))

console.log(f('DONT SAY DIE'));
