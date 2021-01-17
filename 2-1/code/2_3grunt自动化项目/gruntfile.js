
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt=>{
    grunt.initConfig({
        //配置插件属性
        clean:{
            //temp:'temp/app.js'//清理指定文件
            //temp:'temp/*.txt'//清理指定类型文件
            dist:'dist/**'//清理目录及其下所有子目录子文件
        },
        //sass插件配置
        sass:{
            options:{
                sourceMap:true,
                implementation:sass
            },
            main:{
                files:{
                    'dist/css/main.css':'src/scss/main.scss'
                }
            }
        },
        //babel插件配置
        babel:{
            options:{
                sourceMap:true,
                presets:['@babel/preset-env']
            },
            main:{
                files:{
                    'dist/js/app.js':'src/js/app.js'
                }
            }
        },
        htmlmin:{
            main:{
                files:{
                    'dist/index.html':'src/index.html'
                }
            }
        }
    })
    // grunt.loadNpmTasks('grunt-contrib-clean')//clean插件
    // grunt.loadNpmTasks('grunt-sass')//sass插件
    loadGruntTasks(grunt)//自动加载所有grunt插件中的任务

    //在启动的时候，先执行一次sass和babel，再执行watch
    grunt.registerTask('default',['sass','babel','htmlmin'])
}