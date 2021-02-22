export default {
  server: {
    port: process.env.PORT, // default: 3000
    //host: '192.168.1.240' // default: localhost
    host: process.env.HOST //'localhost'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'BlackInfo – черный список соискателей',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'mailru-domain', content: '1xIl6GDBllDwSAZv' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/app.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/silentbox.js',
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
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/markdownit',
    'bootstrap-vue/nuxt',
    'nuxt-validate',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '72774967',
        webvisor: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ]
  ],


  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  proxy: {
    '/auth': {
      target: process.env.API_URL + '/oauth',
      changeOrigin: process.env.AUTH_CHANGE_ORIGIN === 'true', //process.env.PORT === 3000,
      headers: {
        Authorization: "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64')
      },
      pathRewrite: {
        '^/auth' : '/'
      }
    },
    '/api': {
      target: process.env.API_URL + '/api',
      changeOrigin: process.env.API_CHANGE_ORIGIN === 'true',
      pathRewrite: {
        '^/api' : '/'
      }
    },
    '/storage': {
      target: process.env.API_URL + '/storage',
      changeOrigin: process.env.API_CHANGE_ORIGIN === 'true',
      pathRewrite: {
        '^/storage' : '/'
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
        //clientId: 2, // process.env.CLIENT_ID,
        //clientSecret: process.env.CLIENT_SECRET,
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

  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      //'markdown-it-container',
    ],
  },

  nuxtValidate: {
    lang: 'ru',
  },

  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
