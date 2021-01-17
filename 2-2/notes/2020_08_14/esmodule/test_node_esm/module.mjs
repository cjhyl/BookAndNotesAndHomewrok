var name = 'foo module'

function hello(){
    console.log('hello')
}
// 1、export和import后面跟的花括号是固定格式，导出不是对象字面量，导入也不是对象解构，可以用as重命名，但不能用解构重命名方式
// export default后面的花括号才是对象字面量
// 2、导出的是变量的引用地址，
// 3、导出后的变量是只读的，不能修改
// export {
//     name,
//     hello as fooHello
// }

export default {
    name,
    hello
}