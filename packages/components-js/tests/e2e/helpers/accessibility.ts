import { Page } from 'puppeteer';

type Options = {
  theme?: 'light' | 'dark';
  color?: 'default' | 'neutral' | 'contrastHigh' | 'success' | 'error' | 'brand' | 'active' | 'hover' | 'transparent';
  css?: 'outline' | 'boxShadow' | 'boxShadowWithInnerOffset';
  offset?: string;
};

type FocusColors = {
  default: string;
  backgroundDefault: string;
  neutral: string;
  contrastHigh: string;
  success: string;
  error: string;
  brand: string;
  active: string;
  hover: string;
  transparent: string;
};

type Colors = {
  light: FocusColors;
  dark: FocusColors;
};

const colors: Colors = {
  light: {
    default: 'rgb(0, 0, 0)',
    backgroundDefault: 'rgb(255, 255, 255)',
    neutral: 'rgb(98, 102, 105)',
    contrastHigh: 'rgb(50, 54, 57)',
    success: 'rgb(1, 138, 22)',
    error: 'rgb(224, 0, 0)',
    brand: 'rgb(213, 0, 28)',
    active: 'rgb(213, 0, 28)',
    hover: 'rgb(213, 0, 28)',
    transparent: 'rgba(0, 0, 0, 0)',
  },
  dark: {
    default: 'rgb(255, 255, 255)',
    backgroundDefault: 'rgb(14, 20, 24)',
    neutral: 'rgb(176, 177, 178)',
    contrastHigh: 'rgb(227, 228, 229)',
    success: 'rgb(1, 186, 29)',
    error: 'rgb(252, 23, 23)',
    brand: 'rgb(213, 0, 28)',
    active: 'rgb(255, 2, 35)',
    hover: 'rgb(255, 2, 35)',
    transparent: 'rgba(0, 0, 0, 0)',
  },
};

export const expectedStyleOnFocus = (opts?: Options): string => {
  const options: Options = {
    theme: 'light',
    color: 'default',
    css: 'outline',
    offset: '2px',
    ...opts,
  };
  const { css, theme, color, offset } = options;
  switch (css) {
    case 'boxShadow':
      return `${colors[theme][color]} 0px 0px 0px 1px`;
    case 'boxShadowWithInnerOffset':
      return `${colors[theme]['backgroundDefault']} 0px 0px 0px 2px, ${colors[theme][color]} 0px 0px 0px ${offset}`;
    default:
      return `${colors[theme][color]} solid 1px ${offset}`;
  }
};

export const isElementAtIndexFocused = async (page: Page, elementIndex: number): Promise<boolean> => {
  const snapshot = await page.accessibility.snapshot();
  const element = snapshot.children[elementIndex];
  return element.focused;
};
