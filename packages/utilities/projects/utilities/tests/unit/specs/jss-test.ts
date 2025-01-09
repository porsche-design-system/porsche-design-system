import { type Styles, create } from 'jss';
import jssPluginCamelCase from 'jss-plugin-camel-case';
import jssPluginGlobal from 'jss-plugin-global';
import jssPluginNested from 'jss-plugin-nested';
import jssPluginSortMediaQueries from 'jss-plugin-sort-css-media-queries';
import { getFocusStyle, getHoverStyle } from '../../../src/js';

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
