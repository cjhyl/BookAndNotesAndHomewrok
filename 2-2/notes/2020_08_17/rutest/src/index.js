// import {log} from './logger'
// import messages from './messages'
// import {name,version} from '../package.json'
// import cjs from './cjs-test'

// const msg = messages.hi
// log(msg)

// log(name)
// log(version)

// log(cjs)

//代码分割方式导入模块
// import('./logger').then(({log})=>{
//     log('ccode splitting~')
// })


import fetchApi from './fetch'
import {log} from './logger'

fetchApi('/posts').then(data=>{
    data.forEach(item=>{
        log(item)
    })
})