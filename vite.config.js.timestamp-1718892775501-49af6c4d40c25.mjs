// vite.config.js
import vituum from "file:///Users/nyc/Dropbox/project/applabo/applabo-env-static/node_modules/vituum/src/index.js";
import twig from "file:///Users/nyc/Dropbox/project/applabo/applabo-env-static/node_modules/@vituum/vite-plugin-twig/index.js";
import tailwindcss from "file:///Users/nyc/Dropbox/project/applabo/applabo-env-static/node_modules/@vituum/vite-plugin-tailwindcss/index.js";
import viteImagemin from "file:///Users/nyc/Dropbox/project/applabo/applabo-env-static/node_modules/vite-plugin-imagemin/dist/index.mjs";

// plugins/vite-plugin-resize-webp/serve.js
import fs from "fs";
import path2 from "path";

// plugins/vite-plugin-resize-webp/lib/resizeImage.js
import path from "path";
import sharp from "file:///Users/nyc/Dropbox/project/applabo/applabo-env-static/node_modules/sharp/lib/index.js";
var resizeImage = async (file, outputFile) => {
  const basename = path.basename(file);
  const extname = path.extname(file);
  if (/(png|jpe?g|gif)/.test(extname)) {
    if (/@2x\.(png|jpe?g|gif)$/.test(basename)) {
      const image = sharp(file);
      const metadata = await image.metadata();
      const halfWidth = Math.floor(metadata.width / 2);
      const webp = await sharp(file).resize(halfWidth).webp().toFile(outputFile.replace(/@2x\.((png|jpe?g|gif))$/, "@1x.webp"));
      await sharp(file).resize(halfWidth).toFile(outputFile.replace("@2x.", "@1x."));
    }
    await sharp(file).toFile(outputFile);
    await sharp(file).webp().toFile(outputFile.replace(extname, ".webp"));
  } else {
    await sharp(file).toFile(outputFile);
  }
};
var resizeImage_default = resizeImage;

// plugins/vite-plugin-resize-webp/serve.js
var __vite_injected_original_dirname = "/Users/nyc/Dropbox/project/applabo/applabo-env-static/plugins/vite-plugin-resize-webp";
var resizeWebp = (options = {}) => {
  const inputDir = path2.resolve(__vite_injected_original_dirname, "../../public/src");
  const outputDir = path2.resolve(__vite_injected_original_dirname, "../../public/opt");
  const getAllFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path2.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        fileList = getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
    return fileList;
  };
  const isImage = (file) => /\.(png|jpe?g|gif|svg)$/.test(file);
  const processImages = async () => {
    const files = getAllFiles(inputDir);
    const imageFiles = files.filter(isImage);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    for (const file of imageFiles) {
      const relativePath = path2.relative(inputDir, file);
      const outputFile = path2.join(outputDir, relativePath);
      const outputDirPath = path2.dirname(outputFile);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      await resizeImage_default(file, outputFile);
    }
    console.log("Images have been resized to half their original width");
  };
  return {
    name: "vite-plugin-resize-webp",
    apply: "serve",
    configureServer(server) {
      server.watcher.add(inputDir);
      server.watcher.on("add", async (file) => {
        if (isImage(file)) {
          const relativePath = path2.relative(inputDir, file);
          const outputFile = path2.join(outputDir, relativePath);
          if (/public\/src/.test(file) && /public\/opt/.test(outputFile)) {
            console.log(file);
            await resizeImage_default(file, outputFile);
            console.log(`Image added and resized: ${file}`);
          }
          ;
        }
      });
      server.watcher.on("change", async (file) => {
        if (isImage(file)) {
          const relativePath = path2.relative(inputDir, file);
          const outputFile = path2.join(outputDir, relativePath);
          if (/public\/src/.test(outputFile)) return;
          await resizeImage_default(file, outputFile);
          console.log(`Image changed and resized: ${file}`);
        }
      });
    },
    async buildEnd() {
      await processImages();
    }
  };
};
var serve_default = resizeWebp;

