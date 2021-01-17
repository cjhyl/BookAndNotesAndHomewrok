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
        <el-card style="margin-bottom: 20px;" v-for="(r,i) in showBlogs" :key="i">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="16">

                <a style="text-decoration: none; cursor: pointer;"  @click="clickBlog(r)"><i class="el-icon-edit-outline"></i>&nbsp;&nbsp;{{r.title}}</a>
              </el-col>
              <el-col :span="8">
                <el-button 
                  style="float: right; padding: 3px 0" 
                  icon="el-icon-share" 
                  v-clipboard:copy="MY_URL+'/blog/'+r.id"
                  v-clipboard:success="onCopyOk" 
                  v-clipboard:error="onCopyError"
                  type="text"
                >
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="time">最近更新 {{r.updatetime}}</div>
          <div class="content" v-text="r.content"></div>
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
  blogsData:allStrapiBlogs(order:ASC){
    edges{
      node{
        id
        title
        updatetime
        content
      }
    }
  }
}
</page-query>

<script>
import utils from '../utils'

export default {
  name: 'BlogsPage',
  metaInfo: {
    title: 'blogs',
  },
  data(){
    return {
      seachStr:'',
      splitBlogs:[],
      pageIndex:1,
      pageSize:5,
    }
  },
  mounted(){
    this.doSearch();
  },
  computed:{
    blogs(){
      return this.$page.blogsData.edges.map((item)=>{
        return item.node;
      })
    },
    total(){
      return this.splitBlogs.length;
    },
    showBlogs(){
      var pos = (this.pageIndex-1)*this.pageSize;
      return this.splitBlogs.slice(pos,pos+this.pageSize)
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
      this.splitBlogs=this.blogs.filter(function(blog){
        return blog.title.indexOf(that.seachStr)!=-1;
      })
    },
    clickBlog(blog){
      this.$router.push('/blog/'+blog.id)
    }
  }
}
</script>

<style scoped>
  .time{font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);}
  .content{font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;}
</style>