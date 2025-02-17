import { formElementLayeredGap } from '@porsche-design-system/components/src/styles/form-styles';
import { type Styles, create } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import {
  getFocusStyle,
  getHoverStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  getSkeletonStyle,
} from '../../../src/js';

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

export const jssGetHoverStyleTestCss = getCss({
  test: {
    ...getHoverStyle(),
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
