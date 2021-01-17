<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(val,key) in err">
              <li v-for="(r,i) in val" :key="i">
                {{key}} {{r}}
              </li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input :disabled="disabled" v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input :disabled="disabled" v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea :disabled="disabled" v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input :disabled="disabled" v-model="tag" type="text" @keypress="addTag($event)" class="form-control" placeholder="Enter tags">
                  <div class="tag-list">
                    <span v-for="(r,i) in article.tagList" :key="i" class="tag-default tag-pill">
                      <i class="ion-close-round" @click="removeTag(tag)"></i>
                      {{r}}
                    </span>
                  </div>
              </fieldset>
              <button :disabled="disabled" @click="onSubmit" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {createArticle, updateArticle, getArticle} from '@/api/article'
export default {
  // 在路由匹配组件渲染之前先执行中间件
  middleware: 'authenticated',
  name: 'Editor',
  components: {},
  props: {},
  data () {
    return {
      tag: '',
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      },
      disabled:false,
      slug:'',
      err: {}//错误信息
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.slug = this.$route.params.slug
    if(this.slug){
      this.loadArticle(this.slug)
    }
  },
  methods: {
    //添加标签
    addTag (e) {
      if (e.keyCode != 13) return
      if(!this.tag) return
      let list = this.article.tagList
      if(list.includes(this.tag)) return
      this.article.tagList.push(this.tag)
      this.tag = ""
    },
    //移除标签
    removeTag(tag){
      let list = this.article.tagList
      let idx = list.indexOf(tag)
      list.splice(idx,1)
    },
    //编辑、创建文章
    async onSubmit () {
      this.disabled = true
      try {
        
        const {data} = this.slug
        ?await updateArticle(this.slug,{article: this.article})//编辑文章
        :await createArticle({article: this.article})//创建文章
        //跳转页面
        this.$router.push({
          name:'article',
          params: {
            slug: data.article.slug
          }
        });
      } catch (error) {
        console.dir(error);
        this.err = error.response.data.errors
      }
      this.disabled = false
    },
    async loadArticle (slug) {
      this.disabled = true
      const {data} = await getArticle(slug)
      this.article = data.article
      this.disabled = false
    }
  }
}
</script>

<style scoped>

</style>>