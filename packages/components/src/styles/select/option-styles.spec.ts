import { getSelectOptionStyles } from './option-styles';

describe('getSelectOptionStyles()', () => {
  it.each<Parameters<typeof getSelectOptionStyles>>([
    ['light', undefined],
    ['dark', undefined],
    ['light', { color: 'black' }],
    ['dark', { color: 'black' }],
  ])('should return correct css for theme: %s and additionalOptionJssStyle: %o', (...args) => {
    expect(getSelectOptionStyles(...args)).toMatchSnapshot();
  });
});
