import React from 'react';
import { PSpinner } from '@porsche-design-system/components-react';
import { componentsReady } from '@porsche-design-system/components-js';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <>
      <PSpinner data-testid="host" />
    </>
  );
};

describe('PSpinner', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
