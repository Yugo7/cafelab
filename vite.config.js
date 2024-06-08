import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        "name": "Cafelab Store",
        "short_name": "Cafelab",
        "description": "CafeLab PWA ",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "background_color": "#fdfdfd",
        "theme_color": "#db4938",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "/assets/192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/assets/256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/assets/512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/assets/144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      },
      workbox: {
        // workbox options for generateSW
      }
    })
  ]
})