import { expect } from '@jest/globals';
import { toHaveDotSelector } from '../matchers/toHaveDotSelector';
import { toHaveVisibleStyle } from '../matchers/toHaveVisibleStyle';

expect.extend({
  toHaveDotSelector,
  toHaveVisibleStyle,
});

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toHaveVisibleStyle(): R;
      toHaveDotSelector(): R;
    }
  }
}
