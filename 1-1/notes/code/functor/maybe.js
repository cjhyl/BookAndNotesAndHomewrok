class Maybe {
    static of(value){
        return new Maybe(value)
    }
    constructor(value){
        this._value=value;
    }
    map(fn){
        return this.isNothing()?Maybe.of(null):Maybe.of(fn(this._value))
    }
    isNothing(){
        return this._value===null||this._value===undefined
    }
}
let r = Maybe.of(null).map(x=>x+1)
console.log(r);