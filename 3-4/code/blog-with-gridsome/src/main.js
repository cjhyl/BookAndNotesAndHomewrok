// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
// import './assets/css/index.css'

import DefaultLayout from '~/layouts/Default.vue'
import HomeLayout from '~/layouts/Home.vue'
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css';

export default function (Vue, { router, head, isClient }) {
  Vue.use(ElementUI);
  Vue.use(VueClipboard);
  Vue.mixin({
    data () {
      return {
        GRIDSOME_API_URL: process.env.GRIDSOME_API_URL,
        MY_URL: '',
      }
    }
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Home', HomeLayout)
}
