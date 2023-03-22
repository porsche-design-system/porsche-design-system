import { getGroupDirectionJssStyles } from './group-direction-styles';

describe('getGroupDirectionStyles()', () => {
  it.each<Parameters<typeof getGroupDirectionJssStyles>>([
    ['column'],
    ['row'],
    [{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' }],
  ])('should return correct css for direction: %s', (...args) => {
    expect(getGroupDirectionJssStyles(...args)).toMatchSnapshot();
  });
});
