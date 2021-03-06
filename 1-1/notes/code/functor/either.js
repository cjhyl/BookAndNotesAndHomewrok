class Left {
    static of(value){
        return new Left(value)
    }
    constructor(value){
        this._value=value;
    }
    map(fn){
        return this
    }
}
class Right {
    static of(value){
        return new Right(value)
    }
    constructor(value){
        this._value=value;
    }
    map(fn){
        return Right.of(fn(this._value))
    }
}

function parseJSON(str){
    try{
        return Right.of(JSON.parse(str))
    }catch(e){
        return Left.of({error:e.message})
    }
}

let r = parseJSON('{name:zs}');
console.log(r);
r = parseJSON('{"name":"zs"}').map(x=>x.name.toUpperCase());
console.log(r);