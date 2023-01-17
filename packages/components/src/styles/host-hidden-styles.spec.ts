import { hostHiddenStyles } from './host-hidden-styles';

describe('hostHiddenStyles', () => {
  it('should return correct jss styles', () => {
    expect(hostHiddenStyles).toMatchSnapshot();
  });
});
