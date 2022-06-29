import fs from 'fs-extra';
import { CONTENTS, DARK_APPEARANCE, IDIOM, HC_APPEARANCE } from './constants';
import type { Action } from 'style-dictionary';
import { CustomPlatform } from '../../scripts/build-utils';

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions.
 */
export const colorsets: Action = {
  // This is going to run once per theme.
  do: (dictionary, platform: CustomPlatform) => {
    const assetPath = `${platform.buildPath}/StyleDictionary.xcassets`;
    fs.ensureDirSync(assetPath);
    fs.writeFileSync(`${assetPath}/Contents.json`, JSON.stringify(CONTENTS, null, 2));

    dictionary.allProperties
      .filter((token) => token.attributes.category === `color`)
      .forEach((token) => {
        const colorsetPath = `${assetPath}/${token.name}.colorset`;
        fs.ensureDirSync(colorsetPath);

        // The colorset might already exist because Style Dictionary is run multiple
        // times with different configurations. If the colorset already exists we want
        // to modify it rather than writing over it.
        const colorset = fs.existsSync(`${colorsetPath}/Contents.json`)
          ? fs.readJsonSync(`${colorsetPath}/Contents.json`)
          : { ...CONTENTS, colors: [] };

        const color = {
          idiom: IDIOM,
          color: {
            'color-space': `srgb`,
            components: token.value,
          },
          appearances: undefined,
        };
        switch (platform.mode) {
          case 'dark':
            color.appearances = [DARK_APPEARANCE];
            break;
          // case 'hc':
          //   color.appearances = [HC_APPEARANCE];
          //   break;
          // case 'hcDark':
          //   color.appearances = [DARK_APPEARANCE, HC_APPEARANCE];
          //   break;
          default:
            break;
        }

        colorset.colors.push(color);

        fs.writeFileSync(`${colorsetPath}/Contents.json`, JSON.stringify(colorset, null, 2));
      });
  },
  undo: (dictionary, platform) => {
    // no undo
  },
};
