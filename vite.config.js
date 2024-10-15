// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vuetify from 'vite-plugin-vuetify'

// const path = require('path')

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
//     vuetify({
//       autoImport: true,
//     }),
//   ],
//   define: { 'process.env': {} },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
//   resolve: {
//     extensions: [
//       '.js',
//       '.json',
//       '.jsx',
//       '.mjs',
//       '.ts',
//       '.tsx',
//       '.vue',
//     ]
//   },
//   */
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa' // Importa el plugin PWA

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza automáticamente el service worker cuando se publique una nueva versión
      manifest: {
        name: 'My Garden LLC',
        short_name: 'MyGarden',
        description: 'Professional gardening services',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone', // Se comporta como una app independiente
        start_url: '/', // La URL de inicio de la PWA
        icons: [
          {
            src: '/img/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },  
          {
            src: '/img/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/img/icons/180x180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        skipWaiting: true, // Actualiza el service worker inmediatamente
        clientsClaim: true, // Reclama el control de las pestañas abiertas inmediatamente
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/db-api-mygarden-llc\.onrender\.com\/api/, // Actualiza el patrón de la URL de tu API
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400 // 1 día
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
              }
            }
          }
        ]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
