const merge = require('webpack-merge')
const commonWbConfig = require('./webpack.common')
const webpack = require('webpack')

process.env.NODE_ENV="development"
console.log('process.env.NODE_ENV',process.env.NODE_ENV)
module.exports = merge.merge(commonWbConfig,{
    devServer:{
        contentBase:'./',
    },
    devtool:'source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"development"',
            'BASE_URL':'"public/"'
        })
    ],
})