import fs from 'fs';
import path from 'path';
import resizeImage from './lib/resizeImage';

const resizeWebp = (options = {}) => {
  const inputDir = path.resolve(__dirname, '../../public/src');
  const outputDir = path.resolve(__dirname, '../../public/opt');

  const getAllFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
  
    files.forEach(file => {
      const filePath = path.join(dir, file);
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
      const relativePath = path.relative(inputDir, file);
      const outputFile = path.join(outputDir, relativePath);

      const outputDirPath = path.dirname(outputFile);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      await resizeImage(file, outputFile);
    }

    console.log('Images have been resized to half their original width');
  };

  const deleteFilesInDirectory = (dirPath) => {
    // ディレクトリが存在するか確認
    if (fs.existsSync(dirPath)) {
      // ディレクトリ内のすべてのファイルを取得
      const files = fs.readdirSync(dirPath);
  
      // 各ファイルを削除
      for (const file of files) {
        const filePath = path.join(dirPath, file);
  
        // ファイルがディレクトリの場合は再帰的に削除
        if (fs.statSync(filePath).isDirectory()) {
          // ディレクトリの場合は再帰的に削除
          deleteFilesInDirectory(filePath);
          fs.rmdirSync(filePath); // ディレクトリ自体を削除
        } else {
          // ファイルの場合は削除
          fs.unlinkSync(filePath);
        }
      }
    } else {
      console.log(`Directory ${dirPath} does not exist.`);
    }
  };

  return {
    name: 'vite-plugin-resize-webp',
    // apply: 'serve',
    configureServer(server) {
      server.watcher.add(inputDir);
      server.watcher.on('add', async (file) => {
        if (isImage(file)) {
          const relativePath = path.relative(inputDir, file);
          const outputFile = path.join(outputDir, relativePath);

          if(/public\/src/.test(file) && /public\/opt/.test(outputFile)) {
            await resizeImage(file, outputFile);
            console.log(`Image added and resized: ${file}`);
          };
        }
      });

      server.watcher.on('change', async (file) => {
        if (isImage(file)) {
          const relativePath = path.relative(inputDir, file);
          const outputFile = path.join(outputDir, relativePath);

          if(/public\/src/.test(file) && /public\/opt/.test(outputFile)) {
            await resizeImage(file, outputFile);
            console.log(`Image changed and resized: ${file}`);
          }
        }
      });
    },
    async buildStart() {
      console.log(this)
      if(!this.meta.watchMode) {
        deleteFilesInDirectory(outputDir);
      }
      // イメージ処理が終わるまでawaitしておいて、image-minで圧縮しながら転送する
      await processImages();
    },
  };
};

export default resizeWebp;
