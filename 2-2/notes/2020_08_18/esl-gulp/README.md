一、使用方法
1、清理temp和dist输出文件 yarn clean
2、使用eslint校验js文件 yarn lint
3、开启开发服务器 yarn serve，如果直接使用的话页面有问题，样式和某些数据没有，先执行yarn build再执行yarn serve
4、打包项目 yarn build
5、开启开发模式 yarn start，开发模式会先打包，再执行yarn serve
6、打包项目并上传服务器 yarn 


二、开发流程
1、按照示例教程 "gulp案例系列 系列" 一步步开发功能，安装gulp，清理del，转换样式sass，转换脚本babel，转换页面swig，开发服务器browser-sync，文件压缩useref。
2、由于imagemin下载艰难，本项目就没有使用imagemin压缩图片文件了。
3、安装gulp-eslint并在项目中使用
4、安装gulp-ssh，不过不会使用，各种属性配置陌生，只能按照资料写了先删除服务器文件，上传新压缩文件的流程伪代码。