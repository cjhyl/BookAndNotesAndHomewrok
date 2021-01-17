const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)


export function reactive (target) {
  if (!isObject(target)) return target

  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      console.log('搜集',target,key)
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      //值如果是对象的话，继续用reactive进行响应式改造，普通值则返回本身结束
      return convert(result)
    },
    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      console.log('设置',target,key)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        console.log('变更 触发更新',target,key)
        trigger(target, key)
      }
      return result
    },
    deleteProperty (target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        console.log('删除 触发更新',target,key)
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}


let activeEffect = null
//添加响应依赖，如果callback中会触发proxy对象的getter函数，则会正确搜集
export function effect (callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}

//存放数据中的key为目标对象，value为depsMap
let targetMap = new WeakMap()
//搜集依赖
export function track (target, key) {
  if (!activeEffect) return
  //为目标对象添加监听对象
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
console.log('depsMap',depsMap)
  //depsMap对象中有哪些key绑定了依赖，按key搜集响应回调数据
  //key为目标对象属性的key，value为该属性绑定的响应依赖集合Set
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
console.log('dep',dep)
  
console.log('targetMap',targetMap)
}
//触发依赖回调
export function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

//把非对象的一般数值改造为响应式数据，在值value的getter、setter中进行依赖搜集、触发响应
export function ref (raw) {
  // 判断 raw 是否是ref 创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value () {
      // getter中收集依赖
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if (newValue !== value) {
        raw = newValue
        //如果传入的值是对象的话，会使用reactive创建
        value = convert(raw)
        // setter中触发响应
        trigger(r, 'value')
      }
    }
  }
  return r
}


//把一个响应式对象的子属性改造为响应式数据
export function toRefs (proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
	console.log('torefs array/object',ret)
  return ret
}

//通过设置、获取响应式对象proxy的值激发响应式对象的setter、getter，以使用响应式对象本身的逻辑
function toProxyRef (proxy, key) {
  const r = {
    __v_isRef: true,
    get value () {
      return proxy[key]
    },
    set value (newValue) {
      proxy[key] = newValue
    }
  }
  return r
}

export function computed (getter) {
  const result = ref()
  // effect中的回调执行时会收集依赖
  effect(() => (result.value = getter()))

  return result
}