<template>
  <Home>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row>
            <el-col :span="16">
              {{blog.title}}
            </el-col>
            <el-col :span="8">
              <div style="float:right;">
                <el-button 
                  style="padding: 3px 0" 
                  icon="el-icon-share" 
                  v-clipboard:copy="MY_URL+$route.fullPath"
                  v-clipboard:success="onCopyOk" 
                  v-clipboard:error="onCopyError"
                  type="text"
                >
                  分享
                </el-button>
                <el-button 
                  style="padding: 3px 0" 
                  icon="el-icon-more-outline" 
                  type="text"
                  @click="goBlogs"
                >
                  更多博客
                </el-button>
              </div>
            </el-col>
        </el-row>
      </div>
      <div class="datetime">
        发布 {{blog.publishtime}}<br>
        更新 {{blog.updatetime}}
      </div>
      <div v-html="mdToHtml(blog.content)">
      </div>
    </el-card>
  </Home>
</template>

<page-query>
query ($id: ID!) {
  blog: strapiBlogs (id: $id) {
    id
    title
    publishtime
    updatetime
    content
  }
}
</page-query>

<script>
import utils from '../utils'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'blogPage',
  metaInfo() {
    return {
      title: this.$route.params.id,
    }
  },
  computed:{
    blog(){
      return this.$page.blog;
    }
  },
  methods:{
    mdToHtml (markdown) {
      return md.render(''+markdown);
    },
    onCopyOk(){
      this.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'success'
      })
    },
    onCopyError(){
      this.$confirm('链接复制失败', '提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      })
    },
    goBlogs(){
      this.$router.push('/blogs')
    }
  }
}
</script>

<style>
  .datetime{font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);}
  .content{font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;}
</style>