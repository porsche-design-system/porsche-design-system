import { render } from '@testing-library/react';
import { PButton } from '../../../projects/components-wrapper/src';
import { getMergedClassName } from '../../../projects/components-wrapper/src/utils';
import { skipCheckForPorscheDesignSystemProviderDuringTests } from '../../../projects/components-wrapper/src/hooks';
import * as hooks from '../../../projects/components-wrapper/src/hooks';

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
  });
});
