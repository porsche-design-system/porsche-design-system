import StyleDictionary from 'style-dictionary';
import { extendSwiftUIColor, extendSwiftUIImage } from '../formats';
import { attributeCTI, colorRGB, remToFloat } from '../transforms';
import { colorsets, generateGraphics } from '../actions';
import type { TransformedToken } from 'style-dictionary/types/TransformedToken';

const IOS_PATH = `build/ios/dist/`;
const ANDROID_PATH = `build/android/styledictionary/src/main/res/`;
const WEB_PATH = `build/web/dist/`;

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({
  // custom actions
  action: {
    generateColorSets: colorsets,
    generateGraphics: generateGraphics,
  },
  // custom transforms
  transform: {
    'attribute/cti': attributeCTI,
    colorRGB: colorRGB,
    'size/remToFloat': remToFloat,
  },
  // custom formats
  format: {
    swiftColor: extendSwiftUIColor,
    swiftImage: extendSwiftUIImage,
  },
} as any);

const modes = [`light`, `dark`];

const getNonCoreFiles = (token: TransformedToken) => !token.filePath.includes('core');
const getDarkFiles = (token: TransformedToken) => token.filePath.includes(`.dark`);
const getColor = (token: TransformedToken) => token.attributes.category === `color`;

// const assets = {
//   transforms: [`attribute/cti`, `color/hex`, `size/remToFloat`, `name/ti/camel`],
//   buildPath: `${WEB_PATH}/images/`,
//   iosPath: IOS_PATH,
//   androidPath: ANDROID_PATH,
//   actions: [`generateGraphics`],
// };
//
const iosColors = {
  buildPath: IOS_PATH,
  transforms: [`attribute/cti`, `colorRGB`, `name/ti/camel`],
  actions: [`generateColorSets`],
};

console.log(`☀️ Building light mode...`);
styleDictionary
  .extend({
    source: [
      // this is saying find any files in the tokens folder
      // that does not have .dark or .light, but ends in .json
      `tokens/**/!(*.${modes.join(`|*.`)}).json`,
    ],

    platforms: {
      scss: {
        transformGroup: `scss`,
        buildPath: WEB_PATH,
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/map-deep',
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      js: {
        transformGroup: `web`,
        buildPath: WEB_PATH,
        files: [
          {
            destination: `tokens.json`,
            format: `json/nested`,
            filter: getNonCoreFiles,
          },
        ],
      },
      //
      // assets: Object.assign(assets, {
      //   // mode lets the custom actions know which color mode they are being run on
      //   mode: `light`,
      // }),
      //
      iosColors: Object.assign(iosColors, {
        mode: `light`,
      }),
      //
      iOS: {
        buildPath: IOS_PATH,
        transforms: [`attribute/cti`, `name/ti/camel`, `size/swift/remToCGFloat`],
        files: [
          {
            destination: `Color.swift`,
            format: `swiftColor`,
            filter: getColor,
            options: {
              outputReferences: true,
            },
          },
          {
            destination: `Size.swift`,
            filter: (token) => token.attributes.category === `size`,
            className: `Size`,
            format: `ios-swift/class.swift`,
          },
          {
            destination: `Image.swift`,
            filter: (token) => token.attributes.category === `image`,
            format: `swiftImage`,
          },
        ],
      },

      android: {
        transformGroup: `android`,
        buildPath: ANDROID_PATH,
        files: [
          {
            destination: `values/colors.xml`,
            format: `android/resources`,
            filter: getColor,
            options: {
              // this is important!
              // this will keep token references intact so that we don't need
              // to generate *all* color resources for dark mode, only
              // the specific ones that change
              outputReferences: true,
            },
          },
          {
            destination: `values/font_dimens.xml`,
            filter: (token) => token.attributes.category === `size` && token.attributes.type === `font`,
            format: `android/resources`,
          },
          {
            destination: `values/dimens.xml`,
            filter: (token) => token.attributes.category === `size` && token.attributes.type !== `font`,
            format: `android/resources`,
          },
        ],
      },
    },
  })
  .buildAllPlatforms();

// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary
  .extend({
    // Using the include array so that theme token overrides don't show
    // warnings in the console.
    include: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
    source: [`tokens/**/*.dark.json`],
    platforms: {
      scss: {
        transformGroup: `scss`,
        buildPath: WEB_PATH,
        files: [
          {
            destination: `variables-dark.scss`,
            format: `scss/map-deep`,
            // only putting in the tokens from files with '.dark' in the filepath
            filter: getDarkFiles,
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      js: {
        transformGroup: `web`,
        buildPath: WEB_PATH,
        files: [
          {
            destination: `tokens-dark.json`,
            format: `json/nested`,
            // only putting in the tokens from files with '.dark' in the filepath
            filter: getDarkFiles,
          },
        ],
      },
      // assets: Object.assign(assets, {
      //   mode: `dark`,
      // }),
      //
      // iosColors: Object.assign(iosColors, {
      //   mode: `dark`,
      // }),
      //
      // android: {
      //   transformGroup: `android`,
      //   buildPath: ANDROID_PATH,
      //   files: [
      //     {
      //       destination: `values-night/colors.xml`,
      //       format: `android/resources`,
      //       // only outputting the tokens from files with '.dark' in the filepath
      //       filter: getDarkFiles,
      //     },
      //   ],
      // },
    },
  })
  .buildAllPlatforms();

// High-Contrast Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
// console.log(`\n\n🌈🌙 Building high-contrast dark mode...`);
// styleDictionary
//   .extend({
//     include: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
//     source: [`tokens/**/*.hcDark.json`],
//
//     platforms: {
//       scss: {
//         transformGroup: `scss`,
//         buildPath: WEB_PATH,
//         files: [
//           {
//             destination: `variables-hc-dark.scss`,
//             format: `scss/map-deep`,
//             filter: (token) => token.filePath.indexOf(`.hcDark`) > -1,
//             options: {
//               outputReferences: true,
//             },
//           },
//         ],
//       },
//
//       // Because iOS only has good support for high-contrast modes
//       // we will only build the necessary files for iOS:
//       assets: Object.assign(assets, {
//         mode: `hcDark`,
//       }),
//
//       iosColors: Object.assign(iosColors, {
//         mode: `hcDark`,
//       }),
//     },
//   })
//   .buildAllPlatforms();

// High-Contrast Light Mode
// we will only build the files we need to, we don't need to rebuild all the files
// console.log(`\n\n🌈☀️ Building high-contrast light mode...`);
// styleDictionary
//   .extend({
//     include: [`tokens/**/!(*.${modes.join(`|*.`)}).json`],
//     source: [`tokens/**/*.hc.json`],
//
//     platforms: {
//       scss: {
//         transformGroup: `scss`,
//         buildPath: WEB_PATH,
//         files: [
//           {
//             destination: `variables-hc.scss`,
//             format: `scss/map-deep`,
//             filter: (token) => token.filePath.indexOf(`.hc`) > -1,
//             options: {
//               outputReferences: true,
//             },
//           },
//         ],
//       },
//
//       assets: Object.assign(assets, {
//         mode: `hc`,
//       }),
//
//       iosColors: Object.assign(iosColors, {
//         mode: `hc`,
//       }),
//     },
//   })
//   .buildAllPlatforms();
