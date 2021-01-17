const merge = require('webpack-merge')
const commonWbConfig = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

process.env.NODE_ENV="production"
module.exports = merge.merge(commonWbConfig,{
    mode:'production',
    devtool:false,
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"',
            'BASE_URL':'"public/"'
        }),
        new CopyWebpackPlugin({
            patterns:[
                {from:'public/*.ico'}
            ]
        }),
    ],
})