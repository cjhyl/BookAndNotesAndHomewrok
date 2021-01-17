module.exports = {
  env: {//代码最终运行环境
    browser: true,//最终在浏览器环境运行
    es2020: true//代码标准es2020类似属性还有es6 es2017
  },
  extends: [//继承一些共享配置
    'standard'
  ],
  parserOptions: {//设置语法解释器版本
    ecmaVersion: 11//如果设置为5的话，就不能使用es6语法了
  },
  rules: {//校验规则 具体更多需要查看文档
    //'no-alert':'error',//off 关闭 error 报错
  },
  globals:{//声明可以使用的全局成员
    //'jQuery':'readonly'
  }
}
