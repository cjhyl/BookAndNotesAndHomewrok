//import $ from 'jquery'
import foo from './foo'
import './style.css'
import icon1 from './list1_icon1.svg'

foo.bar()

// const ico1 = new Image()
// ico1.src=icon1;
// document.body.appendChild(ico1)


import('jquery').then(($)=>{
    $('body').append(`<img src=${icon1} />`)
})

//热替换
// if(module.hot){
//     //接收参数与webpack同名函数不同，监视所有文件
//     module.hot.accept(()=>{
//         console.log('hmr')
//     })
// }else{
//     console.log('no hmr')
// }