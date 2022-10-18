import {
  getAnimationIn,
  getAnimationOut,
  getBoxShadow,
  getComponentCss,
  getKeyframesMobile,
  getSlottedCss,
  KeyframesDirection,
} from './banner-styles';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-banner');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-banner');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getBoxShadow()', () => {
  it('should return correct JssStyle', () => {
    expect(getBoxShadow()).toMatchSnapshot();
  });
});

describe('getAnimationIn()', () => {
  it.each<string[]>([
    ['mobileIn', '--p-duration'],
    ['mobileIn', null],
  ])('should return correct JssStyle for keyframesName: %s and durationVar: %s', (keyframesName, durationVar) => {
    expect(getAnimationIn(keyframesName, durationVar)).toMatchSnapshot();
  });
});

describe('getAnimationOut()', () => {
  it('should return correct JssStyle', () => {
    expect(getAnimationOut('mobileOut')).toMatchSnapshot();
  });
});

describe('getKeyframesMobile()', () => {
  it.each<[KeyframesDirection, string]>([
    ['in', '--p-bottom-var'],
    ['out', '--p-bottom-var'],
  ])('should return correct JssStyle for direction: %s and bottomVar: %s', (direction, bottomVar) => {
    expect(getKeyframesMobile(direction, bottomVar)).toMatchSnapshot();
  });
});
