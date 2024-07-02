import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import viteImagemin from "vite-plugin-imagemin"
import resizeWebp from './plugins/vite-plugin-resize-webp'

export default {
    plugins: [
      vituum(),
      nunjucks({
        root: './src'
      }),
      tailwindcss(),
      resizeWebp(),
      viteImagemin(),
    ]
}