import { setAriaAttributes, SetAriaAttributesOptions } from '.';
import * as domUtils from './dom';

describe('setAriaAttributes()', () => {
  const node = document.createElement('div');
  const label = 'Some label';
  const message = 'Some message';

  it.each<SetAriaAttributesOptions>([
    { label },
    { message },
    { label, message },
    { state: 'error' },
    { state: 'success' },
    { state: 'none' },
  ])('should call setAttribute and removeAttribute with correct params for options: %o', (options) => {
    const setAttributeSpy = jest.spyOn(domUtils, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(domUtils, 'removeAttribute');

    setAriaAttributes(node, options);

    if (options.label && !options.message) {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-label', options.label);
    } else if (!options.label && options.message) {
      expect(setAttributeSpy).toHaveBeenCalledTimes(0);
    } else if (options.label && options.message) {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-label', options.label + '. ' + options.message);
    }

    if (options.state === 'error') {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-invalid', 'true');
    } else if (options.state) {
      expect(removeAttributeSpy).toHaveBeenCalledWith(node, 'aria-invalid');
    }
  });
});
