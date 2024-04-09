import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
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