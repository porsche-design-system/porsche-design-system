import { verifySpinnerSize } from './spinner-utils';

describe('verifySpinnerSize()', () => {
  it.each`
    size                               | warningAmount
    ${'small'}                         | ${0}
    ${'{ base: "small", l: "large" }'} | ${0}
    ${undefined}                       | ${0}
    ${{ base: undefined, l: 'large' }} | ${0}
    ${'foo'}                           | ${1}
    ${{ foo: 'small', l: 'large' }}    | ${1}
    ${{ base: 'foo', l: 'large' }}     | ${1}
  `("should be called with ('$size') and throw '$warningAmount' warning", ({ size, warningAmount }) => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

    verifySpinnerSize(size);

    expect(spy).toBeCalledTimes(warningAmount);
    spy.mockRestore();
  });
});
