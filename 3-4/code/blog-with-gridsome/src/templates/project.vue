<template>
  <Home>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row>
            <el-col :span="16">
              {{project.name}}
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
                  @click="goProjects"
                >
                  更多项目
                </el-button>
              </div>
            </el-col>
        </el-row>
      </div>
      <div class="datetime">
        发布 {{project.published_at}}<br>
        更新 {{project.updatetime}}
      </div>
      <div class="content" v-text="project.description"></div>
      <el-row style="margin-top: 12px;">
        <el-col :span="12">
          <el-tooltip class="item" effect="dark" :content="'star '+project.star" >
            <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
          </el-tooltip>
          {{ project.star }}
          <el-tooltip class="item" effect="dark" :content="'star '+project.watch" >
            <i class="el-icon-view" style="margin: 0px 5px 0px 0px"></i>
          </el-tooltip>
          {{ project.watch }}
          <el-tooltip class="item" effect="dark" :content="'star '+project.fork" >
            <i class="el-icon-bell" style="margin: 0px 5px 0px 0px"></i>
          </el-tooltip>
          {{ project.fork }}
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-tag v-for="(tag,idx) in project.tags" :key="idx" style="margin-left:8px;">
            {{tag.title}}
          </el-tag>
        </el-col>
      </el-row>
      <div v-html="mdToHtml(project.code)">
      </div>
    </el-card>
  </Home>
</template>

<page-query>
query ($id: ID!) {
  project: strapiProjects (id: $id) {
    id
    name
    published_at
    updatetime
    star
    watch
    fork
    code
    tags{
      title
    }
  }
}
</page-query>

<script>
import axios from 'axios'
import utils from '../utils'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'projectPage',
  metaInfo() {
    return {
      title: this.$route.params.id,
    }
  },
  computed:{
    project(){
      var data = this.$page.project;
      data.updatetime=utils.formatTimeSpan(new Date(data.updatetime),'YYYY-MM-DD hh:mm:ss');
      data.published_at=utils.formatTimeSpan(new Date(data.published_at),'YYYY-MM-DD hh:mm:ss');
      return data;
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
    goProjects(){
      this.$router.push('/projects')
    }
  }
}
</script>

<style>
  .datetime{font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);}
  .content{font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;}
</style>