const path = require('path')

module.exports = {
    mode:'none',
    entry:'./src/index.js',//入口文件路径
    output:{
        filename:'bundle.js',//输出文件名称
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[{
            test:/.md$/,
            use: [
                'html-loader',
                './markdown-loader'
            ]
        }]
    }
}