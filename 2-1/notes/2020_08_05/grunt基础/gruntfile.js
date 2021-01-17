//grunt入口文件
//用于定义grunt自动执行的任务
//yarn grunt
//需要导出一个函数，该函数接收一个grunt形参，内部提供一些创建任务时候可用到的API

module.exports = grunt=>{
    //添加配置数据
    grunt.initConfig({
        foo:'bar',
        fo2:{
            bar:123
        },
        //为多目标任务配置的属性
        build:{
            //配置选项
            options:{
                foo:'bar'
            },
            css:{
                options:{
                    foo:'1'
                },
            },//子任务
            js:'2'//子任务
        }
    })
    //普通任务 yarn grunt foo执行
    grunt.registerTask('foo',()=>{
        console.log('run grunt '+grunt.config('foo')+' '+grunt.config('fo2.bar'))
        console.log(grunt.config())
    })
    //第二个参数是任务描述的任务
    grunt.registerTask('bar','任务描述',()=>{
        console.log('other task')
    })
    //失败的任务 执行序列在其后的任务不会再被执行 但可以命令后缀--force强制执行其后的任务
    grunt.registerTask('bad',()=>{
        console.log('bad task');
        return false;
    })
    //默认任务
    grunt.registerTask('default',['foo','bad','bar'])
    //异步任务
    // grunt.registerTask('async-task',()=>{
    //     setTimeout(()=>{
    //         console.log('async task');
    //     },1500)
    // })
    grunt.registerTask('async-task',function(){
        const done=this.async();
        setTimeout(()=>{
            console.log('async task');
            done();
        },1500)
    })
    //异步失败任务
    grunt.registerTask('bad-async',function(){
        const done=this.async();
        setTimeout(()=>{
            console.log('bad async task');
            done(false);
        },1500)
    })
    //多目标任务 yarn grunt build:css
    grunt.registerMultiTask('build',function(){
        console.log('build task'+this.target+this.data)
        console.log(this.options())
    })
}