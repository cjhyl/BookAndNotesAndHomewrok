const marked = require('marked')

module.exports = function(source){
    // console.log(source)
    // return 'console.log("hello")'

    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`;

    //返回字符串，交给下一个loader
    return html
}