// vite.config.js
var vite_config_default = {
  plugins: [
    vituum(),
    twig(),
    tailwindcss(),
    serve_default(),
    viteImagemin()
  ]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1yZXNpemUtd2VicC9zZXJ2ZS5qcyIsICJwbHVnaW5zL3ZpdGUtcGx1Z2luLXJlc2l6ZS13ZWJwL2xpYi9yZXNpemVJbWFnZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9ueWMvRHJvcGJveC9wcm9qZWN0L2FwcGxhYm8vYXBwbGFiby1lbnYtc3RhdGljXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbnljL0Ryb3Bib3gvcHJvamVjdC9hcHBsYWJvL2FwcGxhYm8tZW52LXN0YXRpYy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbnljL0Ryb3Bib3gvcHJvamVjdC9hcHBsYWJvL2FwcGxhYm8tZW52LXN0YXRpYy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB2aXR1dW0gZnJvbSAndml0dXVtJ1xuaW1wb3J0IHR3aWcgZnJvbSAnQHZpdHV1bS92aXRlLXBsdWdpbi10d2lnJ1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B2aXR1dW0vdml0ZS1wbHVnaW4tdGFpbHdpbmRjc3MnXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZW1pblwiXG5pbXBvcnQgcmVzaXplV2VicCBmcm9tICcuL3BsdWdpbnMvdml0ZS1wbHVnaW4tcmVzaXplLXdlYnAvc2VydmUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2aXR1dW0oKSxcbiAgICAgIHR3aWcoKSxcbiAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgICByZXNpemVXZWJwKCksXG4gICAgICB2aXRlSW1hZ2VtaW4oKSxcbiAgICBdXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbnljL0Ryb3Bib3gvcHJvamVjdC9hcHBsYWJvL2FwcGxhYm8tZW52LXN0YXRpYy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXJlc2l6ZS13ZWJwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbnljL0Ryb3Bib3gvcHJvamVjdC9hcHBsYWJvL2FwcGxhYm8tZW52LXN0YXRpYy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXJlc2l6ZS13ZWJwL3NlcnZlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ueWMvRHJvcGJveC9wcm9qZWN0L2FwcGxhYm8vYXBwbGFiby1lbnYtc3RhdGljL3BsdWdpbnMvdml0ZS1wbHVnaW4tcmVzaXplLXdlYnAvc2VydmUuanNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVzaXplSW1hZ2UgZnJvbSAnLi9saWIvcmVzaXplSW1hZ2UnO1xuXG5jb25zdCByZXNpemVXZWJwID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBpbnB1dERpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wdWJsaWMvc3JjJyk7XG4gIGNvbnN0IG91dHB1dERpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wdWJsaWMvb3B0Jyk7XG5cbiAgY29uc3QgZ2V0QWxsRmlsZXMgPSAoZGlyLCBmaWxlTGlzdCA9IFtdKSA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpO1xuXG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRpciwgZmlsZSk7XG4gICAgICBpZiAoZnMuc3RhdFN5bmMoZmlsZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgZmlsZUxpc3QgPSBnZXRBbGxGaWxlcyhmaWxlUGF0aCwgZmlsZUxpc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZUxpc3QucHVzaChmaWxlUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZUxpc3Q7XG4gIH07XG5cbiAgY29uc3QgaXNJbWFnZSA9IGZpbGUgPT4gL1xcLihwbmd8anBlP2d8Z2lmfHN2ZykkLy50ZXN0KGZpbGUpO1xuXG4gIGNvbnN0IHByb2Nlc3NJbWFnZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSBnZXRBbGxGaWxlcyhpbnB1dERpcik7XG4gICAgY29uc3QgaW1hZ2VGaWxlcyA9IGZpbGVzLmZpbHRlcihpc0ltYWdlKTtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXRwdXREaXIpKSB7XG4gICAgICBmcy5ta2RpclN5bmMob3V0cHV0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgaW1hZ2VGaWxlcykge1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5yZWxhdGl2ZShpbnB1dERpciwgZmlsZSk7XG4gICAgICBjb25zdCBvdXRwdXRGaWxlID0gcGF0aC5qb2luKG91dHB1dERpciwgcmVsYXRpdmVQYXRoKTtcblxuICAgICAgY29uc3Qgb3V0cHV0RGlyUGF0aCA9IHBhdGguZGlybmFtZShvdXRwdXRGaWxlKTtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXRwdXREaXJQYXRoKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMob3V0cHV0RGlyUGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHJlc2l6ZUltYWdlKGZpbGUsIG91dHB1dEZpbGUpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdJbWFnZXMgaGF2ZSBiZWVuIHJlc2l6ZWQgdG8gaGFsZiB0aGVpciBvcmlnaW5hbCB3aWR0aCcpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZpdGUtcGx1Z2luLXJlc2l6ZS13ZWJwJyxcbiAgICBhcHBseTogJ3NlcnZlJyxcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICBzZXJ2ZXIud2F0Y2hlci5hZGQoaW5wdXREaXIpO1xuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2FkZCcsIGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgIGlmIChpc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5yZWxhdGl2ZShpbnB1dERpciwgZmlsZSk7XG4gICAgICAgICAgY29uc3Qgb3V0cHV0RmlsZSA9IHBhdGguam9pbihvdXRwdXREaXIsIHJlbGF0aXZlUGF0aCk7XG5cbiAgICAgICAgICBpZigvcHVibGljXFwvc3JjLy50ZXN0KGZpbGUpICYmIC9wdWJsaWNcXC9vcHQvLnRlc3Qob3V0cHV0RmlsZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xuICAgICAgICAgICAgYXdhaXQgcmVzaXplSW1hZ2UoZmlsZSwgb3V0cHV0RmlsZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgSW1hZ2UgYWRkZWQgYW5kIHJlc2l6ZWQ6ICR7ZmlsZX1gKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2NoYW5nZScsIGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgIGlmIChpc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5yZWxhdGl2ZShpbnB1dERpciwgZmlsZSk7XG4gICAgICAgICAgY29uc3Qgb3V0cHV0RmlsZSA9IHBhdGguam9pbihvdXRwdXREaXIsIHJlbGF0aXZlUGF0aCk7XG5cbiAgICAgICAgICBpZigvcHVibGljXFwvc3JjLy50ZXN0KG91dHB1dEZpbGUpKSByZXR1cm47XG4gICAgICAgICAgYXdhaXQgcmVzaXplSW1hZ2UoZmlsZSwgb3V0cHV0RmlsZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coYEltYWdlIGNoYW5nZWQgYW5kIHJlc2l6ZWQ6ICR7ZmlsZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhc3luYyBidWlsZEVuZCgpIHtcbiAgICAgIGF3YWl0IHByb2Nlc3NJbWFnZXMoKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXNpemVXZWJwO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbnljL0Ryb3Bib3gvcHJvamVjdC9hcHBsYWJvL2FwcGxhYm8tZW52LXN0YXRpYy9wbHVnaW5zL3ZpdGUtcGx1Z2luLXJlc2l6ZS13ZWJwL2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL255Yy9Ecm9wYm94L3Byb2plY3QvYXBwbGFiby9hcHBsYWJvLWVudi1zdGF0aWMvcGx1Z2lucy92aXRlLXBsdWdpbi1yZXNpemUtd2VicC9saWIvcmVzaXplSW1hZ2UuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL255Yy9Ecm9wYm94L3Byb2plY3QvYXBwbGFiby9hcHBsYWJvLWVudi1zdGF0aWMvcGx1Z2lucy92aXRlLXBsdWdpbi1yZXNpemUtd2VicC9saWIvcmVzaXplSW1hZ2UuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5cbmNvbnN0IHJlc2l6ZUltYWdlID0gYXN5bmMgKGZpbGUsIG91dHB1dEZpbGUpID0+IHtcbiAgY29uc3QgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGUpO1xuICBjb25zdCBleHRuYW1lID0gcGF0aC5leHRuYW1lKGZpbGUpO1xuXG4gIGlmKC8ocG5nfGpwZT9nfGdpZikvLnRlc3QoZXh0bmFtZSkpIHtcbiAgICAvLyBAMnhcdTMwNENcdTMwNDJcdTMwOEJcdTU4MzRcdTU0MDhcbiAgICBpZiAoL0AyeFxcLihwbmd8anBlP2d8Z2lmKSQvLnRlc3QoYmFzZW5hbWUpKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IHNoYXJwKGZpbGUpO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBpbWFnZS5tZXRhZGF0YSgpO1xuICAgICAgY29uc3QgaGFsZldpZHRoID0gTWF0aC5mbG9vcihtZXRhZGF0YS53aWR0aCAvIDIpO1xuXG4gICAgICBjb25zdCB3ZWJwID0gYXdhaXQgc2hhcnAoZmlsZSlcbiAgICAgICAgLnJlc2l6ZShoYWxmV2lkdGgpXG4gICAgICAgIC53ZWJwKClcbiAgICAgICAgLnRvRmlsZShvdXRwdXRGaWxlLnJlcGxhY2UoL0AyeFxcLigocG5nfGpwZT9nfGdpZikpJC8sICdAMXgud2VicCcpKTtcblxuICAgICAgYXdhaXQgc2hhcnAoZmlsZSlcbiAgICAgICAgLnJlc2l6ZShoYWxmV2lkdGgpXG4gICAgICAgIC50b0ZpbGUob3V0cHV0RmlsZS5yZXBsYWNlKCdAMnguJywgJ0AxeC4nKSk7XG4gICAgfVxuXG4gICAgYXdhaXQgc2hhcnAoZmlsZSlcbiAgICAgIC50b0ZpbGUob3V0cHV0RmlsZSk7XG5cbiAgICBhd2FpdCBzaGFycChmaWxlKVxuICAgICAgLndlYnAoKVxuICAgICAgLnRvRmlsZShvdXRwdXRGaWxlLnJlcGxhY2UoZXh0bmFtZSwgJy53ZWJwJykpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IHNoYXJwKGZpbGUpXG4gICAgICAudG9GaWxlKG91dHB1dEZpbGUpO1xuICB9XG5cbiAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXNpemVJbWFnZTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLE9BQU8sWUFBWTtBQUNwVyxPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxrQkFBa0I7OztB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
