// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'cjhyl',
  plugins: [
    {//读取本地md文件中的数据
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: './content/blog/**/*.md',
      }
    },
    {//使用strapi数据
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['people', 'blogs', 'projects'],//StrapiPost
        singleTypes: ['homedata'],//单个节点
        // typeName: 'Strapi',//默认类型
        // singleTypes: ['impressum'],//单个节点
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    StrapiPeople: [
      {
        path: '/person/:id',
        component: './src/templates/person.vue'
      }
    ],
    StrapiBlogs: [
      {
        path: '/blog/:id',
        component: './src/templates/blog.vue'
      }
    ],
    StrapiProjects: [
      {
        path: '/project/:id',
        component: './src/templates/project.vue'
      }
    ]
  }
}
