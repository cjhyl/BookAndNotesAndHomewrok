export default {
  router: {
    linkActiveClass: "active",
    // 自定义路由规则
    extendRoutes(routes, resolve) {
      //console.log('111',routes)
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              name:'home',
              path: '',
              component: resolve(__dirname, 'pages/home/'),
            },
            {
              name:'login',
              path: '/login',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              name:'register',
              path: '/register',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              name:'profile',
              path: '/profile/:username',
              component: resolve(__dirname, 'pages/profile/'),
            },
            {
              name:'settings',
              path: '/settings',
              component: resolve(__dirname, 'pages/settings/'),
            },
            {
              name:'editor',
              path: '/editor/:slug?',
              component: resolve(__dirname, 'pages/editor/'),
            },
            {
              name:'article',
              path: '/article/:slug',
              component: resolve(__dirname, 'pages/article/'),
            }
          ]
        }
      ])
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'pages/404.vue')
      // })
    }
  },
  telemetry: false,

  // server: {
  //   host: '',
  //   port: 3000
  // },

  plugins:[
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}