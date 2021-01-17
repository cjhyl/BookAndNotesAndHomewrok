class Container {
    //pointed函子，用于封装函数上下文
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value=value;
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}
let r = Container.of(5).map(x=>x+1)
console.log(new Container(5))
console.log(r);