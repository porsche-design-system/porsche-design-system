import {
  addImportantToEachRule,
  attachCss,
  BreakpointCustomizable,
  buildResponsiveHostStyles,
  getCss,
  GetStylesFunction,
  JssStyle,
  mergeDeep,
} from '../../../utils';

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  display: stretch ? 'flex' : 'inline-block',
});

export const getComponentCss = (stretch: BreakpointCustomizable<boolean>): string => {
  return getCss(addImportantToEachRule(mergeDeep(buildResponsiveHostStyles(stretch, getStretchStyles))));
};

export const addComponentCss = (host: HTMLElement, stretch: BreakpointCustomizable<boolean>): void => {
  attachCss(host, getComponentCss(stretch));
};
