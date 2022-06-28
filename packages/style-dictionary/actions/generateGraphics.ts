import fs from 'fs-extra';

// const template = require('lodash/template');
import { generateIOSImageSet } from './ios';
import { androidVector } from './android';

/**
 * This is a custom [Style Dictionary action](https://amzn.github.io/style-dictionary/#/actions)
 * that will generate all of the graphics for each platform (android, ios, web) based on
 * the SVG tokens defined in our Style Dictionary.
 */
export const generateGraphics = {
  // An action in Style Dictionary has `do` and `undo` functions, which take the transformed
  // and resolved dictionary object containing all the tokens and the platform configuration
  // of the platform that called this action.
  do: (dictionary, config) => {
    const { androidPath, iosPath, buildPath, mode } = config;

    dictionary.allProperties
      .filter((token) => {
        return token.attributes.category === `image`;
      })
      .forEach((token) => {
        const { name, value } = token;

        // Read the file from the token's value and turn it into a
        // [lodash template](https://lodash.com/docs/4.17.15#template)
        // This is why the original SVG files have `<%= color.brand.primary.value %>` in them.
        // That is the lodash template's way of using data in the template.
        // `src` is now a function that will accept a data object that will be used
        // to generate a finished output.

        // const src = template(fs.readFileSync(value));

        // Generate the final SVG output by passing in the dictionary
        // to resolve the references. `svg` is the finished SVG string
        // that can now be written to a file or passed to other functions
        // to translate it to a PNG or Android Vector Drawable

        // const svg = src(dictionary.properties);
        // don't want to add lodash as of now, replacing the templates should be easy enough with some regex
        const svg = '';

        // Make sure the directory exists and write the new SVG file
        const outputPath = `${buildPath || ''}${name}-${mode}.svg`;
        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, svg);
        console.log(`✔︎  ${outputPath}`);

        // This will take the SVG and convert it into Android Vector Drawable format
        androidVector({ androidPath, name, svg, mode });

        // This will take the SVG and convert it to a PNG and create the metadata
        // for an iOS imageset
        generateIOSImageSet({ iosPath, name, svg, mode });
      });
  },

  undo: (dictionary, config) => {
    // no clean action
  },
};
