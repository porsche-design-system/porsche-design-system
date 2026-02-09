import { create, type Styles } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { getFocusStyle, getMediaQueryMax, getMediaQueryMin, getMediaQueryMinMax } from '../../../src';

const jss = create({
  plugins: [
    jssPluginGlobal(),
    jssPluginNested(),
    jssPluginCamelCase(),
    jssPluginSortMediaQueries({ combineMediaQueries: true }),
  ],
});

export const getCss = (jssStyles: Styles): string =>
  jss
    .createStyleSheet(jssStyles, {
      generateId: (rule) => rule.key,
    })
    .toString();

export const jssGetFocusStyleTestCss = getCss({
  test: {
    ...getFocusStyle(),
  },
});

export const jssGetMediaQueryMax = getCss({
  [getMediaQueryMax('xxl')]: {
    test: {
      margin: 0,
    },
  },
});

export const jssGetMediaQueryMin = getCss({
  [getMediaQueryMin('xxl')]: {
    test: {
      margin: 0,
    },
  },
});

export const jssGetMediaQueryMinMax = getCss({
  [getMediaQueryMinMax('base', 'xxl')]: {
    test: {
      margin: 0,
    },
  },
});
