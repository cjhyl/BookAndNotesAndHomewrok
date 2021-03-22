module.exports = {
  root: true,
  env: {
    node: true
  },
  // 使用插件的编码规则
  extends: [
  	/*
     * eslint-plugin-vue插件指定的编码规则，规则详情https://eslint.vuejs.org。
     * 可在<template>和<script>标签中校验eslint规则
     * 以及vue指令规则
     * 命名、结构规则 cn.vuejs.org/v2/style-guide
     */
    'plugin:vue/essential',
    /*
     * @vue/eslint-config-standard插件指定的规则，standard风格规范
     * https://standardjs.com/readme-zhcn.html
     */
    '@vue/standard',
    /*
     * @vue/eslint-config-typescript插件指定的规则，typescript的推荐规则
     * https://github.com/vuejs/eslint-config-typescript#readme
     * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
     */
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  /*
   * 自定义编码校验规则 
   * 'off'或者0 关闭；'warn'或者1 开启 并使用警告级错误(程序不会退出)；'error'或者2 开启 并使用错误级错误(触发时程序会退出)
   * 报错信息最右侧的是规则的id字符，ts
   * eslint规则文档：cn.eslint.org/docs/rules，ts规则需要看上面ts相关文档
   * 
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//  'semi': ['error', 'always']//开启错误级错误，规则：必须有分号，
//		// typescript的分号规则
//		'@typescript-eslint/member-delimiter-style': ['error', {
//		    "multiline": {// 多行
//		        "delimiter": "semi",// 要有分号 改为'none'可取消验证
//		        "requireLast": true// 最后一个也要有
//		    },
//		    "singleline": {// 单行
//		        "delimiter": "semi",// 要有分号
//		        "requireLast": false// 最后一个可以没有
//		    }
//		}]
  }
}
