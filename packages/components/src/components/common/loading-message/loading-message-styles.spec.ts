import { getFunctionalComponentLoadingMessageStyles } from './loading-message-styles';
import { getCss } from '../../../utils';
import { describe, it, expect } from 'vitest';

describe('getFunctionalComponentLoadingMessageStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getCss(getFunctionalComponentLoadingMessageStyles())).toMatchSnapshot();
  });
});
