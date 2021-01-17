<template>
  <Home>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{newBlog.title}}</span>
      </div>
      <div class="datetime">
        发布 {{newBlog.publishtime}}<br>
        更新 {{newBlog.updatetime}}
      </div>
      <div v-html="mdToHtml(newBlog.content)">
      </div>
    </el-card>
  </Home>
</template>

<page-query>
query {
  newBlogAry:allStrapiBlogs(perPage: 1, page: 1, sortBy:"updatetime", order:DESC){
    edges{
      node{
        id
        title
        publishtime
        updatetime
        content
      }
    }
  }
}
</page-query>


<script>
// import { Pager } from 'gridsome'
import utils from '../utils'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'HomePage',
  metaInfo: {
    title: 'new',
  },
  data(){
    return {
    }
  },
  methods: {
    mdToHtml (markdown) {
      return md.render(''+markdown);
    }
  },
  computed:{
    newBlog(){
      return this.$page.newBlogAry.edges[0].node
    }
  },
  created(){
    // var that = this;
    // axios.get(this.GRIDSOME_API_URL+'/blogs',
    //   {params: {
    //     _sort:'publishtime:DESC',
    //     _start:0,
    //     _limit:1
    //   }}
    // )
    // .then(function(rl){
    //   that.loading=false;
      
    //   if(rl.status == 200){
    //     var data = rl.data[0];
    //     data.updatetime=utils.formatTimeSpan(new Date(data.updatetime),'YYYY-MM-DD hh:mm:ss');
    //     data.publishtime=utils.formatTimeSpan(new Date(data.publishtime),'YYYY-MM-DD hh:mm:ss');
    //     that.newBlog=data
    //   }
    // })
    // .catch(function(){
    //   that.loading=false;
    // })
  },
  mounted(){
  }
}
</script>

<style>
.datetime{
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgb(96, 108, 113);
}
</style>
