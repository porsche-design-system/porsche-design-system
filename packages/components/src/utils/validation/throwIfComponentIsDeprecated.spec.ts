import { throwIfComponentIsDeprecated } from './throwIfComponentIsDeprecated';

const warningMessage =
  'div: This component is deprecated and will be removed with next major release. Use "link" component with corresponding social icon instead.';

describe('with host element', () => {
  it('should throw warning', () => {
    const host = document.createElement('div');
    jest.spyOn(console, 'warn').mockImplementation();
    throwIfComponentIsDeprecated(
      host,
      'This component is deprecated and will be removed with next major release. Use "link" component with corresponding social icon instead.'
    );
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(warningMessage));
  });
});
