// 实现这个项目的构建任务

const {src,dest,parallel,series,watch,task} = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()

//删除文件
const clean=()=>{
    return del(['dist','temp'])//返回一个Promise对象
}
//样式文件处理
const style = ()=>{
    return src('src/assets/styles/*.scss',{base:'src'})
        .pipe(plugins.sass({outputStyle:'expanded'}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//脚本文件处理
const script=()=>{
    return src('src/assets/scripts/*.js',{base:'src'})
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
        .pipe(plugins.babel({presets:['@babel/preset-env']}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//eslint检验
const lint=()=>{
    return src('src/assets/scripts/*.js')
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
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
    return src('src/*.html',{base:'src'})
        .pipe(plugins.swig({data, defaults: { cache: false }}))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))//优化文件监视
}

//图片转换
const image=()=>{
    return src('src/assets/images/**',{base:'src'})
        //.pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
//字体
const font=()=>{
    return src('src/assets/fonts/**',{base:'src'})
        //.pipe(plugins.imagemin())
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
    //开发阶段这些文件只需重新读取，不用压缩
    watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
    ],bs.reload)

    bs.init({
        server:{
            //图片、字体、额外文件直接从src、public源文件中读取
            baseDir:['temp','src','public'],
            //优先读取目录 为了读取bootstrap
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

//文件压缩
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
const start = series(compile,serve)

//文件上传
//远程配置
var config = {
    host: '192.168.0.1',
    port: 22,
    username: '',//'xxx',
    privateKey: ''//fs.readFileSync('/.ssh/id_rsa')
}
//ssh对象初始化
var gulpSSH = new plugins.ssh({
    ignoreErrors: false,
    sshConfig: config
})
//删除服务器文件
const execSSH=()=>{
    return gulpSSH
        .shell('', {filePath: 'shell.log'})
        .pipe(dest('logs'))
}
//上传打包文件
const upload=()=>{
    return src(`./dist/**`)
    .pipe(gulpSSH.dest(''))
}
//整合上传流程
const deploy=series(build,execSSH,upload)

module.exports={
    clean,
    lint,
    build,
    serve,
    start,
    deploy
}