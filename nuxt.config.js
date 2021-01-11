export default {
  server: {
    port: process.env.PORT, // default: 3000
    //host: '192.168.1.240' // default: localhost
    host: process.env.HOST //'localhost'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'BlackInfo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/app.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      suffix: true,
      icons: {
        regular: true
      }
    }],
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    'nuxt-validate'
  ],


  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  proxy: {
    '/auth': {
      target: process.env.API_URL + '/oauth',
      changeOrigin: process.env.PORT === 3000,
      headers: {
        //Authorization: "Basic MjpVNTFaQzM1SWwzaEpHS3NHb0FOTkp6cHBuUDlobHdGS2dDcHpmVFJS" // api.blackinfo.smykova-n.ru
        Authorization: "Basic MjpnOFJCS2FURjlSVENieDY0cHVGUWVuU29FYXg5dnZjQURGdGdIaUU0" // localhost 9-January
      },
      pathRewrite: {
        '^/auth' : '/'
      }
    },
    '/api': {
      target: process.env.API_URL + '/api',
      changeOrigin: process.env.PORT === 3000,
      pathRewrite: {
        '^/api' : '/'
      }
    },
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/clients'
    },
    strategies: {
      primary: {
        _scheme: "local",
        clientId: 2, // process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        endpoints: {
          login: { url: '/auth/token', method: 'post', propertyName: 'access_token'},
          logout: false,
          user: { url: '/api/user', method: 'get' },
        }
      }
    }
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: true
  },

  nuxtValidate: {
    lang: 'ru',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
