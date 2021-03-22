<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
    />
    <!--
      upload 上传文件组件，它支持自动上传，你只需要把上传需要参数配置一下就可以了相关属性有action headers multiple data name等
      要自己上传，使用http-request，其会覆盖默认的上传行为，可以在其中自定义上传的实现。
    -->
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },
    async handleUpload (options: any) {
      try {
        this.isUploading = true
        const fd = new FormData()
        fd.append('file', options.file)
        const { data } = await uploadCourseImage(fd, e => {
          // e.loaded 已上传大小 e.total 需上传的总大小
          this.percentage = Math.floor(e.loaded / e.total * 100)
        })
        if (data.code === '000000') {
          this.isUploading = false
          this.percentage = 0
          this.$emit('input', data.data.name)
        } else {
          this.$message.error('上传失败')
        }
        console.log('upload end', data)
      } catch (err) {
        console.log(err)
        this.$message.error('上传失败')
      }
      this.isUploading = false
      this.percentage = 0
    }
  }
})
</script>

<style lang="scss" scoped>
  /* ::v-deep 深度作用修饰符 作用到非根样式 */
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
