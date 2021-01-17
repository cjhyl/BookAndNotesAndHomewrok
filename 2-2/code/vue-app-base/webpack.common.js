const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename:'[name].js',//输出文件名称
        path:path.join(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            // 运行serve和build前执行eslint检查
            // {
            //     test: /\.js$|\.vue$/, 
            //     exclude: /node_modules/, 
            //     use: 'eslint-loader',
            //     enforce:'pre'
            // },
            {
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/.png$/,
                use: {
                    loader:'url-loader',
                    options:{
                        limit: 1024,
                        esModule: false
                    }
                    
                }
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title:'vue test',
            filename: 'index.html',
            template: './public/index.html'
        }),
    ]
}