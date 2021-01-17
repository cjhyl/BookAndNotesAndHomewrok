// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',//页面title的公共后缀名
  siteDescription:'',//头部的meta name=description中的内容，利于seo
  pathPrefix:'',//相对子目录
  titleTemplate:'%s - <siteName>',//title规则，默认值 %s - <siteName>
  icon:'./src/favicon.png',//网站图标，默认值./src/favicon.png
  //configureWebpack:{},//自定义webpack配置属性
  //chainWebpack:{},//自定义链式webpack配置属性
  //runtimeCompiler:false,//自定义vue运行时
  //configureServer//开发服务端配置
  //permalinks.trailingSlash:true,//路径最后是否加斜杠
  //host:'localhost',
  //port:8080,
  //outputDir:'dist'
  plugins: [],
  templates: {
    Post: [
      {
        path: '/posts/:id',
        component: './src/templates/Post.vue'
      }
    ]
  }
}
