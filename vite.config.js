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
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Garden LLC',
        short_name: 'MyGarden',
        description: 'Professional gardening services',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/', 
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
        skipWaiting: true, 
        clientsClaim: true, 
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/db-api-mygarden-llc\.onrender\.com\/api/, 
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
