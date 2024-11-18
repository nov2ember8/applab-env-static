import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const resizeImage = async (file, outputFile) => {
  const basename = path.basename(file);
  const extname = path.extname(file);

  if(/(png|jpe?g|gif)/.test(extname)) {
    // @2xがある場合
    if (/@2x\.(png|jpe?g|gif)$/.test(basename)) {
      const image = sharp(file);
      const metadata = await image.metadata();
      const halfWidth = Math.floor(metadata.width / 2);

      const webp = await sharp(file)
        .resize(halfWidth)
        .webp()
        .toFile(outputFile.replace(/@2x\.((png|jpe?g|gif))$/, '@1x.webp'));

      await sharp(file)
        .resize(halfWidth)
        .toFile(outputFile.replace('@2x.', '@1x.'));
    }

    await sharp(file)
      .toFile(outputFile);

    await sharp(file)
      .webp()
      .toFile(outputFile.replace(extname, '.webp'));
  } else if (extname === '.svg') {
    fs.copyFileSync(file, outputFile);
  } else {
    await sharp(file)
      .toFile(outputFile);
  }

  
};

export default resizeImage;