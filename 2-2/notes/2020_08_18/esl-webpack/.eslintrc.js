module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    // 'react/jsx-uses-react':2,//数字2代表状态 'error' 处理react标签未定义
    // 'react/jsx-uses-vars':2,//处理app未定义
  },
  // plugins:[
  //   'react'
  // ]
}
