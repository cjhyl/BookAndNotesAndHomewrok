//处理IO函子的问题。
const fs=require('fs')
const fp=require('lodash/fp')

class IO{
    static of(value){
        return new IO(function(){
            return value
        })
    }
    constructor(fn){
        this._value=fn;
    }
    join(){
        return this._value()
    }
    flatMap(fn){
        return this.map(fn).join()
    }
    map(fn){
        //把当前value和传入fn组合成一个新函数
        return new IO(fp.flowRight(fn,this._value))
    }
}

let readFile = function(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8')
    })
}

let print = function(x){
    return new IO(function(){
        console.log(x);
        return x;
    })
}

let r = readFile('package.json')
    .map(fp.toUpper)
    .flatMap(print)
    .join();
console.log(r);