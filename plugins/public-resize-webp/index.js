import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename の代替を定義
const __filename = fileURLToPath(import.meta.url);

// __dirname の代替を定義
const __dirname = dirname(__filename);

const inputDir = path.resolve(__dirname, '../../public');
const outputDir = path.resolve(__dirname, '../../public');

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

const isImage = file => /\.(png|jpe?g|gif)$/.test(file);

const files = getAllFiles(inputDir);
const imageFiles = files.filter(isImage);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const file of imageFiles) {
  const basename = path.basename(file);
  const extname = path.extname(file);
  const relativePath = path.relative(inputDir, file);
  const outputFile = path.join(outputDir, relativePath);

  const outputDirPath = path.dirname(outputFile);
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }

  // @2xがある場合
  if (/@2x\.(png|jpe?g|gif)$/.test(basename)) {
    const image = sharp(file);
    const metadata = await image.metadata();
    const halfWidth = Math.floor(metadata.width / 2);

    const webp = await sharp(file)
      .resize(halfWidth)
      .webp()
      .toFile(outputFile.replace(/@2x\.((png|jpe?g|gif))$/, '.webp'));

    console.log(webp);

    await sharp(file)
      .resize(halfWidth)
      .toFile(outputFile.replace('@2x.', '.'));
  }

  await sharp(file)
    .webp()
    .toFile(outputFile.replace(/.((png|jpe?g|gif))$/, '.webp'));
}

console.log('Images have been resized');
