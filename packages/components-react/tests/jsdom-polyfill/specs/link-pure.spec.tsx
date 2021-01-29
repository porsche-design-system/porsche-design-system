import React from 'react';
import { componentsReady, PLinkPure } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PLinkPure href="#" data-testid="host">
        Some label
      </PLinkPure>
    </>
  );
};

describe('PLinkPure', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
