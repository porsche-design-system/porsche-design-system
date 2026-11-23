import { expect, it } from 'vitest';
import { hostHiddenStyles } from './host-hidden-styles';

it('should return correct jss styles', () => {
  expect(hostHiddenStyles).toMatchSnapshot();
});
