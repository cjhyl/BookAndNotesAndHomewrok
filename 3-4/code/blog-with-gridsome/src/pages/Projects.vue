<template>
  <Home>
    <!-- <el-button 
      v-clipboard:copy="copyStr"
      v-clipboard:success="onCopyOk" 
      v-clipboard:error="onCopyError"
    >
    点击复制
    </el-button> -->
    <div style="min-height:600px">
      <el-card style="margin-bottom: 20px;">
        <el-input v-model="seachStr" placeholder="请输入关键字" style="width:300px;">
        </el-input>
        <el-button @click="doSearch" icon="el-icon-search" circle style="margin-left:10px;">
        </el-button>
        <el-button 
          type="warning" 
          icon="el-icon-share" 
          plain 
          circle 
          style="margin-left:10px;"
          v-clipboard:copy="MY_URL+$route.fullPath"
          v-clipboard:success="onCopyOk" 
          v-clipboard:error="onCopyError"
        >
        </el-button>
      </el-card>
      <div>
        <el-card style="margin-bottom: 20px;" v-for="(r,i) in showProjects" :key="i">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="16">
                <a style="text-decoration: none; cursor: pointer;"  @click="clickProject(r)"><i class="el-icon-service"></i>&nbsp;&nbsp;{{r.name}}</a>
              </el-col>
              <el-col :span="8">
                <el-button 
                  style="float: right; padding: 3px 0" 
                  icon="el-icon-share" 
                  v-clipboard:copy="MY_URL+'/project/'+r.id"
                  v-clipboard:success="onCopyOk" 
                  v-clipboard:error="onCopyError"
                  type="text"
                >
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="time">最近更新 {{r.updatetime}}</div>
          <div class="content" v-text="r.description"></div>
          <el-row style="margin-top: 12px;">
            <el-col :span="12">
              <el-tooltip class="item" effect="dark" :content="'star '+r.star" >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ r.star }}
              <el-tooltip class="item" effect="dark" :content="'star '+r.watch" >
                <i class="el-icon-view" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ r.watch }}
              <el-tooltip class="item" effect="dark" :content="'star '+r.fork" >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ r.fork }}
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <el-tag v-for="(tag,idx) in r.tags" :key="i+'_'+idx" style="margin-left:8px;">
                {{tag.title}}
              </el-tag>
            </el-col>
          </el-row>
        </el-card>
        <div style="text-align:center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="pageIndex"
            :page-size="pageSize"
            @current-change="onPageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </Home>
</template>

<page-query>
query {
  projectsData:allStrapiProjects(order:ASC){
    edges{
      node{
        id
        name
        published_at
        updatetime
        star
        watch
        fork
        tags{
          title
        }
      }
    }
  }
}
</page-query>

<script>
import utils from '../utils'

export default {
  name: 'ProjectsPage',
  metaInfo: {
    title: 'projects',
  },
  data(){
    return {
      seachStr:'',
      splitProjects:[],
      pageIndex:1,
      pageSize:5,
    }
  },
  mounted(){
    this.doSearch();
  },
  computed:{
    projects(){
      return this.$page.projectsData.edges.map(item=>{
        item.node.updatetime=utils.formatTimeSpan(new Date(item.node.updatetime),'YYYY-MM-DD hh:mm:ss');
        return item.node;
      })
    },
    total(){
      return this.splitProjects.length;
    },
    showProjects(){
      var pos = (this.pageIndex-1)*this.pageSize;
      return this.splitProjects.slice(pos,pos+this.pageSize)
    }
  },
  methods:{
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
    onPageChange(index){
      this.pageIndex=index;
    },
    doSearch(){
      var that = this;
      this.pageIndex=1;
      this.splitProjects=this.projects.filter(function(project){
        return project.name.indexOf(that.seachStr)!=-1;
      })
    },
    clickProject(project){
      this.$router.push('/project/'+project.id)
    }
  }
}
</script>

<style scoped>
  .time{font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);}
  .content{font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;}
</style>