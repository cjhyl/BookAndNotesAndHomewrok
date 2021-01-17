const _ = require('lodash');
const fp = require('lodash/fp');
//数据
/*
 * horsepower 马力
 * dollar_value 价格
 * in_stock 库存
 */
const cars = [{
    name:'Ferrari FF',
    horsepower:660,
    dollar_value:700000,
    in_stock:true
},{
    name:'Spyker C12 Zagato',
    horsepower:650,
    dollar_value:648000,
    in_stock:false
},{
    name:'Jaguar XKR-S',
    horsepower:550,
    dollar_value:132000,
    in_stock:false
},{
    name:'Audi R8',
    horsepower:525,
    dollar_value:114200,
    in_stock:false
},{
    name:'Aston Martin One-77',
    horsepower:750,
    dollar_value:1850000,
    in_stock:true
},{
    name:'Pagani Huayra',
    horsepower:700,
    dollar_value:1300000,
    in_stock:false
}]
let _underscore=fp.replace(/\W+/g,'_')//<-无需改动
//使用函数组合方式实现
let sanitizeNames=fp.map(fp.flowRight(_underscore,fp.prop('name')))

//返回新名称数组
console.log(sanitizeNames(cars))