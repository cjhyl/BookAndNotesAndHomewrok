const PENDING = 'pending';//等待
const FULFILLED = 'fulfilled';//成功
const REJECTED = 'rejected';//失败

class MyPromise{
    constructor(executor){
        try{
            executor(this.resolve,this.reject)
        }catch(e){
            this.reject(e);
        }
        
    }
    //状态
    status=PENDING;
    //成功返回值
    value=undefined;
    //失败原因
    reason=undefined;
    //成功回调
    //successCallback=undefined;
    successCallback=[];
    //失败回调
    //failCallback=undefined;
    failCallback=[];
    resolve=(value)=>{
        //如果状态不是等待，阻止执行
        if(this.status!==PENDING) return;
        //状态变为成功
        this.status=FULFILLED;
        //保存值
        this.value=value;
        //判断回调是否存在，存在，则执行
        //this.successCallback && this.successCallback(this.value);
        //while(this.successCallback.length) this.successCallback.shift()(this.value);
        while(this.successCallback.length) this.successCallback.shift()();
    }
    reject=(reason)=>{
        //如果状态不是等待，阻止执行
        if(this.status!==PENDING) return;
        //状态变为失败
        this.status=REJECTED;
        //保存原因
        this.reason=reason;
        //判断回调是否存在，存在，则执行
        //this.failCallback && this.failCallback(this.reason);
        //while(this.failCallback.length) this.failCallback.shift()(this.reason);
        while(this.failCallback.length) this.failCallback.shift()();
    }
    then(successCallback,failCallback){
        successCallback=successCallback?successCallback:value=>value;
        failCallback=failCallback?failCallback:reason=>{throw reason};
        let promise2 = new MyPromise((resolve,reject)=>{
            if(this.status===FULFILLED){//成功
                setTimeout(()=>{
                    try {
                        let x=successCallback(this.value);
                        //resolve(x);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                    
                },0)
                
            }else if(this.status===REJECTED){//失败
                setTimeout(()=>{
                    try {
                        let x=failCallback(this.reason);
                        //resolve(x);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                    
                },0)
            }else{//等待
                //存储回调
                // this.successCallback.push(successCallback);
                // this.failCallback.push(failCallback);
                this.successCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x=successCallback(this.value);
                            //resolve(x);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (e) {
                            reject(e);
                        }
                        
                    },0)
                });
                this.failCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x=failCallback(this.reason);
                            //resolve(x);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (e) {
                            reject(e);
                        }
                        
                    },0)
                });
                
            }
        });
        
        return promise2;
    }
    finally(callback){
        return this.then(value=>{
            return MyPromise.resolve(callback()).then(()=>value);
        },reason=>{
            return MyPromise.resolve(callback()).then(()=>{throw reason})
        })
    }
    catch(failCallback){
        return this.then(undefined,failCallback);
    }
    static all(array){
        let result=[];
        let index=0;
        
        return new MyPromise((resolve,reject)=>{
            function addData(key,value){
                result[key]=value;
                index++;
                if(index===array.length){
                    resolve(result);
                }
            }
            for(let i=0;i<array.length;i++){
                let cur=array[i];
                if(cur instanceof MyPromise){
                    //promise对象
                    cur.then(value=>addData(i,value),reason=>reject(reason))
                }else{
                    //普通值
                    addData(i,array[i]);
                }
            }
        })
    }
    static resolve(value){
        if(value instanceof MyPromise) return value;
        return new MyPromise(resolve=>resolve(value));
    }

}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2===x){
        reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise){
        //promise对象
        //x.then((value)=>resolve,(reason)=>reject(reason));
        x.then(resolve,reject);
    }else{
        //普通值
        resolve(x);
    }
}