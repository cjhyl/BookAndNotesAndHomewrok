<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>

            <button 
              v-if="profile.username != $store.state.user.username"
              class="btn btn-sm action-btn"
              :class="{'btn-secondary':profile.following,'btn-outline-secondary':!profile.following}"
              :disabled="followDisabled"
              @click="doFollow(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{profile.following?'Unfollow':'Follow'}} {{profile.username}}
            </button>

            <nuxt-link v-if="profile.username == $store.state.user.username" class="btn btn-sm btn-outline-secondary action-btn" :to="{name:'settings'}">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  exact 
                  :class="{active:tab=='mine'}" 
                  :to="{
                    name:'profile',
                    params: {
                      username: profile.username
                    }
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  exact 
                  :class="{active:tab=='favorites'}" 
                  :to="{
                    name:'profile',
                    query:{
                      tab:'favorites'
                    },
                    params: {
                      username: profile.username
                    }
                  }"
                >
                  Favorited Articles
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
import { getProfile, followUser, unfollowUser } from '@/api/profile'
export default {
  // 在路由匹配组件渲染之前先执行中间件
  middleware: 'authenticated',
  name: 'UserProfile',
  async asyncData ( {params,query} ) {
    const profileData = await getProfile(params.username)
    
    const {profile} = profileData.data
    const queryData = {
      limit: 20,
      offset: 0
    } 
    const tab = query.tab || 'mine'//favorites
    tab == 'mine' ? queryData.author = profile.username : queryData.favorited = profile.username
    const articlesData = await getArticles(queryData)
    const {articles} = articlesData.data
    return {
      profile,
      tab,
      articles
    }
  },
  watchQuery:['tab'],
  computed: {},
  props: {},
  data () {
    return {
      followDisabled:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    //点赞 取消点赞
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
    },
    //关注 取消关注
    async doFollow(profile){
      this.followDisabled = true;
      if(profile.following){
        //取消关注
        await unfollowUser(profile.username)
        profile.following = false
      }else{
        //关注
        await followUser(profile.username)
        profile.following = true
      }
      this.followDisabled = false;
    },
  }
}
</script>

<style scoped>

</style>>