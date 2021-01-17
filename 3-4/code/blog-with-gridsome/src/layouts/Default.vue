<template>
  <div class="layout">
    <!-- head -->
    <header class="page-header">
      <div class="musicBg" v-for="(r,i) in musics" :key="i"
        :style="{left:r.x+'px',top:r.y+'px',fontSize:r.f+'px'}"
      >
        <b>♪</b>
      </div>
      <h1 class="project-name">{{homedata.title}}</h1>
      <h1 class="project-tagline">{{homedata.description}}</h1>
      <a :href="gitHomeUrl" target="_blank" class="btn">Gitee主页</a>
      <a :href="gitProjectUrl" target="_blank" class="btn">博客源码</a>
      <div class="cardBg">
        <el-card>
          <el-row>
            <el-col :span="8"><div style="height:1px"></div></el-col>
            <el-col :span="10"><div style="height:1px"></div></el-col>
            <el-col :span="4" style="text-align:right;">
              <div style="font-size: 20px; color: rgb(96, 98, 102); margin-top: 5px;">
                <b>{{homedata.userename}}</b>
              </div>
              <div style="color: rgb(96, 98, 102);">
                <i class="el-icon-location"></i>&nbsp;{{homedata.position}}<br>
              </div>
            </el-col>
            <el-col :span="2">
              <el-popover
                placement="top-start"
                :title="homedata.userename"
                width="200"
                trigger="hover"
              >
                <i class="el-icon-star-on"></i>&nbsp;{{homedata.usercname}}<br>
                <i class="el-icon-location"></i>&nbsp;{{homedata.position}}<br>
                <img :src="GRIDSOME_API_URL+homedata.headimage.url" style="width: 200px; height: 200px;">
                <img slot="reference" class="headImage" :src="GRIDSOME_API_URL+homedata.headimage.url" />
              </el-popover>
            </el-col>
          </el-row>
        </el-card>
      </div>
      
    </header>
    <!-- 子组件出口 默认插槽 -->
    <slot/>

    <!-- Footer -->
    <div class="foot">
      <div class="footContent">
        <el-row>
            <el-col :span="10">
              <span>© 2020 {{homedata.usercname}}</span>
              <a :href="gitHomeUrl" target="_blank">Profile</a>
              <a :href="gitProjectUrl" target="_blank">VBlog</a>
            </el-col>
            <el-col :span="4"><div style="height:1px"></div></el-col>
            <el-col :span="10">
              <div style="float:right">
                <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>
                <a href="http://element.eleme.io/" target="_blank">Element</a>
              </div>
            </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  homedata:allStrapiHomedata{
    edges{
      node{
        id
        title
        description
        userename
        usercname
        position
        headimage{
          url
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'PostPage',
  data(){
    return {
      gitHomeUrl:'https://gitee.com/cjhyl',
      gitProjectUrl:'https://gitee.com/cjhyl/lg_lesson8',
      musicLen:12,
      musics:[]
    }
  },
  mounted(){
    var that = this;
    setTimeout(function(){
      that.randomMuisc()
    })
  },
  computed:{
    homedata(){
      return this.$static.homedata.edges[0].node
    }
  },
  methods: {
    randomMuisc(){
      var headEl = document.querySelector('.page-header');
      var w = headEl.offsetWidth-20;
      var h = headEl.offsetHeight-20;
      for(var i=0;i<this.musicLen;i++){
        this.musics.push(this.getRandomPos(w,h))
      }
    },
    getRandomPos(w,h){
      var x = parseInt(Math.random()*w);
      if(x>w/5*2&&x<w/5*3){
        return this.getRandomPos(w,h);
      }else{
        return {
          x:x,
          y:parseInt(Math.random()*h),
          f:parseInt(Math.random()*20)+20,
        }
      }
    }
  }
}
</script>

<style>

.page-header {
    padding: 5rem 6rem;
    text-align: center;
    background-color: #159957;
    background-image: linear-gradient(120deg, rgb(38, 144, 249), rgb(252, 45, 45));
    color: rgb(255, 255, 255);
    position: relative;
    margin-bottom:54px;
}
.project-name {
    font-size: 3.25rem;
    margin-top: 0;
    margin-bottom: 0.1rem;
}
.project-tagline {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    font-weight: normal;
    opacity: 0.7;
}
.btn:hover {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}
a:hover {
    text-decoration: underline;
}
a:active,
a:hover {
    outline: 0;
}
.btn {
    padding: 0.75rem 1rem;
    display: inline-block;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    border-style: solid;
    border-width: 1px;
    border-radius: 0.3rem;
    -webkit-transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}
a {
    color: #1e6bb8;
    text-decoration: none;
}
.btn+.btn {
    margin-left: 1rem;
}
.main-content {
    max-width: 64rem;
    padding: 30px 0px 30px 0px;
    margin: 0 auto;
    font-size: 1.1rem;
    word-wrap: break-word;
    min-height: 800px;
}
.foot {
    max-width: 67rem;
    margin: 0 auto;
    font-size: 12px !important;
    color: #586069 !important;
    word-wrap: break-word;
}

.fade-enter-active,
.fade-leave-active {
  -webkit-transition: opacity .2s;
  transition: opacity .2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}




.cardBg{
  position: absolute;
  z-index: 2;
  left:50%;
  margin-left:-32rem;
  bottom:-54px;
  width: 64rem;
}
.headImage{
  margin-top: 4px;
  margin-right: 10px;
  width: 52px;
  height: 52px;
  border-radius: 5px;
  border: 1px solid rgb(235, 238, 245);
}
.footContent{
  border-top: 1px solid rgb(225, 228, 232) !important;
  padding: 45px 0px;
}
.footContent a{margin-left:24px;}
.musicBg{
  position: absolute;
  z-index: 1;
  color: #ffffff;
  top:-100px;
  height:-100px;
}

</style>
