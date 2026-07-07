import { format } from 'prettier';
import { getFunctionalComponentLoadingMessageStyles } from './loading-message-styles';
import { getCss } from '../../../utils';

describe('getFunctionalComponentLoadingMessageStyles()', () => {
  it('should return correct JssStyle', async () => {
    expect(await format(getCss(getFunctionalComponentLoadingMessageStyles()), { parser: 'css' })).toMatchSnapshot();
  });
});
