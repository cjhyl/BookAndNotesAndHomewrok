<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = (resultFiles: any, insertImgFn: any) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 上传图片，返回结果，将图片插入到编辑器中
        // insertImgFn('图片地址') //根据图片地址生成 img 标签插入富文本编辑器内容中
        console.log(resultFiles, insertImgFn)

        // 1. 把用户选择的 resultFiles 上传到服务器
        this.uploadImg(resultFiles[0], (name) => {
          console.log('upload url', name)
          if (name) {
            insertImgFn(name)
          } else {
            this.$message.error('上传失败')
          }
        })
      }
      editor.create()

      // 注意：设置初始化必须在 create 之后
      editor.txt.html(this.value)
    },
    async uploadImg (file: any, cb: (name: string | null) => void) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        const { data } = await uploadCourseImage(fd)
        if (data.code === '000000') {
          cb(data.data.name)
        } else {
          cb(null)
        }
      } catch (err) {
        console.log(err)
        cb(null)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
