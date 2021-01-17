<template>
  <Layout>
    <div class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right:10px;">
          <leftNav :navidx="navIdx">
          </leftNav>
        </el-col>
        <el-col :span="18" style="padding-left:10px;">
          <slot />
        </el-col>
      </el-row>
    </div>
  </Layout>
</template>
<script>
// import { Pager } from 'gridsome'
import leftNav from '../components/leftNav'

export default {
  name: 'HomeLayout',
  data(){
    return {
      navIdx:'1'
    }
  },
  mounted(){
  },
  components:{
    // Pager
    leftNav
  }
}
</script>

<style>
</style>
