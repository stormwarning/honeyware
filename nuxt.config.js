import pkg from './package'

export default {
    mode: 'universal',

    /**
      Headers of the page
     */
    head: {
        htmlAttrs: { class: 'grey-000 bg-grey-900' },
        title: 'Honeyware',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description,
            },
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css',
            },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    /**
      Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /**
      Global CSS
     */
    css: ['~assets/css/main.css'],

    /**
      Plugins to load before mounting the App
     */
    plugins: [],

    /**
      Nuxt.js modules
     */
    modules: ['@nuxtjs/pwa'],

    /**
      Build configuration
     */
    build: {
        postcss: {
            plugins: {
                // https://github.com/jonathantneal/postcss-advanced-variables#features
                // 'postcss-advanced-variables': {},

                // https://preset-env.cssdb.org/features
                'postcss-preset-env': {
                    stage: 0,
                },
            },
        },
        // Extend webpack config here
        extend(config, ctx) {
            // Run ESLint on save
            // if (ctx.isDev && ctx.isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/,
            //     })
            // }
        },
    },
}
