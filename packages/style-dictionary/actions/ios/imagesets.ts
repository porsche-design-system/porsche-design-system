import fs from 'fs-extra';
import sharp from 'sharp';
import { CONTENTS, DARK_APPEARANCE, IDIOM, HC_APPEARANCE } from './constants';

/**
 * This function will generate an imageset for iOS
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a PNG. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.iosPath - The build path for iOS. This will be defined in the configuration
 * @param {String} options.mode - The current mode (light or dark) Style Dictionary is building in.
 */
export const generateIOSImageSet = ({ svg, name, iosPath, mode }) => {
  const outputPath = `${iosPath}StyleDictionary.xcassets/${name}.imageset`;
  fs.ensureDirSync(outputPath);

  // The imageset might already exist because Style Dictionary is run multiple
  // times with different configurations. If the imageset already exists we want
  // to modify it rather than writing over it.
  const imageset = fs.existsSync(`${outputPath}/Contents.json`)
    ? fs.readJsonSync(`${outputPath}/Contents.json`)
    : { ...CONTENTS, images: [] };

  let filename = `img.png`;
  let image = {
    idiom: IDIOM,
    appearances: undefined,
    filename: undefined,
  };

  if (mode === `dark`) {
    filename = `img-dark.png`;
    image.appearances = [DARK_APPEARANCE];
  }

  if (mode === `hc`) {
    filename = `img-hc.png`;
    image.appearances = [HC_APPEARANCE];
  }

  if (mode === `hcDark`) {
    filename = `img-hc-dark.png`;
    image.appearances = [DARK_APPEARANCE, HC_APPEARANCE];
  }

  // Add the image to the images array of the imageset object.
  image.filename = filename;
  imageset.images.push(image);

  // Here we are using the sharp library for image processing that will take
  // the SVG content and render it as a PNG
  // https://sharp.pixelplumbing.com/api-constructor
  sharp(Buffer.from(svg, `utf-8`), { density: 300 }).toFile(`${outputPath}/${filename}`, (err) => {
    if (!err) {
      console.log(`✔︎  ${outputPath}/${filename}`);
    } else {
      console.log(err);
    }
  });

  // Lastly, write the Contents.json file with the updated content
  fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
};
