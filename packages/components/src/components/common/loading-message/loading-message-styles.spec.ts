import { getFunctionalComponentLoadingMessageStyles } from './loading-message-styles';
import { getCss } from '../../../utils';

describe('getFunctionalComponentLoadingMessageStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getCss(getFunctionalComponentLoadingMessageStyles())).toMatchSnapshot();
  });
});
