import { render } from '@testing-library/react';
import { PButton } from '../../../projects/components-wrapper/src';
import {
  skipCheckForPorscheDesignSystemProviderDuringTests,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '../../../projects/components-wrapper/src/hooks';
import { PIcon } from '@porsche-design-system/components-react';

describe('skipCheckForPorscheDesignSystemProviderDuringTests', () => {
  it('should prevent usePrefix to throw exception', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    let error1, error2;

    try {
      render(<PButton />);
    } catch (e) {
      error1 = e;
    }
    expect(error1).toBeDefined();

    skipCheckForPorscheDesignSystemProviderDuringTests();

    try {
      render(<PButton />);
    } catch (e) {
      error2 = e;
    }
    expect(error2).not.toBeDefined();

    spy.mockRestore();
  });

  it('should mock fetch', async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    skipCheckForPorscheDesignSystemProviderDuringTests();

    let counter = 0;
    global.fetch = jest.fn().mockImplementation((x) => {
      counter++;
    });
    render(<PIcon />);

    expect(counter).toHaveBeenCalledTimes(1);

    skipPorscheDesignSystemCDNRequestsDuringTests();
    render(<PIcon />);

    expect(counter).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();
  });
});
