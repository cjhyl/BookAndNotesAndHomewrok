<template>
  <el-card>
    <el-menu
      :default-active="selectPage"
      class="el-menu-vertical-demo"
      @select="handleSelect">
      <el-menu-item index="1">
          <i class="el-icon-star-off"></i>
          <span>最新动态</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-mobile-phone"></i>
        <span slot="title">社交圈</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">博客列表</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-service"></i>
        <span slot="title">开源项目</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
export default {
  name: 'leftNav',
  props:['navidx'],
  data(){
    return {
      selectPage:'-1',
      pagePaths: ['','/','/people','/blogs','/projects']
    }
  },
  mounted(){
    for(var i=1;i<this.pagePaths.length;i++){
      if(this.$route.path==this.pagePaths[i]){
        this.selectPage=''+i;
        break;
      }
    }
  },
  methods:{
    handleSelect(idx){
      var pagePaths = ['','/','/people','/blogs','/projects']
      if(this.$route.path==this.pagePaths[idx]){
        return;
      }
      this.$router.push(this.pagePaths[idx]);
    }
  },
}
</script>

<style>

</style>