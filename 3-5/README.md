1、Vue 3.0 性能提升主要是通过哪几方面体现的？
一、响应式系统升级
用proxy对象代替defineProperty重写系统
性能更好、可以监听动态新增的属性、可以监听删除的属性、可以监听数组的索引和length属性
二、编译优化
通过优化编译性能，重写虚拟dom，提升渲染性能
节点对比算法diff优化：添加动态数据标记、缓存事件处理函数、静态节点提升以排除
三、源码体积的优化
移除了一些不常用的API：如inline-template、filter等
优化了tree shaking
按需打包代码

2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
options API：
它包含一个描述组件选项(data、methods、props等)的对象。
这种方式在开发复杂组件时，同一个功能逻辑的代码被拆分到不同选项。
在功能复杂的组件的时候，可能很难看懂，比较难以维护。
Compositon API：
Vue.js 3.0 新增的一组API、一组基于函数的API 、可以更灵活的组织组件的逻辑。
它可把功能相关的数据声明、逻辑处理、事件注册与销毁封装到独立的模块中，在需要使用时导入到setup函数中即可使用。
使用更方便，更有利于逻辑代码的重用，而且查看功能逻辑时显得更简洁、清晰。

3、Proxy 相对于 Object.defineProperty 有哪些优点？
有以下优点：
Proxy可直接监听对象本身，而不是单一属性，并返回一个新对象。
Proxy可以监听数组变化。
Proxy有更多的、Object.defineProperty不具备的对象行为监听、状态判断的方法，如deleteProperty、has等。

4、Vue 3.0 在编译方面有哪些优化？
通过优化编译性能，重写虚拟dom，提升渲染性能。
节点对比算法diff优化：添加动态数据标记、缓存事件处理函数、静态节点提升以排除静态节点渲染。

5、Vue.js 3.0 响应式系统的实现原理？
Vue3.0使用reactive、effect、track、trigger、ref、toRefs、computed等函数处理响应式数据。
reactive：对传入的对象进行响应式改造。
参数为一个对象，返回一个Proxy对象。
在getter中进行依赖搜集，在setter和deleteProperty进行响应触发。
effect：用于添加依赖。
参数为回调函数，如果传入的回调函数中触发了响应式数据的getter，则会进行依赖搜集
track：搜集依赖。
把响应数据的目标对象、监听属性、响应依赖搜集、存储。
trigger：触发依赖响应。
ref：把非对象的一般数值改造为响应式对象。
在值value的getter、setter中进行依赖搜集、触发响应。
toRefs：把一个响应式对象的子属性改造为响应式数据。
通过设置、获取响应式对象的值激发响应式对象proxy的setter、getter，以使用响应式对象本身的逻辑。
computed：计算属性。
参数为包含响应式数据值操作的回调函数，调用了effect函数。