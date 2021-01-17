const {src,dest} = require('gulp')
const clearCss = require('gulp-clean-css')
const rename = require('gulp-rename')

//使用
exports.default=()=>{
    //return src('src/main.css').pipe(dest('dist'))//单个文件
    //return src('src/*.css').pipe(dest('dist'))//指定类型文件
    //return src('src/*.css').pipe(clearCss()).pipe(dest('dist'))//压缩css文件
    return src('src/*.css').pipe(clearCss()).pipe(rename({extname:'.min.css'})).pipe(dest('dist'))//压缩css文件后改名
}