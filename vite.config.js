import process from 'node:process'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import path from 'path';

const pwaOptions = {
  mode: 'production',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'CAFELAB',
    short_name: 'Cafelab',
    theme_color: '#ffffff',
    screenshots: [
      {
        src: "/assets/screenshots/ss_wide.png",
        sizes: "2774x1498",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/assets/screenshots/ss_mobile.png",
        sizes: "852x1398",
        type: "image/png",
      },
    ],

    icons: [
      {
        src: 'assets/icons/144 20.56.00.png', // path to your 144px icon
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/assets/icons/512 20.56.00.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'assets/icons/512 20.56.00.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  devOptions: {
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = {__DATE__: new Date().toISOString()}
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  pwaOptions.manifest.name = 'PWA Inject Manifest'
  pwaOptions.manifest.short_name = 'PWA Inject'
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
  }
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaOptions)
  ],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    rollupOptions: {
      external: ['@vercel/speed-insights/react']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})