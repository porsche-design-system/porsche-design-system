import { verifySpinnerSize } from '../../../src/components/feedback/spinner/spinner-utils';

describe('spinner', () => {
  describe('verifySpinnerSize', () => {
    it.each`
      size                               | warningAmount
      ${'small'}                         | ${0}
      ${'{ base: "small", l: "large" }'} | ${0}
      ${'foo'}                           | ${1}
      ${'{ foo: "small", l: "large" }'}  | ${1}
      ${'{ base: "foo", l: "large" }'}   | ${1}
    `("should be called with ('$size') and throw '$warningAmount' warning", ({ size, warningAmount }) => {
      const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

      verifySpinnerSize(size);

      expect(console.warn).toBeCalledTimes(warningAmount);
      spy.mockRestore();
    });
  });
});
