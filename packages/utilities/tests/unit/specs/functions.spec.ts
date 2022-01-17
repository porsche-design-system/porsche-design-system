import { mediaQuery, breakpoint, text, title } from '../../../projects/utilities/src/js';
import { headline } from '@porsche-design-system/utilities';

describe('mediaQuery()', () => {
  it('should return media query when pre defined breakpoint as min parameter is passed', () => {
    expect(mediaQuery(breakpoint.m)).toEqual('@media (min-width: 1000px)');
    expect(mediaQuery(breakpoint.xl)).toEqual('@media (min-width: 1760px)');
  });

  it('should return media query when pre defined breakpoint as min + max parameters is passed', () => {
    expect(mediaQuery(breakpoint.s, breakpoint.l)).toEqual('@media (min-width: 760px) and (max-width: 1300px)');
    expect(mediaQuery(breakpoint.xs, breakpoint.xxl)).toEqual('@media (min-width: 480px) and (max-width: 1920px)');
  });

  it('should return media query when custom number as min parameter are passed', () => {
    expect(mediaQuery(123)).toEqual('@media (min-width: 123px)');
    expect(mediaQuery(456)).toEqual('@media (min-width: 456px)');
  });

  it('should return media query when custom number as min + max parameters are passed', () => {
    expect(mediaQuery(123, 987)).toEqual('@media (min-width: 123px) and (max-width: 987px)');
    expect(mediaQuery(33, 99)).toEqual('@media (min-width: 33px) and (max-width: 99px)');
  });
});

describe('typography', () => {
  it('should contain correct values for title', () => {
    expect(title).toMatchSnapshot();
  });

  it('should contain correct values for headline', () => {
    expect(headline).toMatchSnapshot();
  });

  it('should contain correct values for text', () => {
    expect(text).toMatchSnapshot();
  });
});
