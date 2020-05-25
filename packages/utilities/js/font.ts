import { rem } from './helper';


export const font = {

  family: `"Porsche Next", "Arial Narrow", Arial, sans-serif`,

  weight: {
    thin: 100,
    regular: 400,
    semibold: 600,
    bold: 700,
  },

  size: {
    twelve: '0.75rem',
    sixteen: '1rem',
    eighteen: '1.125rem',
    twenty: '1.25rem',
    twentyTwo: '1.375rem',
    twentyFour: '1.5rem',
    twentyEight: '1.75rem',
    thirty: '1.875rem',
    thirtyTwo: '2rem',
    thirtySix: '2.25',
    fortyTwo: '2.625rem',
    fortyFour: '2.75rem',
    fortyEight: '3rem',
    fiftyTwo: '3.25rem',
    sixty: '3.75rem',
    sixtyTwo: '3.875rem',
    seventyTwo: '4.5rem',
    eightyFour: '5.25rem'
  }

/*  size: {
    twelve: `${rem(12)}`,
    sixteen: `${rem(16)}`,
    eighteen: `${rem(18)}`,
    twenty: `${rem(20)}`,
    twentyTwo: `${rem(22)}`,
    twentyFour: `${rem(24)}`,
    twentyEight: `${rem(28)}`,
    thirty: `${rem(30)}`,
    thirtyTwo: `${rem(32)}`,
    thirtySix: `${rem(36)}`,
    fortyTwo: `${rem(42)}`,
    fortyFour: `${rem(44)}`,
    fortyEight: `${rem(48)}`,
    fiftyTwo: `${rem(52)}`,
    sixty: `${rem(60)}`,
    sixtyTwo: `${rem(62)}`,
    seventyTwo: `${rem(72)}`,
    eightyFour: `${rem(84)}`
  }*/
};

export const text = {
  size: {
    xsmall: font.size.twelve,
    small: font.size.sixteen,
    medium: font.size.twentyFour,
    large: font.size.thirtySix,
    xlarge: font.size.fiftyTwo
  }
};
