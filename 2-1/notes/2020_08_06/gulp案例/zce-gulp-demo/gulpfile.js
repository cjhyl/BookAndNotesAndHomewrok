const {src,dest,parallel,series,watch} = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()
// const sass = require('gulp-sass')
// const babel = require('gulp-babel')
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

//删除文件
const clean=()=>{
    return del(['dist','temp'])//放回一个Promise对象
}
//样式文件处理
const style = ()=>{
    //,{base:'src'} 该属性用于保持文件原有的目录结构
    return src('src/assets/styles/*.scss',{base:'src'})
        .pipe(plugins.sass({outputStyle:'expanded'}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//脚本文件处理
const script=()=>{
    return src('src/assets/scripts/*.js',{base:'src'})
        .pipe(plugins.babel({presets:['@babel/preset-env']}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//页面文件处理
const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
}
const page=()=>{
    //src('src/**/*.html')//子目录下所有的html文件
    return src('src/*.html',{base:'src'})
        //swig({data}) 等价于 swig({data:data})
        .pipe(plugins.swig({data, defaults: { cache: false }}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//图片转换
const image=()=>{
    return src('src/assets/images/**',{base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
//字体
const font=()=>{
    return src('src/assets/fonts/**',{base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

//额外文件
const extra=()=>{
    return src('public/**',{base:'public'})
        .pipe(dest('dist'))
}

//开发服务器
const serve=()=>{
    //监听源文件各目录下的改动
    watch('src/assets/styles/*.scss',style)
    watch('src/assets/scripts/*.js',script)
    watch('src/*.html',page)
    //开发阶段不监听执行图片字体文件压缩操作
    // watch('src/assets/images/**',image)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)
    //开发阶段这些文件只需要重新读取就行了
    watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
    ],bs.reload)

    bs.init({
        //notify:false,//关闭小提示
        //port:8080,//设置端口，默认3000
        //open:false,//关闭自动打开浏览器功能
        //files:'dist/**',//dist文件修改后同步到浏览器  优化方案：在上面的任务中增加bs.reload
        server:{
            //图片字体额外文件直接从src、public源文件中读取
            baseDir:['temp','src','public'],
            //优先读取目录 为了读取bootstrap
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

const useref=()=>{
  return src('temp/*.html',{base:'temp'})
    .pipe(plugins.useref({searchPath:['temp','.']}))
    //html js css
    .pipe(plugins.if(/\.js$/,plugins.uglify()))
    .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/,plugins.htmlmin({
      collapseWhitespace:true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

//合并样式、脚本、页面文件任务
const compile = parallel(style,script,page)
//上线前执行的任务
const build = series(
  clean,
  parallel(
    series(compile,useref),
    extra,
    image,
    font
  )
)
//开发阶段任务
const develop = series(compile,serve)

module.exports={
    clean,
    build,
    develop,
}