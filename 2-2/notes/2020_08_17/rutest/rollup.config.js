import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    //input:'src/index.js',
    //input:['src/index.js','src/album.js'],
    input:{
        idx:'src/index.js',
        ab:'src/album.js'
    },
    output:{
        //file:'dist/bundle.js',
        //format:'iife',
        dir:'dist',
        format:'amd'
    },
    plugins:[
        json(),
        nodeResolve(),
        commonjs()
    ]
}