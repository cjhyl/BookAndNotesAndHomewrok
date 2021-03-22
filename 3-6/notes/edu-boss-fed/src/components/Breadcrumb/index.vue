<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="route in routeRecords"
      :key="route.path"
    >{{ route.meta && route.meta.title }}</el-breadcrumb-item>
    <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>

<script lang="ts">
// import { RouteRecord } from 'node_modules/vue-router/types'
import Vue from 'vue'

export default Vue.extend({
  name: 'Breadcrumb',
  data () {
    return {
      // routeRecords: [] as RouteRecord[]
    }
  },
  computed: {
    routeRecords () {
      return this.$route.matched
    }
  }
  // watch: {
  //   $route () {
  //     this.getRouteRecords()
  //   }
  // },
  // created () {
  //   this.getRouteRecords()
  // },
  // methods: {
  //   getRouteRecords () {
  //     this.routeRecords = this.$route.matched
  //     // this.$route.matched[0]
  //     // console.log(records)
  //   }
  // }
})
</script>
