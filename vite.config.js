import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import viteImagemin from "vite-plugin-imagemin"
import resizeWebp from './plugins/vite-plugin-resize-webp'
import autoprefixer from 'autoprefixer'
import eslint from 'vite-plugin-eslint'

export default {
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  plugins: [
    vituum(),
    nunjucks({
      root: './src/includes'
    }),
    eslint(),
    tailwindcss(),
    resizeWebp(),
    viteImagemin(),
  ]
}