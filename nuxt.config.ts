// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ['@varlet/nuxt'],
    varlet: {
        modulePath: '...',
        exclude: ['...']
    },

    css: ['~/assets/css/main.css', 'cn-fontsource-lxgw-wen-kai-gb-screen/font.css'],
    // app: {
    //     head: {
    //         link: [{
    //             rel: 'stylesheet',
    //             href: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-gb-screen@1.0.6/font.min.css'
    //         }]
    //     }
    // },
})
