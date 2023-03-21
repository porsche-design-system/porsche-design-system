import { getGroupDirectionStyles } from './group-direction-styles';

describe('getGroupDirectionStyles()', () => {
  it.each<Parameters<typeof getGroupDirectionStyles>>([
    ['column'],
    ['row'],
    [{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' }],
  ])('should return correct css for direction: %s', (...args) => {
    expect(getGroupDirectionStyles(...args)).toMatchSnapshot();
  });
});
