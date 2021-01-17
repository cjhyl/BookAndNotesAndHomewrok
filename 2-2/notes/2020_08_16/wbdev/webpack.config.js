const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode:'none',
    entry:'./src/index.js',//入口文件路径
    output:{
        filename:'bundle.js',//输出文件名称
        path:path.join(__dirname,'dist'),
        //publicPath:'dist/'
    },
    //webpack-dev-server属性配置
    devServer:{
        contentBase:'./',
        hot:true,
        proxy:{
            '/api':{
                //http://localhost:8080/api/users->https://api.github.com/api/users
                target:'https://api.github.com',
                //http://localhost:8080/api/users->https://api.github.com/users
                pathRewrite:{
                    '^/api':'',
                },
                //不能使用localhost:8080作为请求Github的主机名，主机名：https协议中的概念
                changeOrigin:true
            }
        }
    },
    devtool:'source-map',
    module:{
        rules:[
        // {
        //     test:/.js$/,
        //     use:{
        //         loader:'babel-loader',
        //         options:{
        //             presets:['@babel/preset-env']//使用最新的es6特性标准转换js中的es6代码为es5
        //         }
        //     }
        // },
        {
            test:/.css$/,//匹配的文件为.css结尾的文件
            use:[
                'style-loader',//cssLoader把样式加入模块中，styleLoader把样式添加到style标签中运用起来
                'css-loader',//对匹配的文件使用loader，数组模式下顺序是从后往前执行
            ]
        },
        {
            test:/.png$|.svg$/,
            use:{
                loader:'url-loader',
                options:{//loader属性配置
                    limit:10*1024//小于10K的文件使用url-loader，大文件继续使用file-loader，这样配置的话默认需要有file-loader，否则会报错
                }
            }
        },
        {
            test:/.html$/,
            use:{
                loader:'html-loader',
                options:{
                    attributes:{
                        list:[
                        {//配置打包资源属性
                            tag: 'a',
                            attribute: 'href',
                            type: 'src',
                        },
                        {
                            tag: 'img',
                            attribute: 'src',
                            type: 'src',
                        }
                        ]
                    }
                }
            }
        }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            //根据属性生成html文件
            {
                title:'webpack 插件示例',//标题
                meta:{//meta标签
                    viewport:'width=device-width'
                },
                template:'./src/index.ejs',//指定模板文件
            }
        ),
        //添加新的html插件对象生成新的html文件
        new HtmlWebpackPlugin(
            {
                filename:'about.html'
            }
        ),
        //开发阶段不建议使用
        new CopyWebpackPlugin({
            patterns:[
                {from:'static',to:'static'}
            ]
        }),
        new webpack.HotModuleReplacementPlugin()

    ]
}