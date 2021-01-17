1、请简述Vue首次渲染的过程。
Vue首次渲染时，
先在src/platforms/web/entry-runtime-with-compiler.js中重写$mount函数，把模板转换为render函数，然后调用mount函数渲染dom，同时给Vue挂载compile静态方法。
上个js中引入了src/platforms/web/runtime/index.js，在其中给Vue.options注册了web平台的默认指令(model,show)和默认组件(Transition,TranstionGroup)，给Vue原型注册了__patch__函数。
上个js中引入了src/core/index.js，在其中调用了initGlobalAPI函数，给vue添加了一些ssr相关属性和版本属性version。
上个js中调用的initGlobalAPI函数在src/core/global-api/index.js中，它初始化了Vue.config属性，添加了Vue静态方法set/delete/nextTick，添加响应式改造方法Vue.observable，初始化Vue.options对象，并添加components/directives/filters属性，给components添加keep-alive组件，注册Vue.use()用于注册插件、Vue.mixin()实现混入、Vue.extend()基于传入的options返回一个组件的构造函数、注册Vue.components()、Vue.directives()、Vue.filters()。
上个js中引入了src/core/instance/index.js，在其中注册了Vue构造函数，在构造函数中调用了_init方法。后面，注册Vue实例的_init方法并初始化Vue实例，注册实例属性$data/$props/$set/$delete/$watch，初始化事件相关方法$on/$once/$off/$emit，初始化生命周期相关混入方法_update/$forceUpdate/$destroy，混入渲染相关的$nextTick/_render


2、请简述Vue响应式原理。
Vue响应式，是通过把数据用Object.defineProperty改造为setter/getter模式实现的，每个响应式数据都会创建一个dep对象，然后在get函数中收集依赖，把属性对应的watcher对象添加到dep的subs数组中，在set函数中调用dep.notify()发送通知。
对于数组，Vue是通过拦截数组的push、unshift、splice等会改变数组的方法，然后通过其__ob__对象的dep.notify()发送通知。



3、请简述虚拟DOM中Key的作用和好处。
Vue中key的是，在新旧节点对比时，辨识不同vnode的标识。
在Vue中使用key的好处：
1、避免列表改变时内部元素状态变更不正确的问题。
2、正确的触发过渡动画。
3、使元素的复用更准确，在大多数情况下渲染效率更高。



4、请简述Vue中模板编译的过程。
模板编译，从$mount方法中调用compileToFunctions开始。

一、compileToFunctions中：
（一）、读取缓存中的CompileFunctionResult对象，有则返回缓存，否则继续。
（二）、通过compile函数把模板和用户选项编译为编译对象。
1、接收模板和选项数据，处理选项数据。
2、用baseCompile函数把模板和处理过的选项数据转换为编译对象
（1）、使用parse函数把模板字符串转换为抽象语法树对象ast。
（2）、使用optimize函数标记静态内容，优化抽象语法树。
（3）、使用generate函数把抽象语法树对象编译为字符串形式的js代码。
（4）、返回编译对象
3、返回编译对象。
（三）、用createFunction函数把编译对象的render、staticRenderFns（字符串形式的js代码）转换为js方法并注入到res对象的同名属性中。
（四）、缓存并返回res对象
二、把返回的res对象的解构属性render和staticRenderFns挂载到vue实例的options选项对象的同名属性中。