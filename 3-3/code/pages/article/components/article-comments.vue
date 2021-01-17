!<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody" required></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" 
          @click="onComment" 
          :disabled="commentDisabled"
        >
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" 
          :to="{
            name:'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link href="" class="comment-author"
          :to="{
            name:'profile',
            params: {
              username: comment.author.username
            }
          }" 
        >
          {{comment.author.username}}
        </nuxt-link>
        <span class="date-posted">{{ comment.createAt | date('MMM DD, YYYY') }}</span>
        <span v-if="comment.author.username==user.username" 
          class="mod-options" 
          @click="onCommentDel(comment.id)"
        >
          <i class="ion-trash-a" ></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name:'ArticleComments',
  props:{
    article:{
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments:[],//回复列表
      commentBody:'',
      commentDisabled:false,
      delCommentDisabled:false,
      followDisabled:false,
      favoriteDisabled:false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    this.loadComments()
  },
  methods:{
    //读取回复列表
    async loadComments(){
      const {data} = await getComments(this.article.slug)
      console.log('ArticleComments',data)
      console.log('articleData',this.article,this.user)
      this.comments = data.comments
    },
    //提交回复
    async onComment(){
      this.commentDisabled = true
      await addComment({
        slug:this.article.slug,
        body:this.commentBody
      })
      this.commentBody=""
      this.loadComments()
      this.commentDisabled = false
    },
    //删除回复
    async onCommentDel(id){
      if(this.delCommentDisabled){
        return;
      }
      this.delCommentDisabled = true
      await deleteComment({
        slug:this.article.slug,
        id:id
      })
      this.loadComments()
      this.delCommentDisabled = false
    }
  }
}
</script>

<style>

</style>