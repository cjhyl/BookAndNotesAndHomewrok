<template>
  <Home>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row>
            <el-col :span="16">
              {{person.cname}}
            </el-col>
            <el-col :span="8">
              <div style="float:right;">
                <el-button 
                  style="padding: 3px 0" 
                  icon="el-icon-d-arrow-left" 
                  type="text"
                  @click="goPeople"
                >
                  返回
                </el-button>
              </div>
            </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="9" style="padding: 0px 10px 20px 0px;">
          <img :src="GRIDSOME_API_URL+(person.headimage?person.headimage.url:'')" style="width: 100%; border-radius: 5px;">
          <div style="padding: 10px;"><font style="font-size: 26px; line-height: 40px; font-weight: 600;">
            {{person.cname}}<br>
          </font> 
          <font style="font-size: 20px; font-style: normal; font-weight: 300; line-height: 35px; color: rgb(102, 102, 102);">
            {{person.ename}}<br>
          </font> 
          <font style="font-size: 14px; line-height: 20px; color: rgb(96, 98, 102);">
            <i class="el-icon-location-outline"></i>&nbsp;&nbsp;
            {{person.position}}<br>
          </font>
          <font style="font-size: 14px; color: rgb(96, 98, 102);">
            <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
            <a :href="'https://'+person.link" target="_blank">{{person.link}}</a><br>
          </font></div>
        </el-col>
        <el-col :span="15" style="padding: 0px 20px 20px 10px;">
          <div style="width: 100%; min-height: 300px; border-radius: 5px; border: 1px solid rgb(235, 238, 245); padding: 10px; font-size: 16px; color: rgb(106, 115, 125);">
            {{person.description}}
          </div>
        </el-col>
      </el-row>
    </el-card>
  </Home>
</template>

<page-query>
query ($id: ID!) {
  person: strapiPeople (id: $id) {
    id
    cname
    ename
    link
    position
    description
    headimage{
      url
    }
  }
}
</page-query>

<script>

export default {
  name: 'personPage',
  metaInfo() {
    return {
      title: this.$route.params.id,
    }
  },
  computed:{
    person(){
      return this.$page.person;
    }
  },
  mounted(){
  },
  methods:{
    goPeople(){
      this.$router.push('/people')
    }
  }
}
</script>

<style>
  .datetime{font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);}
  .content{font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;}
</style>