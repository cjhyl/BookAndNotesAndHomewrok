<template>
  <Layout>

    <!-- Page Header -->
    <header class="masthead" :style="{backgroundImage: `url(${GRIDSOME_API_URL+(general.cover?general.cover.url:'')})`}">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{ general.title }}</h1>
              <span class="subheading">{{ general.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview" v-for="edge in $page.posts.edges" :key="edge.node.id">
            <g-link :to="'/post/'+edge.node.id">
              <h2 class="post-title">
                {{ edge.node.title }}
              </h2>
              <h3 class="post-subtitle">
                {{ edge.node.content}}
              </h3>
            </g-link>
            <p class="post-meta">Posted by
              <a href="#">{{ edge.node.author.title}}</a>
              on {{edge.node.created_at}}
            </p>
            <p>
              <span v-for="tag in edge.node.tags" :key="tag.id">
                <g-link :to="'/tag/'+tag.id" >{{ tag.title }}</g-link>
              </span>
            </p>
          </div>
          <hr>
          <!-- Pager -->
          <Pager :info="$page.posts.pageInfo" />
          <!-- <div class="clearfix">
            <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
          </div> -->
        </div>
      </div>
    </div>

  </Layout>
</template>
<page-query>
query ($page: Int) {
  posts: allStrapiPost(perPage: 2, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
        id
        title
        content
        tags{
          id
          title
        }
        author{
          id
          title
        }
        created_at
      }
    }
  }
  general:allStrapiGeneral{
    edges{
      node{
        id
        title
        subtitle
        cover{
          url
        }
      }
    }
  }
}
</page-query>


<script>
import { Pager } from 'gridsome'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  name: 'HomePage',
  components:{
    Pager
  },
  computed:{
    general(){
      return this.$page.general.edges[0].node
    }
  },
  mounted(){
    // console.log('GRIDSOME_API_URL',this.GRIDSOME_API_URL)
  }
}
</script>

<style>
</style>
