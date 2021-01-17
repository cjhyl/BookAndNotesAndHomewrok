<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!--<a class="navbar-brand" href="index.html">conduit</a>-->
        <nuxt-link class="navbar-brand" :to="{name:'home'}">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!--<a class="nav-link active" href="">Home</a>-->
            <nuxt-link class="nav-link" :to="{name:'home'}" exact>Home</nuxt-link>
          </li>

          <template v-if="user">
            <li class="nav-item">
              <!--<a class="nav-link" href="">
                <i class="ion-compose"></i>&nbsp;New Post
              </a>-->
              <nuxt-link class="nav-link" :to="{name:'editor'}">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!--<a class="nav-link" href="">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a>-->
              <nuxt-link class="nav-link" :to="{name:'settings'}">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'profile',params:{username:user.username}}">
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <!--<a class="nav-link" href="">Sign up</a>-->
              <nuxt-link class="nav-link" :to="{name:'login'}">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <!--<a class="nav-link" href="">Sign up</a>-->
              <nuxt-link class="nav-link" :to="{name:'register'}">Sign up</nuxt-link>
            </li>
          </template>
          
        </ul>
      </div>
    </nav>
    <!-- 顶部导航栏 end-->

    <!-- 子路由 -->
    <nuxt-child />
    <!-- 子路由 end -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <!--<a href="/" class="logo-font">conduit</a>-->
        <nuxt-link :to="{name:'home'}" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- 底部 end-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>

</style>>