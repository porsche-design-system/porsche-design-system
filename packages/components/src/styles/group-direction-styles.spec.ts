import { getGroupDirectionJssStyles } from './group-direction-styles';

describe('getGroupDirectionStyles()', () => {
  it.each<Parameters<typeof getGroupDirectionJssStyles>>([['column'], ['row']])(
    'should return correct css for direction: %s',
    (...args) => {
      expect(getGroupDirectionJssStyles(...args)).toMatchSnapshot();
    }
  );
});
