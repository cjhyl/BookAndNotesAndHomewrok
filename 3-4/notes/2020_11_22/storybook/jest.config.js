module.exports = {
  "testMatch": ["**/_tests_/**/*.[jt]s?(x)"],
  "moduleFileExtensions": [
    "js",
    "json",
    // 告诉Jest处理'*.vue'文件
    "vue"
  ],
  "transform": {
    // 用'vue-jest'处理'*.vue'文件
    ".*\\.(vue)$": "vue-jest",
    // 用'babel-jest'处理js
    ".*\\.(js)$": "babel-jest"
  }
}
