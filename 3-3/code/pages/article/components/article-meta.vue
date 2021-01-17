!<template>
  <div class="article-meta">
    <nuxt-link 
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link 
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
       class="author"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="!isMine">
      <button class="btn btn-sm"
        :class="{'btn-secondary':article.author.following,'btn-outline-secondary':!article.author.following}"
        :disabled="followDisabled"
        @click="doFollow(article)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{article.author.following?'Unfollow':'Follow'}} {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary"
        :class="{active:article.favorited}"
        :disabled="favoriteDisabled"
        @click="doFavorite(article)"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
    <template v-if="isMine">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
        :to="{
          name:'editor',
          params: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm"
        :class="{active:article.favorited}"
        :disabled="deleteDisabled"
        @click="doDelete(article)"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { followUser, unfollowUser } from '@/api/profile'
import { mapState } from 'vuex'

export default {
  name: 'articleMeta',
  props:{
    article:{
      type: Object,
      required: true
    }
  },
  data () {
    return {
      followDisabled:false,
      favoriteDisabled:false,
      deleteDisabled:false
    }
  },
  computed: {
    ...mapState(['user']),
    isMine () {
      return this.user.username == this.article.author.username
    }
  },
  mounted(){
    console.log('this.article',this.article,this.isMine)
  },
  methods:{
    //关注 取消关注
    async doFollow(article){
      this.followDisabled = true;
      if(article.author.following){
        //取消关注
        await unfollowUser(article.author.username)
        article.author.following = false
      }else{
        //关注
        await followUser(article.author.username)
        article.author.following = true
      }
      this.followDisabled = false;
    },
    //点赞 取消点赞
    async doFavorite(article){
      this.favoriteDisabled=true;
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
      this.favoriteDisabled=false;
    },
    //删除文章
    async doDelete(article){
      this.deleteDisabled=true;
      await deleteArticle(article.slug)
      this.deleteDisabled=false;
      //跳转首页
      this.$router.push({name:'home'});
    }
  }
}
</script>

<style>

</style>