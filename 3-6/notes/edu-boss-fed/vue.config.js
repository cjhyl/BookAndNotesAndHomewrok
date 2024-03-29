// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
//      additionalData: `@import "~@/styles/variables.scss";`
		prependData: `@import "~@/styles/variables.scss";`
      },
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        // ws: true,// 转发websocket 这里不需要
        changeOrigin: true,// 把请求头中的 host 配置为 target,这样能把请求头正确转发到目标服务
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true,
      }
    }
  }
}