import { render } from '@testing-library/react';
import { PButton, PorscheDesignSystemProvider } from '../../../projects/components-wrapper/src';
import { testSnapshot } from '../helpers';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import * as pds from '@porsche-design-system/components-js';

jest.mock('@porsche-design-system/components-js', () => ({
  load: jest.fn(),
}));

describe('PorscheDesignSystemProvider', () => {
  it('should render unprefixed components', () => {
    testSnapshot(
      <PorscheDesignSystemProvider>
        <PButton>Some Button</PButton>
      </PorscheDesignSystemProvider>
    );
  });

  it('should render prefixed components', () => {
    testSnapshot(
      <PorscheDesignSystemProvider prefix="my-prefix">
        <PButton>Some Button</PButton>
      </PorscheDesignSystemProvider>
    );
  });

  it('should support changing prefix at runtime', () => {
    const Sample = (): JSX.Element => {
      const [prefix, setPrefix] = useState('my-prefix');

      return (
        <PorscheDesignSystemProvider prefix={prefix}>
          <PButton data-testid="button" onClick={() => setPrefix('new-prefix')}>
            Some Button
          </PButton>
        </PorscheDesignSystemProvider>
      );
    };

    const { container, getByTestId } = render(<Sample />);
    const button = getByTestId('button');

    expect(container).toMatchSnapshot();
    expect(pds.load).toHaveBeenCalledTimes(1);
    expect(pds.load).toHaveBeenCalledWith({ prefix: 'my-prefix' });

    userEvent.click(button);

    expect(container).toMatchSnapshot();
    expect(pds.load).toHaveBeenCalledTimes(2);
    expect(pds.load).toHaveBeenCalledWith({ prefix: 'new-prefix' });
  });

  it('should render components wrapped with nested provider and prefix', () => {
    testSnapshot(
      <PorscheDesignSystemProvider prefix="my-prefix">
        <PButton>Some Button</PButton>
        <PorscheDesignSystemProvider prefix="another-prefix">
          <PButton>Some Button</PButton>
          <PorscheDesignSystemProvider>
            <PButton>Some Button</PButton>
          </PorscheDesignSystemProvider>
        </PorscheDesignSystemProvider>
      </PorscheDesignSystemProvider>
    );
  });

  it('should throw error if not provided', () => {
    let error = '';
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    try {
      render(<PButton>Some Button</PButton>);
    } catch (e) {
      error = e.message;
    }

    expect(error).toBe('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
    spy.mockRestore();
  });
});
