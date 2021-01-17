<template>
  <Home>
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane :label="'粉丝 '+fansTotal">
          <el-row style="min-height:200px">
            <el-col 
              :span="8" 
              style="padding:10px;"
              v-for="(r,i) in showFans"
              :key="i"
            >
              <el-card style="font-size: 13px;color: rgb(96, 98, 102);line-height: 20px">
                <i class="el-icon-star-off"></i>&nbsp;&nbsp;
                <a style="text-decoration: none; cursor: pointer;" @click="clickFans(r)">{{r.cname}}</a>
                <br>
                <i class="el-icon-message"></i>&nbsp;&nbsp;
                <a :href="'https://'+r.link" target="_blank" style="text-decoration: none; cursor: pointer;">TA的主页</a>
                <br>
                <img :src="GRIDSOME_API_URL+r.headimage.url" style="width:100%;" />
              </el-card>
            </el-col>
          </el-row>
          <div style="text-align:center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="fansTotal"
              :current-page="fansPageIndex"
              :page-size="fansPageSize"
              @current-change="onFansPageChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 '+followTotal">
          <el-row style="min-height:200px">
            <el-col 
              :span="8" 
              style="padding:10px;"
              v-for="(r,i) in showFollow"
              :key="i"
            >
              <el-card style="font-size: 13px;color: rgb(96, 98, 102);line-height: 20px">
                <i class="el-icon-star-off"></i>&nbsp;&nbsp;
                <a style="text-decoration: none; cursor: pointer;" @click="clickFollow(r)">{{r.cname}}</a>
                <br>
                <i class="el-icon-message"></i>&nbsp;&nbsp;
                <a :href="'https://'+r.link" target="_blank" style="text-decoration: none; cursor: pointer;">TA的主页</a>
                <br>
                <img :src="GRIDSOME_API_URL+r.headimage.url" style="width:100%;border-radius:5px;" />
              </el-card>
            </el-col>
          </el-row>
          <div style="text-align:center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="followTotal"
              :current-page="followPageIndex"
              :page-size="followPageSize"
              @current-change="onFollowPageChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Home>
</template>

<page-query>
query {
  fansData:allStrapiPeople(order:ASC){
    edges{
      node{
        id
        cname
        ename
        link
        follow
        headimage{
          url
        }
      }
    }
  }
  followData:allStrapiPeople(filter:{follow:{in:[true]}},order:ASC){
    edges{
      node{
        id
        cname
        ename
        link
        follow
        headimage{
          url
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  name: 'PeoplePage',
  metaInfo: {
    title: 'people',
  },
  data(){
    return {
      fansPageIndex:1,
      fansPageSize:9,
      followPageIndex:1,
      followPageSize:9,
    }
  },
  computed:{
    fans(){
      return this.$page.fansData.edges.map((item)=>{
        return item.node;
      })
    },
    fansTotal(){
      return this.fans.length;
    },
    showFans(){
      var pos = (this.fansPageIndex-1)*this.fansPageSize;
      return this.fans.slice(pos,pos+this.fansPageSize)
    },
    follow(){
      return this.$page.followData.edges.map((item)=>{
        return item.node;
      })
    },
    followTotal(){
      return this.follow.length;
    },
    showFollow(){
      var pos = (this.followPageIndex-1)*this.followPageSize;
      return this.follow.slice(pos,pos+this.followPageSize)
    },
    
  },
  created(){
  },
  mounted(){
  },
  methods:{
    onFansPageChange(index){
      this.fansPageIndex=index;
    },
    clickFans(people){
      this.$router.push('/person/'+people.id)
    },
    onFollowPageChange(index){
      this.followPageIndex=index;
    },
    clickFollow(people){
      this.$router.push('/person/'+people.id)
    },
  }
}
</script>

<style>

</style>