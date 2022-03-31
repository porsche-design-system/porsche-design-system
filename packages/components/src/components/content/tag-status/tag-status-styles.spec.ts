import { getSlottedCss, getComponentCss } from './tag-status-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['light', 'default', 'car', true],
    ['light', 'neutral-contrast-high', 'highway', true],
    ['light', 'background-surface', undefined, true],
    ['dark', 'notification-error', 'car', false],
  ])(
    'should return correct css for size: %j, weight: %s, align: %s, color: %s, ellipsis: %o and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
