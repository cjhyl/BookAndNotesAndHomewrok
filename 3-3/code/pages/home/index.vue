<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link class="nav-link" 
                  exact
                  :class="{active:tab=='your_feed'}"
                  :to="{
                    name:'home',
                    query:{
                      tab:'your_feed'
                    }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  exact
                  :class="{active:tab=='global_feed'}"
                  :to="{
                    name:'home'
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link"
                  exact
                  :class="{active:tab=='tag'}"
                  :to="{
                    name:'home',
                    query:{
                      tab:'tag',
                      tag:tag
                    }
                  }"
                >
                  {{ '#'+tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>


          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <!--<a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>-->
              <nuxt-link :to="{name:'profile',params:{username:article.author.username}}">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" class="author">
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :class="{active:article.favorited}" 
                @click="onFavorite(article)"
                :disabled="article.favoritDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!--
          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
          -->
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{active:item==page}" v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link" 
                :to="{name:'home',query:{
                  page:item,
                  tag:$route.query.tag,
                  tab:tab}}"
              >
              {{ item }}
              </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                :to="{name:'home',query:{tag:item,tab:'tag'}}" class="tag-pill tag-default"
                v-for="item in tags" :key="item"
              >
              {{ item }}
              </nuxt-link>
              <!-- <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a> -->
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { 
  getArticles, 
  getYourFeedArticles, 
  addFavorite, 
  deleteFavorite
} from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  async asyncData ( {query} ) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag

    const loadArticles = tab == 'your_feed' ? getYourFeedArticles : getArticles
    const [ articleRl, tagRl] = await Promise.all([
      loadArticles({
        limit,
        offset: (page -1) * limit,
        tag: query.tag
      }),
      getTags()
    ])

    const {articles, articlesCount} = articleRl.data
    const {tags} = tagRl.data

    articles.forEach(article=>article.favoritDisabled=false)
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tab,
      tag
    }
  },
  watchQuery:['page','tag','tab'],
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watch: {},
  created () {},
  mounted () {
    console.log('this.$store.state.user',this.$store.state.user,this)
  },
  methods: {
    async onFavorite (article) {
      article.favoritDisabled=true;
      if(article.favorited) {
        //取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      }else{
        //添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoritDisabled=false;
    }
  }
}
</script>

<style scoped>

</style>>