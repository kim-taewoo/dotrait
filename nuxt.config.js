const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/cal-heatmap/3.3.10/cal-heatmap.css' },
    ],
    script: [
      { src: "https://apis.google.com/js/api.js", defer: true},
      { src: "//d3js.org/d3.v3.min.js"},
      { src: "//cdn.jsdelivr.net/cal-heatmap/3.3.10/cal-heatmap.min.js"},
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl',"~assets/styles/main.css"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/pwa']
  ],

  transition: {
    name: "fade",
    mode: "out-in"
  },

  /*
  ** Build configuration
  */
  build: {

    babel: {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    },
    vendor: ["@babel/polyfill"],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
